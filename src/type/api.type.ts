import type { Result } from "./result.type";
export interface DecodeVinResponse {
  Count: number;
  Message: string;
  Results: Result[];
}
