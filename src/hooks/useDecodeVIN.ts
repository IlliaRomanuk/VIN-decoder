import { useMutation } from "@tanstack/react-query";
import { decodeVin } from "../services/api";
import type { DecodeVinResponse } from "../types/api.type";
import type { Result } from "../types/result.type";

const hasValue = (item: Result) =>
  item.Value !== null && item.Value.trim() !== "";

export function useDecodeVin(onSuccess?: (vin: string) => void) {
  const mutation = useMutation<DecodeVinResponse, Error, string>({
    mutationFn: decodeVin,
    onSuccess: (_data, vin) => onSuccess?.(vin),
  });

  return {
    decode: mutation.mutate,
    results: (mutation.data?.Results ?? []).filter(hasValue),
    message: mutation.data?.Message ?? "",
    isIdle: mutation.isIdle,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
