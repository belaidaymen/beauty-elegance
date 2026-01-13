# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# Adding features

If you want to add a new feature (Such as a svelte component, a simple function, or anything), create a new branch first like this:

```bash
git branch feature-name
```

For example, if you want to create the navbar component, do:

```bash
# create a new branch
git branch navbar

# switch to that branch
git checkout navbar
```

Or:

```bash
# create & switch to new branch
git switch -C feature-name
```

Then after finishing working on the feature, push the branch to Github using:

```bash
git push origin feature-name
```

So the leader can modify it and apply necessary changes before adding it to the `main` branch.

**_NOTE:_** Do NOT modify branches other than the ones you create to avoid. Do NOT edit branches created by other developers.

# Additional important notes

- Run _reguraly_ the command `git fetch origin` to stay up-to-date with what features others have been working on.

- Components' files' names MUST be created at directory `src/lib/components` with `PascalCase` (Basically, capitalize each word of the component's name) (e.g., `MySpecialComponent.svelte`).

- As long as you are on a branch created by you, you are free to edit any file/folder since it won't affect other branches or the whole project.
