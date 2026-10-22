export const VIN_MAX_LENGTH = 17;

// VIN may contain Latin letters and digits, except I, O and Q.
const VIN_ALLOWED_CHARS = /^[A-HJ-NPR-Z0-9]+$/;

export const normalizeVin = (value: string) => value.trim().toUpperCase();

/** Returns an error message, or null when the value is valid. */
export function validateVin(value: string): string | null {
  const vin = normalizeVin(value);

  if (!vin) return "Please enter a VIN.";
  if (vin.length > VIN_MAX_LENGTH) {
    return `VIN must be at most ${VIN_MAX_LENGTH} characters long.`;
  }
  if (!VIN_ALLOWED_CHARS.test(vin)) {
    return "VIN may contain only Latin letters and digits (letters I, O and Q are not allowed).";
  }

  return null;
}
