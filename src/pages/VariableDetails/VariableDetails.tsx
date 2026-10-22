import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useVariables } from '../../hooks/useVariables';
import { sanitizeHtml } from '../../utils/html';
import './VariableDetails.css';

function VariableDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useVariables();

  const variable = data?.find((item) => item.ID === Number(id));
  const description = useMemo(
    () => (variable ? sanitizeHtml(variable.Description) : ''),
    [variable]
  );

  if (isLoading) return <p className="muted">Loading variable...</p>;
  if (error) {
    return (
      <p className="error-message" role="alert">
        Failed to load variable: {error.message}
      </p>
    );
  }
  if (!variable) {
    return (
      <section className="card">
        <p>Variable not found.</p>
        <Link to="/variables" className="back-link">
          ← All variables
        </Link>
      </section>
    );
  }

  return (
    <article className="card details">
      <Link to="/variables" className="back-link">
        ← All variables
      </Link>

      <header className="details-header">
        <h1>{variable.Name}</h1>
        <span className="details-id">ID: {variable.ID}</span>
      </header>

      <div
        className="rich-text"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </article>
  );
}

export default VariableDetails;
