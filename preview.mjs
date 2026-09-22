import {createSiteServer} from './server.mjs';
const port = 4173;
const server = await createSiteServer({directory: new URL('./dist/', import.meta.url), port});
server.listen(port, '127.0.0.1', () => console.log(`Local website preview: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
