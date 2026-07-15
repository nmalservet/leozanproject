import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The codebase has JSX inside plain .js files (not just .jsx), which esbuild
// doesn't parse as JSX by default outside of @vitejs/plugin-react's own
// .jsx/.tsx handling. These two blocks tell Vite's esbuild transform (dev +
// dependency pre-bundling) to treat .js the same way.
export default defineConfig({
	plugins: [react()],
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	server: {
		port: 3091,
		proxy: {
			// backend endpoints
			'/api': {
				target: 'http://127.0.0.1:8082',
				changeOrigin: true,
			},
			// /login is both a client-side route (LoginView) and the backend's
			// login endpoint. Only proxy the actual XHR/axios POST to the API;
			// let browser navigation (GET, Accept: text/html) fall through to
			// the SPA so the login page itself still renders.
			'/login': {
				target: 'http://127.0.0.1:8082',
				changeOrigin: true,
				bypass(req) {
					if (req.method === 'GET' && req.headers.accept && req.headers.accept.includes('text/html')) {
						return '/index.html';
					}
				},
			},
		},
	},
	build: {
		outDir: 'build',
	},
});
