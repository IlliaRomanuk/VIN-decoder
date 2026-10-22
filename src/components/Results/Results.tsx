import type { Result } from "../../types/result.type";
import "./Results.css";

type Props = {
  results: Result[];
  message: string;
  error: Error | null;
  isIdle: boolean;
  isLoading: boolean;
};

function Results({ results, message, error, isIdle, isLoading }: Props) {
  const isEmpty = !isIdle && !isLoading && !error && results.length === 0;

  return (
    <section className="card results">
      <h2>Results</h2>

      {message && (
        <p className="api-message" role="status">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error.message}
        </p>
      )}

      {isIdle && (
        <p className="muted">Enter a VIN to see the decoded vehicle data.</p>
      )}
      {isLoading && <p className="muted">Loading...</p>}
      {isEmpty && <p className="muted">No data returned for this VIN.</p>}

      {results.length > 0 && (
        <div className="table-wrap">
          <table className="results-table">
            <caption className="visually-hidden">Decoded VIN data</caption>
            <thead>
              <tr>
                <th scope="col">Variable</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={`${item.VariableId}-${index}`}>
                  <td>{item.Variable}</td>
                  <td>{item.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Results;
