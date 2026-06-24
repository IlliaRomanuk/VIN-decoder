import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { getvehiclevariablelist } from "../../services/api";
import { Link } from "react-router-dom";
import type { Variable } from "../../type/variable.type";
import "./Varibles.css";

function Variables() {
  const [list, setList] = useState<Variable[]>([]);
  useEffect(() => {
    getvehiclevariablelist()
      .then((data) => {
        setList(data.Results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="variables-page">
        <div className="variables-box">
          <h2>Vehicle Variables</h2>
          <ul className="variables-list">
            {list?.map((variable) => (
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
                  <p>{variable.Description}</p>
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
