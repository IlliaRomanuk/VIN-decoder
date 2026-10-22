import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "vin-history";
const MAX_ITEMS = 3;

function readHistory(): string[] {
  try {
    const parsed: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string")
      .slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

export function useVinHistory() {
  const [history, setHistory] = useState<string[]>(readHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Storage may be unavailable (private mode, quota) - keep history in memory.
    }
  }, [history]);

  const addToHistory = useCallback((vin: string) => {
    setHistory((prev) =>
      [vin, ...prev.filter((item) => item !== vin)].slice(0, MAX_ITEMS),
    );
  }, []);

  return { history, addToHistory };
}
