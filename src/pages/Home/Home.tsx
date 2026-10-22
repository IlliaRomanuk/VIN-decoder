import Aside from "../../components/Aside/Aside";
import Results from "../../components/Results/Results";
import { useDecodeVin } from "../../hooks/useDecodeVIN";
import { useVinHistory } from "../../hooks/useVinHistory";
import "./Home.css";

function Home() {
  const { history, addToHistory } = useVinHistory();
  const { decode, results, message, isIdle, isLoading, error } =
    useDecodeVin(addToHistory);

  return (
    <>
      <h1 className="visually-hidden">VIN Decoder</h1>
      <div className="home-layout">
        <Aside history={history} isLoading={isLoading} onDecode={decode} />
        <Results
          results={results}
          message={message}
          error={error}
          isIdle={isIdle}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default Home;
