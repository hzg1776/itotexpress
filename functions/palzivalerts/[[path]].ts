const securityHeaders = (url: URL): Headers => {
  const headers = new Headers({
    'Cache-Control': 'no-cache',
    'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' https://static.cloudflareinsights.com; connect-src 'self'; form-action 'none'; base-uri 'none'; frame-ancestors 'none'",
    'Content-Type': 'text/plain; charset=utf-8',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
  });
  if (url.hostname.endsWith('.pages.dev')) headers.set('X-Robots-Tag', 'noindex, nofollow');
  return headers;
};

export function onRequest({ request }: { request: Request }): Response {
  const url = new URL(request.url);
  const headers = securityHeaders(url);
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    headers.set('Allow', 'GET, HEAD');
    return new Response('Method not allowed', { status: 405, headers });
  }
  return new Response(request.method === 'HEAD' ? null : 'This project has been retired.', { status: 410, headers });
}
