import { useCallback, useState } from "react";

// Make the hook generic with TResult for the result type and TParams for the parameters type
export function useTrpcMutate<TResult, TParams extends any[]>(
  mutationFn: (...params: TParams) => Promise<TResult>
) {
  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Use the generic types for parameters and result in the mutate function
  const mutate = useCallback(
    async (...params: TParams): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await mutationFn(...params);
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn]
  ); // mutationFn is a dependency

  const mutateAsync = useCallback(
    async (...params: TParams): Promise<TResult> => {
      setIsLoading(true);
      try {
        const result = await mutationFn(...params);
        setData(result);
        return result;
      } catch (error) {
        setError(error as Error);
        throw error; // Re-throw the error to allow callers to handle it
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn]
  );

  return { mutate, mutateAsync, data, isLoading, error };
}
