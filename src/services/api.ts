
import axios from "axios";
import type { VariableResponse } from "../type/variable.type";

const BASE_URL = "https://vpic.nhtsa.dot.gov/api";
const api = axios.create({
  baseURL: BASE_URL
})

export const decodeVin = async (vin: string) => {
  const res = await api.get(`${BASE_URL}/vehicles/decodevin/${vin}?format=json`);
  return res.data;
};

export const getvehiclevariablelist = async () => {
  const res = await api.get<VariableResponse>(
    `${BASE_URL}/vehicles/getvehiclevariablelist?format=json`
  );
  return res.data;
};
