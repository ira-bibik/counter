import React, { createContext, useContext, useState } from "react";
import { Container, Box, Typography, Button, ButtonGroup, TextField, InputLabel } from "@mui/material";

const Context = createContext();

const CurrentScore = () => {
  const state = useContext(Context);
  return <Typography variant="h2">{state.score}</Typography>;
};

const ButtonReset = () => {
  const state = useContext(Context);
  return (
    <Button variant="contained" onClick={() => state.setScore(0)}>
      Reset
    </Button>
  );
};

const Score = () => {
  return (
    <Box component="div">
      <Typography>Your Score</Typography>
      <Box component="div">
        <CurrentScore />
        <ButtonReset />
      </Box>
    </Box>
  );
};

const ButtonAdd = ({ number }) => {
  const state = useContext(Context);
  return (
    <Button
      onClick={() => {
        state.setScore((prevScore) => prevScore + number);
      }}
    >
      +{number}
    </Button>
  );
};

const AddingScore = () => {
  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Typography>Add points</Typography>
      <ButtonGroup>
        <ButtonAdd number={1} />
        <ButtonAdd number={5} />
        <ButtonAdd number={10} />
      </ButtonGroup>
    </Box>
  );
};

const App = () => {
  const [score, setScore] = useState(10);
  const value = {
    score,
    setScore,
  };
  return (
    <Context.Provider value={value}>
      <Container sx={{ textAlign: "center" }}>
        <Score />
        <AddingScore />
      </Container>
    </Context.Provider>
  );
};

export default App;
