'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isLoading, isAuthenticated, isInitialized } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isInitialized && !isAuthenticated) {
			router.push('/login');
		}
	}, [isInitialized, isAuthenticated, router]);

	// 초기화되지 않았거나 로딩 중일 때
	if (!isInitialized || isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">로딩 중...</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
