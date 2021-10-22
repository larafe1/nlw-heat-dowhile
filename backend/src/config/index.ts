import { config } from 'dotenv';

config();

export default {
  githubOAuthUrl: 'https://github.com/login/oauth',
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET
} as const;
