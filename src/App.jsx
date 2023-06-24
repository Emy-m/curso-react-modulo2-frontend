import { useState } from "react";
import Header from "./components/Header";
import Routes from "./components/Routes";

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
      <Routes filter={filterText} />
    </>
  );
}

export default App;
