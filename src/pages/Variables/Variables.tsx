import { getvehiclevariablelist } from "../../services/api";
import { Link } from "react-router-dom";
import "./Varibles.css";
import { useQuery } from "@tanstack/react-query";

function Variables() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["variables"],
    queryFn: getvehiclevariablelist,
  });

  if (isLoading) return <p>Loading variables</p>;

  if (error) return <p>Error variables</p>;

  return (
    <>
      <div className="variables-page">
        <div className="variables-box">
          <h2>Vehicle Variables</h2>
          <ul className="variables-list">
            {data?.Results.map((variable) => (
              <li key={variable.ID} className="variable-item">
                <Link
                  key={variable.ID}
                  to={`/variables/${variable.ID}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div>
                    <h3>{variable.Name}</h3>
                    <p>ID: {variable.ID}</p>
                  </div>
                  <div
                    className="details-description"
                    dangerouslySetInnerHTML={{
                      __html: variable.Description,
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Variables;
