import DecoderInput from "../DecoderInput/DecoderInput";
import DecoderHistory from "../DecoderHistory/DecoderHistory";

import "./Aside.css";
type AsideProps = {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  onDecode: (vin: string) => void;
};

function Aside({ history, setHistory, onDecode }: AsideProps) {

  return (
    <>
      <DecoderInput setHistory={setHistory} onDecode={onDecode} />
      <DecoderHistory history={history} onDecode={onDecode} />
    </>
  );
}

export default Aside;
