import DecoderInput from "../decoderInput/decoderInput";
import DecoderHistory from "../decoderHistory/decoderHistory";
import type { Result } from "../../type/result.type";
import type { Dispatch, SetStateAction } from "react";
import './aside.css'

type AsideProps = {
  setResults: Dispatch<SetStateAction<Result[]>>;
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
};

function Aside({setResults, history, setHistory}: AsideProps) {
    return(
        <>
        <DecoderInput setResults={setResults}  setHistory={setHistory} /> 
        <DecoderHistory history={history} setResults={setResults} />
        </>   
    )
}
export default Aside;
