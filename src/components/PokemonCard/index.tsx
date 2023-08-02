import * as React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import 'animate.css';
import './index.css';
import CardInfo from '../Modal/CardInfo';
import { useEffect, useState } from 'react';

interface PokemonType {
    type: {
        name: string;
    },
    ability: {
        name: string;
    }
}

type PokemonCardProps = {
    name: string;
    image: string;
    types: PokemonType[];
    abilities: PokemonType[];
}

export default function PokemonCard({ name, image, types, abilities }: PokemonCardProps) {
    const [openModal, setOpenModal] = useState(false);
    const [typePokemon, setTypePokemon] = useState<string[]>([]);


    useEffect(() => {
        const mappedTypes = types.map(item => item.type.name);
        setTypePokemon(mappedTypes);
    }, []);


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    console.log(typePokemon);

    return (
        <>
            <Card
                onClick={handleOpenModal}
                sx={{
                    maxWidth: 250,
                    maxHeight: 250,
                    minHeight: 250,
                    borderRadius: "50px",
                }}
                className={`pokemonCard 
                ${typePokemon.includes("grass") ? "backgroundGrass" :
                        typePokemon.includes("fighting") ? "backgroundFighting" :
                            typePokemon.includes("fire") ? "backgroundFire" :
                                typePokemon.includes("water") ? "backgroundWater" :
                                    typePokemon.includes("electric") ? "backgroundElectric" :
                                        typePokemon.includes("normal") ? "backgroundNormal" :
                                            typePokemon.includes("poison") ? "backgroundPoison" :
                                                typePokemon.includes("bug") ? "backgroundBug" :
                                                    typePokemon.includes("fairy") ? "backgroundFairy" :
                                                        typePokemon.includes("ghost") ? "backgroundGhost" :
                                                            typePokemon.includes("dragon") ? "backgroundDragon" :
                                                                typePokemon.includes("dark") ? "backgroundDark" :
                                                                    typePokemon.includes("flying") ? "backgroundFlying" :
                                                                        typePokemon.includes("ground") ? "backgroundGround" :
                                                                            typePokemon.includes("rock") ? "backgroundRock" :
                                                                                typePokemon.includes("ice") ? "backgroundIce" :
                                                                                    typePokemon.includes("psychic") ? "backgroundPsychic" :
                                                                                        typePokemon.includes("steel") ? "backgroundSteel" : ""
                    }`}>
                <Grid container>
                    <Grid item xs={5}>
                        <h2>{name}</h2>
                        {types.map((item) => (
                            <p key={item.type.name}>{item.type.name}</p>
                        ))}
                    </Grid>
                    <Grid item xs={7}>
                        <img className='animate__animated animate__bounce' src={image} alt={name} />
                    </Grid>
                </Grid>
            </Card>

            <CardInfo
                name={name}
                image={image}
                types={types}
                abilities={abilities}
                openModal={openModal}
                handleCloseModal={handleCloseModal} />
        </>
    );
}
