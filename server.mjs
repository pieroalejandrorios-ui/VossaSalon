import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png' };
const server = http.createServer(async (req, res) => { try { const route = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); const target = resolve(root, '.' + (route === '/' ? '/index.html' : route)); if (!target.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end(); return; } const data = await readFile(target); res.writeHead(200, { 'Content-Type':types[extname(target)] || 'application/octet-stream' }); res.end(data); } catch { res.writeHead(404); res.end('Not found'); } });
server.listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
