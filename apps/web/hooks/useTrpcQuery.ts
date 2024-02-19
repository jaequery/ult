import { useState, useEffect } from "react";

// Updated to accept a function that returns a tRPC procedure call
export function useTrpcQuery<TResult>(queryFn: () => Promise<TResult>) {
  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await queryFn();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [queryFn]);

  return { data, isLoading, error };
}
