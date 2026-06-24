import "./results.css";
import type { Result } from "../../type/result.type";

type ResultsProps = {
  result: Result[];
};

function Results({ result }: ResultsProps) {
  return (
    <div className="results-box">
      <h2>Results</h2>

      <table className="results-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
         {result.map((item, index) => {
          return(
          <tr key={index}>
              <td>{item.Variable}</td>
              <td>{item.Value}</td>
            </tr>
          );
         })}
        </tbody>
      </table>
    </div>
  );
}
export default Results;
