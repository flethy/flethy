import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import analyze from 'rollup-plugin-analyzer'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 4200,
		cors: true,
	},
	build: {
		rollupOptions: {
			plugins: [analyze({})],
		},
	},
})
