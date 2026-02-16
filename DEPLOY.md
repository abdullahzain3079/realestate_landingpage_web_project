# Deployment Guide

The easiest way to deploy your Next.js application is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Option 1: Vercel (Recommended)

1.  **Push your code to GitHub, GitLab, or Bitbucket.**
    *   Initialize git: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "Initial commit"`
    *   Push to your remote repository.

2.  **Import to Vercel:**
    *   Go to [https://vercel.com/new](https://vercel.com/new).
    *   Select your Git provider and repository.
    *   Vercel will auto-detect that it is a Next.js project.
    *   Click **Deploy**.

3.  **Done!** Your site will be live on a generic `.vercel.app` domain. You can add a custom domain in the Vercel dashboard later.

## Option 2: Netlify

1.  **Push your code to a Git provider.**
2.  **Import to Netlify:**
    *   Go to [https://app.netlify.com/start](https://app.netlify.com/start).
    *   Connect your Git provider.
    *   Select your repository.
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `.next` (Netlify usually auto-detects Next.js settings).
    *   Click **Deploy Site**.

## Option 3: Manual / VPS (Node.js)

1.  **Build the application:**
    ```bash
    npm run build
    ```
2.  **Start the server:**
    ```bash
    npm start
    ```
    *   This starts the production server on port 3000.
    *   You can use a process manager like `pm2` to keep it running.
    *   Set up Nginx as a reverse proxy to port 3000.
