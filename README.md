This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Environment variables
the path of the API server is defined in the `.env.local` file
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<Your Google Maps API Key>
API_URL=http://localhost:5001/api
```
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - The Google Maps API key. 
- `API_URL` - The URL of the API server.  The default value is `http://localhost:5001/api`.
    - When developing in docker, use ip address of the host machine instead of `localhost`. The port is `5001` by default.


## Run in docker container

- Assume you have docker installed and working with vscode.
- Use `remote-containers` extension to open the project in a container.
    - Open command palette and search for `Dev-Containers: Open Folder in Container`
    - Wait for the container to build and open the project in the container


# Test with jest
- For installation check [here](https://nextjs.org/docs/app/building-your-application/testing/jest)
- Also install `ts-node` to run jest with typescript
- To use local env variables for test, defined `env.test` file in the root directory of the project. The file is ignored by git.
- Content of the file is basically the same as `.env.local`.

## Mock
- By using jest.mock, you can specify how modules should behave when they are required by the parts of your application being tested, allowing for controlled testing scenarios without relying on actual implementations of those modules.
