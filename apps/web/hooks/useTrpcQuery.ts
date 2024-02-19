import { useCallback, useEffect, useState } from "react";

// Updated to accept a function that returns a tRPC procedure call
export function useTrpcQuery<TResult>(
  queryFn: () => Promise<TResult>,
  load = false
) {
  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const query = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await queryFn();
      setData(result);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (load) {
      query();
    }
  }, [load, query]);

  return { query, data, isLoading, error };
}
