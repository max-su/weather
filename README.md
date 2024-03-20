# Weather for Runners
> Weather app that calculates running pace adjustments throughout the day, calculating the best times to go on a run (weather where you will be least affected by heat + humidity). Inspired by [Coach Mark Hadley's blog post on Maximum Performance Running](http://maximumperformancerunning.blogspot.com/2013/07/temperature-dew-point.html).

https://weather-omega-seven.vercel.app/

## Getting Started

[Install nvm and a stable version of Node.js if you haven't already](https://github.com/nvm-sh/nvm#install--update-script)

First, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000).

This application is written with [Next.JS App Router](https://nextjs.org/docs/app) with [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) and makes API calls on the client side to [Open-Meteo API](https://open-meteo.com/) directly as it has a public endpoint that does not require a key.
