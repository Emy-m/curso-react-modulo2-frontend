import Header from "./components/Header";

function App() {
  return (
    <>
      <Header handleSearch={(value) => console.log(value)} />
    </>
  );
}

export default App;
