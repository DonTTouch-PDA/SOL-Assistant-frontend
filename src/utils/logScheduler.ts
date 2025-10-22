import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'tmp');
const LOG_FILE = path.join(LOG_DIR, 'chart-logs.jsonl');
const NEXT_URL = 'https://sol-assistant.site/api/v1/internal/expert/tracking'; // 실제 서버 URL

export function startLogScheduler() {
	// 30초마다 실행
	setInterval(async () => {
		try {
			if (!fs.existsSync(LOG_FILE)) return; // 파일이 없으면 패스

			const raw = fs.readFileSync(LOG_FILE, 'utf-8');
			if (!raw.trim()) return; // 내용이 없으면 패스

			// 파일의 각 줄을 JSON으로 파싱
			const events = raw
				.split('\n')
				.filter(Boolean)
				.map((line) => JSON.parse(line));

			console.log(`[LogScheduler] ${events.length}개의 로그 전송 중...`);

			// 서버로 전송
			const res = await fetch(NEXT_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ events }),
			});

			if (res.ok) {
				console.log('✅ 로그 전송 성공');
				// 전송 후 파일 초기화
				fs.writeFileSync(LOG_FILE, '', 'utf-8');
			} else {
				console.error('❌ 로그 전송 실패:', res.status, await res.text());
			}
		} catch (error) {
			console.error('🚨 [LogScheduler Error]:', error);
		}
	}, 30000);
}
