// utils/recentMenuStorage.ts
const RECENT_MENU_KEY = 'recentMenus';

export function saveRecentMenu(menu: {
	label: string;
	id: string;
	icon: string;
}) {
	const existing = JSON.parse(localStorage.getItem(RECENT_MENU_KEY) || '[]');
	const filtered = existing.filter((m) => m.id !== menu.id);
	const updated = [menu, ...filtered].slice(0, 3);
	localStorage.setItem(RECENT_MENU_KEY, JSON.stringify(updated));
}

export function getRecentMenus() {
	try {
		return JSON.parse(localStorage.getItem(RECENT_MENU_KEY) || '[]');
	} catch {
		return [];
	}
}
