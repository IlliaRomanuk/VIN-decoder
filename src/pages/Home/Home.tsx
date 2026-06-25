import Aside from "../../components/Aside/Aside.tsx";
import Results from "../../components/Results/Results.tsx";
import { useEffect, useState } from "react";
import { useDecodeVin } from "../../hooks/useDecodeVIN.ts";
import "./Home.css";

function Home() {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const { decode, data } = useDecodeVin();
  const [apiMessage, setApiMessage] = useState("");

const handleDecode = async (vin: string) => {
  const response = await decode(vin);

  setApiMessage(response.Message);

  setHistory((prev) => {
    const unique = prev.filter((v) => v !== vin);
    return [vin, ...unique].slice(0, 3);
  });
};

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <main className="home-layout">
      <aside>
        <Aside history={history} setHistory={setHistory} onDecode={handleDecode} />
      </aside>

      <Results data={data} message={apiMessage} />
    </main>
  );
}

export default Home;
