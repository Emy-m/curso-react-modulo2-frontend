import { useState } from "react";
import Header from "./components/Header";
import Routes from "./components/Routes";
import { Container } from "@mui/material";
import AddMovieButton from "./components/AddMovieButton";

function App() {
  const [filterText, setFilterText] = useState("");
  return (
    <>
      <Header handleSearch={setFilterText} />
      <div
        style={{
          height: "80px",
        }}
      ></div>
      <Container
        maxWidth="x"
        sx={{
          background: "gray",
          minHeight: "300px",
          padding: "2.5%",
        }}
      >
        <Routes filter={filterText} />
        <AddMovieButton />
      </Container>
    </>
  );
}

export default App;
