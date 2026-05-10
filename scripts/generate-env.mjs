import { writeFileSync } from 'fs';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY. Set them in .env (local) or Vercel env vars (deploy).');
  process.exit(1);
}

const content = `export const environment = {
  supabaseUrl: ${JSON.stringify(url)},
  supabaseKey: ${JSON.stringify(key)},
};
`;

writeFileSync('src/environments/environment.ts', content);
console.log('Generated src/environments/environment.ts');
