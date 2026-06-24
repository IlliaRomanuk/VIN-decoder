import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { getvehiclevariablelist } from "../../services/api";
import type { Variable } from "../../type/variable.type";
import "./VariableDetails.css"
function VariableDetails() {
  const { id } = useParams();
  const [variable, setVariable] = useState<Variable | null>(null);

  useEffect(() => {
    getvehiclevariablelist().then((data) => {
      const found = data.Results.find(
        (item: Variable) => item.ID === Number(id),
      );
      setVariable(found || null);
    });
  }, [id]);

  if (!variable) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="details-page">
        <div className="details-box">
          <div className="details-header">
            <h2>{variable.Name}</h2>
            <span className="details-id">ID: {variable.ID}</span>
          </div>
          <div className="details-description">
        <p>{variable.Description}</p>
        </div>
        </div>
      </div>
    </>
  );
}

export default VariableDetails;
