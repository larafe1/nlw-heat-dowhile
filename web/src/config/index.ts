export default {
  apiUrl: 'http://localhost:4000',
  githubClientId: import.meta.env.VITE_APP_GITHUB_CLIENT_ID,
  signInUrl: `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_APP_GITHUB_CLIENT_ID
  }`
} as const;
