import { useCallback, useEffect, useState } from "react";

export function useTrpcQuery<TResult, TParams extends any[]>(
  queryFn: (...params: TParams) => Promise<TResult>,
  autoLoad: boolean = true
) {
  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Adjusted to handle calls without parameters more gracefully
  const query = useCallback(
    async (...params: TParams | []) => {
      setIsLoading(true);
      try {
        const result = await queryFn(...(params as TParams));
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [queryFn]
  );

  useEffect(() => {
    if (autoLoad) {
      query();
    }
  }, [autoLoad, query]);

  return { query, data, isLoading, error };
}
