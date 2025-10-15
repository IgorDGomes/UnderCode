import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ThemeToggle } from "./components/themeToggle";
import { Filter } from "./components/filter";
import { useState } from "react";
import { NewsList } from "./components/newsList";

function App() {
  const [filter, setFilter] = useState("All");

  return (
    <>
      <ThemeToggle />
      <Header />
      <Filter active={filter} onChange={setFilter} />
      <NewsList filter={filter} />
      <Footer />
    </>
  )
}

export default App