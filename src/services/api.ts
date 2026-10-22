import axios from "axios";
import type { DecodeVinResponse } from "../types/api.type";
import type { VariableResponse } from "../types/variable.type";

const api = axios.create({
  baseURL: "https://vpic.nhtsa.dot.gov/api",
  params: { format: "json" },
});

export const decodeVin = async (vin: string): Promise<DecodeVinResponse> => {
  const { data } = await api.get<DecodeVinResponse>(
    `/vehicles/decodevin/${encodeURIComponent(vin)}`,
  );
  return data;
};

export const getVariableList = async (): Promise<VariableResponse> => {
  const { data } = await api.get<VariableResponse>(
    "/vehicles/getvehiclevariablelist",
  );
  return data;
};
