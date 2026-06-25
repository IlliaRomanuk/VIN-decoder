import { useMutation } from "@tanstack/react-query";
import { decodeVin } from "../services/api";
import type { DecodeVinResponse } from "../type/api.type";

export function useDecodeVin() {
  const mutation = useMutation<DecodeVinResponse, Error, string>({
    mutationKey: ["decodeVin"],
    mutationFn: decodeVin,
  });

  return {
    decode: mutation.mutateAsync,
    data: mutation.data?.Results ?? [],
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
