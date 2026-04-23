**[Please use this link to access the website.](https://tft-compshare.vercel.app/)**

# TFT Comp Share

A community platform for Teamfight Tactics players to create, share, and discover team compositions.

## Features

- Browse and discover TFT comps shared by the community
- Create and publish your own comps with champions, tips, and transition guides
- Sort comps by newest or most liked
- Like and comment on comps from other players
- Save other users' comps
- User profiles with a personal comp library

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Deployed on Vercel

**Backend**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Riot Games API + Data Dragon

## Deployment

- **Frontend**: Vercel — connects to GitHub repo, auto-deploys on push
- **Backend**: Railway — runs the Express server 24/7
- **Database**: MongoDB Atlas

## Data Sources

Champion, trait, and item data is fetched from [Riot Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) and cached in the database. The app auto-detects new patch versions and updates accordingly.