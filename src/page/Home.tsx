import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'
import { Container, Grid, Pagination } from '@mui/material'
import axios, { AxiosResponse } from 'axios'

interface PokemonType {
    type: {
        name: string;
    }
    ability: {
        name: string;
    }
}

interface Pokemon {
    name: string;
    id: number;
    sprites: {
        front_default: string;
    },
    types: PokemonType[];
    abilities: PokemonType[];
}

export const Home = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [showNoPokemonMessage, setShowNoPokemonMessage] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(60);
    const itemsPerPage = 60;

    useEffect(() => {
        getPokemons();
    }, []);

    useEffect(() => {
        const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
        setTotalPages(totalPages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        setStartIndex(startIndex);
        const endIndex = startIndex + itemsPerPage;
        setEndIndex(endIndex);
    }, [filteredPokemons, currentPage, itemsPerPage]);

    const getPokemons = () => {
        var endpoints = [];

        for (var i = 1; i <= 1000; i++) { // Alteração aqui, incluindo 1000
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        };

        Promise.all(endpoints.map((endpoint) => axios.get<Pokemon>(endpoint)))
            .then((responses: AxiosResponse<Pokemon>[]) => {
                const pokemonData = responses.map((res) => res.data);
                setPokemons(pokemonData);
                setFilteredPokemons(pokemonData);
            })
            .catch((err) => console.log(err));
    };

    const pokemonFilter = (name: string) => {
        if (name === '') {
            setFilteredPokemons(pokemons);
        } else {
            const matchingTypes = pokemons.filter((pokemon) =>
                pokemon.types.some((item) => item.type.name.includes(name))
            );

            if (matchingTypes.length > 0) {
                setFilteredPokemons(matchingTypes);
            } else {
                const matchingNames = pokemons.filter((pokemon) =>
                    pokemon.name.includes(name)
                );
                setFilteredPokemons(matchingNames);
            }
        }
        setCurrentPage(1);
    };

    return (
        <>
            <Navbar pokemonFilter={pokemonFilter} />
            <Container maxWidth={false} style={{ overflowY: 'auto' }}>
              {filteredPokemons.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredPokemons.slice(startIndex, endIndex).map((pokemon) => (
                            <Grid item lg={3} md={4} sm={6} xs={6} key={pokemon.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                                <PokemonCard
                                    abilities={pokemon.abilities}
                                    types={pokemon.types}
                                    name={pokemon.name}
                                    image={pokemon.sprites.front_default}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : showNoPokemonMessage ? (
                    <h1>Nenhum pokemon encontrado.</h1>
                ) : null}
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                    style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                />
            </Container>
        </>
    );
};