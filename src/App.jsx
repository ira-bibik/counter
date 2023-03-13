import React, { createContext, useContext, useState } from "react";
import uniqid from "uniqid";
import {
  Container,
  Box,
  Typography,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";

const Context = createContext();

const CurrentScore = () => {
  const state = useContext(Context);
  return <Typography variant="h2">{state.score}</Typography>;
};

const ButtonReset = () => {
  const state = useContext(Context);
  return (
    <Button
      variant="outlined"
      color="primary"
      size="medium"
      onClick={() => state.setScore(0)}
    >
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
      variant="contained"
      size="large"
      onClick={() => {
        state.setScore((prevScore) => prevScore + number);
      }}
    >
      +{number}
    </Button>
  );
};

const GroupOfButtons = () => {
  const { values, setVisibility } = useContext(Context);
  return (
    <>
      <ButtonGroup sx={{ mt: 1, display: "block" }}>
        {values.map((element) => (
          <ButtonAdd number={Number(element)} key={uniqid()} />
        ))}
      </ButtonGroup>
      <Button variant="text" size="small" onClick={() => setVisibility(false)}>
        Hide
      </Button>
    </>
  );
};

const InputForm = () => {
  const state = useContext(Context);

  const submitHandler = (e) => {
    e.preventDefault();
    state.setVisibility(true);
  };

  return (
    <form onSubmit={submitHandler}>
      <TextField
        label="Value of buttons"
        sx={{ mb: 1 }}
        onChange={(e) => state.setValues(e.target.value.split(","))}
      />
      <Button
        type="submit"
        variant="outlined"
        size="medium"
        sx={{ display: "block", m: "0 auto" }}
      >
        Submit
      </Button>
      {state.visibility && <GroupOfButtons />}
    </form>
  );
};

const AddingScore = () => {
  return (
    <Box component="div" sx={{ mt: 2 }}>
      <Typography sx={{ mb: 1 }}>Add points</Typography>
      <InputForm />
    </Box>
  );
};

const App = () => {
  const [score, setScore] = useState(10);
  const [visibility, setVisibility] = useState(false);
  const [values, setValues] = useState([]);
  const value = {
    score,
    setScore,
    visibility,
    setVisibility,
    values,
    setValues,
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
