This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

# 1. Prepare environment with docker

## Run in docker container

- Assume you have docker installed and working with vscode.
- Use `remote-containers` extension to open the project in a container.
    - Open command palette and search for `Dev-Containers: Open Folder in Container`
    - Wait for the container to build and open the project in the container
- If you don't use vscode, comment out the following lines in `docker-compose.yml`
    ```
    # ports:
    #   - "3000:3000" #set by yourself
    ```



## Install dependencies

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



# 2. Test with jest
Before starting development, ensure that the tests are set up and running correctly.

## Installation
All dependencies should be already installed with `npm install`.
If not, check the following 
> - For installation check [here](https://nextjs.org/docs/app/building-your-application/testing/jest)
> - Also install `ts-node` to run jest with typescript

## Create a Google Maps API Key

To integrate Google Maps features into your application, you will need a Google Maps API Key. Follow these steps to create one:

1. Go to the [Google Cloud Platform Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.

## Add API key to `.env.test` and `.env.local`
Once you have your API key, add it to your project's environment variables. 
There are several ways to do this but in this project, I encourage you to use `.env.local` for development and `.env.test` for testing.

create `.env.test` and `.env.local` files in the project directory.

and add the following line to both of them.
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<Your Google Maps API Key>
NEXT_PUBLIC_API_URL=http://host.docker.internal:5001/api
```
**Note**
- `NEXT_PUBLIC_API_URL` is the url of the API server. 
- When developing in docker, use ip address of the host machine instead of `localhost`. The port is `5001` by default.
- When deploying to the server, use the url of the server (TBD)


## Run test
```bash
npm test
```
Please confirm that the test is working properly by checking the output of the command.
Currently this test is just for checking the connection of API server and API route.

**Check `./services/__integration__/listingsApi.test.tsx` for more details.**



# 3. Run the application
```bash
npm run dev
```
Currently the url to the google-maps is `localhost:3000/gmap`.

