# triplecheck-example-vercel

![TripleCheck example implementation](readme/triplecheck-example.png)

## TripleCheck broker running on Vercel Functions

This repo demonstrates a working, basic implementation of a [TripleCheck broker](https://github.com/mikaelvesavuori/triplecheck-broker) running on Vercel with the database in FaunaDB.

Refer to the documentation on the [broker](https://github.com/mikaelvesavuori/triplecheck-broker) for how to call the API.

Technology choices are:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org)
- [FaunaDB](https://fauna.com)
- [Vercel](https://vercel.com/)

## Pre-requisites

- A Vercel account
- FaunaDB account and a database that's set up correctly (outlined below)

## Instructions

### Creating the FaunaDB database

- In Fauna, create a database called `triplecheck-broker`.
- Under `Security`, create a key for the database and set the role to `Server`
- Paste the key's value into an `.env` file (go ahead and rename the `env` file provided in the repo) like this: `FAUNA_KEY=some-secret-random-key`
- Create a new collection (call it `triplecheck`)
- Create an index called `Key` and set the term to `data.key`; also enable `Serialized` and `Unique`

### Setting up the Fauna key in Vercel

The easiest way to do this is to go to Vercel's web console, navigate to your `Project Settings` and set a key under `Environment variables` like this: `FAUNA_KEY` with your key as the value.

## Installation

Run `npm install` or `yarn install`.

## Local development

Run `npm start` or `yarn start`.

The default settings should work all right.

## Deploy

Run `npm run deploy` or `yarn run deploy`.

The default settings should work all right.

## Teardown (remove stack)

Run `npm run remove` or `yarn run remove`. You'll have to provide the npm script command your project name before this will work.
