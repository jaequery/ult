import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@server/trpc/trpc.router'

export const trpcClient = createReactQueryHooks<AppRouter>();