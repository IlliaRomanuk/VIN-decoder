import "./decoderInput.css";
import { useState } from "react";
import { decodeVin } from "../../services/api";
import type { Result } from "../../type/result.type";
import type { Dispatch, SetStateAction } from "react";

type DecoderInputProps = {
  setResults: Dispatch<SetStateAction<Result[]>>;
    setHistory: React.Dispatch<React.SetStateAction<string[]>>;
};

function DecoderInput({setResults, setHistory}: DecoderInputProps) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateVin = (vin: string) => {
    if (!vin.trim()) {
      return "VIN не може бути порожнім";
    }

    if (vin.length > 17) {
      return "VIN не може бути довшим за 17 символів";
    }

    const vinRegex = /^[A-HJ-NPR-Z0-9]+$/;

    if (!vinRegex.test(vin)) {
      return "VIN містить заборонені символи";
    }

    return "";
  };

  const handleDecode = async () => {
    const validationError = validateVin(vin);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await decodeVin(vin);

      setResults(
        data.Results.filter((item: Result) => item.Value && String(item.Value).trim() !== ""),
      );
      setHistory(
        prev => [...prev, vin]
      );
    } catch {
      setError("Помилка при отриманні даних");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="decoder-box">
      <h2>Decode VIN</h2>
      <input
        className="decoder-input"
        value={vin}
        onChange={(e) => setVin(e.target.value.toUpperCase())}
        maxLength={17}
        type="text"
        placeholder="Enter VIN"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleDecode} className="decoderButton">
        {loading ? "Loading..." : "Decode"}
      </button>
    </div>
  );
}

export default DecoderInput;
