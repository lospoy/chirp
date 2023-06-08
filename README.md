<div align="center">
  <a href="https://chirp-lospoy.vercel.app/">
    <img src="https://u.cubeupload.com/aa9988vvb/c90cover.png" width="70%">
  </a>
</div>

<br>
<p align="center">  
  <img alt="NextJS" src="https://img.shields.io/badge/-Nextjs-000000?style=for-the-badge&logo=Next.JS&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-5a67d8?style=for-the-badge&logo=Prisma&logoColor=white" />
  <br>
  <img alt="React" src="https://img.shields.io/badge/-React-0088CC?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/-Tailwind-499fc4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <br>
  <img alt="tRPC" src="https://img.shields.io/badge/-tRPC-398ccb?style=for-the-badge&logo=tRPC&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-2875c3?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#overview">Overview</a> •
  <a href="#local-installation">Local Installation</a> •
  <a href="#credits">Credits</a>
</p>

## About The Project
<a href="https://chirp-lospoy.vercel.app">Chirp</a> is a simple Twitter clone built to get acquainted with NextJS, Vercel, and <a href="https://trpc.io/">tRPC</a> . <br><br>Users can post emojis, view users' feeds, and specific posts. Users can login via Github, but auth methods can be easily modified via Clerk. Thanks to tRPC, user profiles and posts slugs are dynamically generated on load and the correct metadata is sent from the server and received as pure HTML by the client, while not having to do a full SSR pass on every page.

## Overview
- Pre-hydration using tRPC's SSG Helper
- Prisma/SQL database
- Authentication with Clerk
- Endpoints with tRPC
- Data validation with Zod
- Continuous deployment with Vercel and Github CI

## Local Installation
To run locally first install:
<br>
`` npm i ``
<br><br>
Then start the NextJS server:
<br>
`` npm run dev ``
<br><br>
To start Prisma Studio:
<br>
`` npx prisma studio ``

## Credits
- <a href="https://t3.gg/">t3.gg</a> for the fantastic build tool and the many detailed videos on the stack
