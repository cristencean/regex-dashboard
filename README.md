# Next.js - Redux - Tailwindcss Regex Dashboard Project

Next.js dashboard that uses regex to extract expressions from text copies.

* Uses Redux to manage the global state
* Tailwindcss for styling the UI

## About 

The Regex Dashboard is a web-based tool designed for managing, and visualizing regular expressions (regex). It enables users to create, edit, and delete regex patterns, apply them to a content section, and highlight all matching substrings in real time.

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/cristencean/regex-dashboard.git
    npm install
    npm run dev

## Project structure

    .
    ├── components/               # Reusable UI components
    ├── app/                      # Next.js pages and layouts
    │   ├── layout.tsx            # Main layout with Redux provider
    │   ├── page.tsx              # Home page
    │   └── globals.css           # Global css file
    ├── public/                   # Static assets
    ├── store/                    # Redux store configuration and slices
    │   ├── index.ts              # Store setup
    │   ├── ReduxProvider.tsx     # Client app wrapper to add Redux
    │   └── dashboardSlice.ts     # React based Redux slice for dashboard
    ├── utils/                    # Global helper methods
    │   ├── localStorage.ts       # Local storage interactions
    │   └── regexValidation.ts    # Regex validation methods
    └── tsconfig.json             # TypeScript configuration

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.