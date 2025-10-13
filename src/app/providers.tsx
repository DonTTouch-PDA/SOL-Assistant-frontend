'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/app/get-query-client';
import { AuthProvider } from '@/contexts/AuthContext';
import type * as React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>{children}</AuthProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
