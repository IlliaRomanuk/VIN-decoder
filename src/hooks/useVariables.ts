import { useQuery } from "@tanstack/react-query";
import { getVariableList } from "../services/api";

export function useVariables() {
  return useQuery({
    queryKey: ["variables"],
    queryFn: getVariableList,
    select: (data) => data.Results,
  });
}
