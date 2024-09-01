## Development

First, run the development server:

```bash
npm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech stack

* Node.js
* Next.js
* Tailwindcss
* [Tailwind components](https://tailwindui.com/components)
* [ApexCharts](https://apexcharts.com/)

### Stock market APIs

* [Historical price](https://site.financialmodelingprep.com/developer/docs#daily-chart-charts)
* [Current price](https://site.financialmodelingprep.com/developer/docs#simple-quote-quote)

### Deployment

The project is deployed on GitHub Pages using GitHub Actions.

https://maurocherchi.github.io/open-portfolio-app/

In order to have it deployed and working on GitHub pages it's required to:
* set the basePath in the [nextConfig](next.config.mjs)
* set the NEXT_PUBLIC_BASE_PATH variable on the github-pages environment (this way basePath can be empty for other envs, e.g. local)
* use next Link component for navigation (it takes care of prepending the basePath in links)
* add [.nojekill](/public/.nojekill) file in the public folder