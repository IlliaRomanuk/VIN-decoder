import "./results.css";
import type { Result } from "../../type/result.type";

type Props = {
  data: Result[];
  message: string;
};

function Results({ data, message }: Props) {
  return (
    <div className="results-box">
      <h2>Results</h2>

      {message && <p className="api-message">{message}</p>}

      <table className="results-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.VariableId}>
              <td>{item.Variable}</td>
              <td>{item.Value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
