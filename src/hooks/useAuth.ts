import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('AuthContext가 존재하지 않음');
	}
	return context;
}
