export async function GET() {
	return new Response('ok', { status: 200 });
}

export async function POST() {
	return new Response('POST ok', { status: 200 });
}
