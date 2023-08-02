import Typography from '@mui/material/Typography';
import { Box, Grid, Modal } from '@mui/material';
import './index.css';
import { useEffect, useState } from 'react';

interface PokemonType {
    type: {
        name: string
    },
    ability: {
        name: string;
    }
}

type CardInfoProps = {
    openModal: boolean;
    handleCloseModal: () => void;
    types: PokemonType[];
    abilities: PokemonType[];
    name: string;
    image: string;
}

export default function CardInfo({ openModal, handleCloseModal, types, name, image, abilities }: CardInfoProps) {

    const [typePokemon, setTypePokemon] = useState<string[]>([]);
    const [abilityPokemon, setAbilityPokemon] = useState<string[]>([]);

    useEffect(() => {
        const mappedTypes = types.map(item => item.type.name);
        setTypePokemon(mappedTypes);

        const mappedAbilities = abilities.map(item => item.ability.name);
        setAbilityPokemon(mappedAbilities);
    }, []);
    console.log(abilities);


    return (
        <div>
            <Modal
                keepMounted
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box className={`boxCard 
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
                                                                                        typePokemon.includes("steel") ? "backgroundSteel" : ""}
                `}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} justifyContent="center" textAlign="center">
                            <img src={image} alt={name} width={200} />
                            <h1>{name}</h1>
                        </Grid>
                        <Grid item xs={6} textAlign="center">
                            <h3>Tipos: </h3>
                            {types.map((item, index) => (
                                <p key={index}>{item.type.name}</p>
                            ))}
                        </Grid>
                        <Grid item xs={6} textAlign="center">
                            <h3>Habilidades: </h3>
                            {abilities.map((item, index) => (
                                <p key={index}>{item.ability.name}</p>
                            ))}
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </div>
    );
}
