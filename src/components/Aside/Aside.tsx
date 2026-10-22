import DecoderHistory from "../DecoderHistory/DecoderHistory";
import DecoderInput from "../DecoderInput/DecoderInput";
import "./Aside.css";

type Props = {
  history: string[];
  isLoading: boolean;
  onDecode: (vin: string) => void;
};

function Aside({ history, isLoading, onDecode }: Props) {
  return (
    <aside className="sidebar">
      <DecoderInput onDecode={onDecode} isLoading={isLoading} />
      <DecoderHistory
        history={history}
        disabled={isLoading}
        onSelect={onDecode}
      />
    </aside>
  );
}

export default Aside;
