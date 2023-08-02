import * as React from 'react';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/logopokemon.svg'

type NavbarProps = {
  pokemonFilter: (name: string) => void;
}

export default function Navbar({ pokemonFilter }: NavbarProps) {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      pokemonFilter(''); 
    } else {
      pokemonFilter(value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', padding: "15px 0" } }}
          >
            <img src={logo} alt="logo pokemon" width={150} />
          </Typography>
          <input
            style={{ height: "15px", width: "250px", padding: "10px 25px", borderRadius: "25px", border: "none" }}
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
