import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        __API_ADDRESS__: JSON.stringify(process.env.VITE_API_ADDRESS),
        __API_PORT__: JSON.stringify(process.env.VITE_API_PORT),
    },
})
