import { useCallback, useRef } from "react";

export const useDebounceFn = (
  callback: (args: unknown) => void,
  delay: number
) => {
  const timeoutRef = useRef<number | null>(null);

  return useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(args);
      }, delay);
    },
    [callback, delay]
  );
};
