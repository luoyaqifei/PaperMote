/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';
import { nextui } from '@nextui-org/react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          // Ensure that all imports of 'yjs' resolve to the same instance
          config.resolve.alias['yjs'] = path.resolve(__dirname, 'node_modules/yjs')
        }
        return config
      },
    plugins: [nextui()],
};
export default nextConfig;
