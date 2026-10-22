import { useState } from "react";
import type { FormEvent } from "react";
import { normalizeVin, validateVin } from "../../utils/vin";
import "./DecoderInput.css";

type Props = {
  onDecode: (vin: string) => void;
  isLoading: boolean;
};

function DecoderInput({ onDecode, isLoading }: Props) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const validationError = validateVin(vin);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onDecode(normalizeVin(vin));
  };

  return (
    <form className="card decoder-form" onSubmit={handleSubmit} noValidate>
      <h2>Decode VIN</h2>

      <label htmlFor="vin-input">Vehicle Identification Number</label>
      <input
        id="vin-input"
        className="decoder-input"
        value={vin}
        onChange={(event) => {
          setVin(event.target.value.toUpperCase());
          if (error) setError("");
        }}
        placeholder="e.g. 1FTFW1CT5DFC10312"
        autoComplete="off"
        spellCheck={false}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "vin-error" : undefined}
      />

      <button type="submit" className="button" disabled={isLoading}>
        {isLoading ? "Loading..." : "Decode"}
      </button>

      {error && (
        <p id="vin-error" className="error-message" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default DecoderInput;
