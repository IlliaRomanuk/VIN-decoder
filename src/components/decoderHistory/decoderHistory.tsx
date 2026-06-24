import "./decoderHistory.css";
import arrow from "../../assets/free-icon-right-arrow-angle-54833.png";
import { decodeVin } from "../../services/api";
import type { Result } from "../../type/result.type";
import { type Dispatch, type SetStateAction } from "react";

type historyProps = {
  history: string[];
  setResults: Dispatch<SetStateAction<Result[]>>;
};

function DecoderHistory({ history, setResults }: historyProps) {
  const listHistory = history.slice(-3);



  const handleDecode = async (vin: string) => {
    try {
      const data = await decodeVin(vin);

      setResults(
        data.Results.filter(
          (item: Result) => item.Value && String(item.Value).trim() !== "",
        ),
      );
    } catch (e) {
      console.error("Error decoding VIN", e);
    }
  };

  return (
    <div className="history-box">
      <h2>Recent history</h2>
      <ul className="decoderList">
        {listHistory?.map((item, index) => {
          return (
            <li
              onClick={() => handleDecode(item)}
              key={index}
              className="listPunkt"
            >
              {item}
              <img alt="arrow" className="listImg" src={arrow} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default DecoderHistory;
