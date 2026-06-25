import axios from "axios";
import type { VariableResponse } from "../type/variable.type";
import type { DecodeVinResponse } from "../type/api.type";
const BASE_URL = "https://vpic.nhtsa.dot.gov/api";
const api = axios.create({
  baseURL: BASE_URL,
});

export const decodeVin = async (vin: string): Promise<DecodeVinResponse> => {
  const res = await api.get(`/vehicles/decodevin/${vin}?format=json`);
  return res.data;
};

export const getVehiclevariablelist = async () => {
  const res = await api.get<VariableResponse>(`/vehicles/getvehiclevariablelist?format=json`);
  return res.data;
};
