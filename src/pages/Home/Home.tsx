import Header from "../../components/header/header.tsx";
import Aside from "../../components/aside/aside.tsx";
import Results from "../../components/results/results.tsx";
import { useEffect, useState } from "react";
import type { Result } from "../../type/result.type.ts";
import './Home.css'
function Home() {
    const [results, setResults] = useState<Result[]>([]);
     const [history, setHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

    useEffect(() => {
      localStorage.setItem("history",JSON.stringify(history));
    }, [history])


  return (
    <>
      <Header />
      <main className="home-layout">
        <aside>
          <Aside setResults={setResults} history={history} setHistory={setHistory}/>
        </aside>
        <Results result={results} />
      </main>
    </>
  );
}

export default Home;
