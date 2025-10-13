'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	return <>{children}</>;

	// 아래 코드는 나중에 서버 연결 시 활성화
	/*
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated, isLoading, router]);

	// 로딩 중이거나 인증되지 않은 경우
	if (isLoading) {
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
		return null; // 리다이렉트 중
	}

	return <>{children}</>;
	*/
}
