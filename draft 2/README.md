# JobTrack Draft 2

This is the React version of the JobTrack project for Draft 2.

## What is included

- Vite React project structure
- React Router navigation
- React page components for the main app pages
- Reusable components such as Header, Footer, JobCard, StatCard, BarRow, and ApplicationColumn
- Data-driven rendering using props and `.map()`
- A working Jobs search/filter feature using `useState`, controlled inputs, `.filter()`, and `.map()`
- A controlled Add Job form that adds a new job to component state
- Firebase Hosting configuration with `public` set to `dist`
- Original static draft files kept inside `project-draft/` for reference

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Firebase Hosting

If Firebase is already initialized and connected to your Firebase project:

```bash
npm run build
firebase deploy
```

If Firebase is not connected yet:

```bash
npm install -g firebase-tools
firebase login
firebase use --add your-project-id
npm run build
firebase deploy
```

## Final Draft 2 tag

After final edits are committed on `main`:

```bash
git tag draft-2
git push --tags
```


## Draft 1 feedback updates

This version adds the group author meta tag, keeps the header/footer/copyright structure, uses a mobile hamburger menu for the main navigation, removes the repeated left sidebar, fixes the missing analytics image, and treats the page illustrations as decorative images.
