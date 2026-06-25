import "./decoderInput.css";
import { useState } from "react";
import { decodeVin } from "../../services/api";
import type { Dispatch, SetStateAction } from "react";
import type { DecodeVinResponse } from "../../type/api.type";
import { useMutation } from "@tanstack/react-query";

type DecoderInputProps = {
  setHistory: Dispatch<SetStateAction<string[]>>;
  onDecode: (vin: string) => void;
};

function DecoderInput({ setHistory, onDecode }: DecoderInputProps) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation<DecodeVinResponse, Error, string>({
    mutationKey: ["decodeVin"],
    mutationFn: decodeVin,
  });

  const validateVin = (vin: string) => {
    const normalizedVin = vin.trim().toUpperCase();

    if (!normalizedVin) return "VIN не може бути порожнім";
    if (normalizedVin.length !== 17) return "VIN має містити рівно 17 символів";

    const vinRegex = /^[A-HJ-NPR-Z0-9]+$/;
    if (!vinRegex.test(normalizedVin)) return "VIN містить заборонені символи";

    return "";
  };

  const handleDecode = async () => {
    const normalizedVin = vin.trim().toUpperCase();
    const validationError = validateVin(normalizedVin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    await onDecode(normalizedVin);
    setHistory((prev) => {
      const filtered = prev.filter((v) => v !== vin);
      return [vin, ...filtered].slice(0, 3);
    });
  };

  return (
    <div className="decoder-box">
      <h2>Decode VIN</h2>

      <input
        className="decoder-input"
        value={vin}
        onChange={(e) => setVin(e.target.value.toUpperCase())}
        maxLength={17}
        placeholder="Enter VIN"
      />

      <button onClick={handleDecode} className="decoderButton" disabled={mutation.isPending}>
        {mutation.isPending ? "Loading..." : "Decode"}
      </button>

      {error && <p className="error-message">{error}</p>}
      {mutation.error && <p className="error-message">{mutation.error.message}</p>}
    </div>
  );
}
export default DecoderInput;
  