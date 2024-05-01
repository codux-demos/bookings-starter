import '../styles/index.css';
//@ts-ignore
import env from 'raw-loader!/.env';
const lines = env.split('\n');
lines.forEach((line: string) => {
    const [key, value] = line.split('=');
    const trimmedKey = key.trim();
    if (trimmedKey.startsWith('VITE_')) {
        process.env[trimmedKey] = value.trim();
    }
});
