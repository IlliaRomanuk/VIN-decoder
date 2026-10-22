import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useVariables } from "../../hooks/useVariables";
import { sanitizeHtml } from "../../utils/html";
import "./Variables.css";

function Variables() {
  const { data, isLoading, error } = useVariables();

  const items = useMemo(
    () =>
      data?.map((variable) => ({
        ...variable,
        description: sanitizeHtml(variable.Description),
      })) ?? [],
    [data],
  );

  if (isLoading) return <p className="muted">Loading variables...</p>;
  if (error) {
    return (
      <p className="error-message" role="alert">
        Failed to load variables: {error.message}
      </p>
    );
  }

  return (
    <section className="card">
      <h1>Vehicle variables</h1>
      <ul className="variables-list">
        {items.map((variable) => (
          <li key={variable.ID} className="variable-item">
            <h2>
              <Link to={`/variables/${variable.ID}`}>{variable.Name}</Link>
            </h2>
            <p className="variable-id">ID: {variable.ID}</p>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: variable.description }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Variables;
