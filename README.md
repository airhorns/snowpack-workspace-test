Example app demonstrating snowpack not supporting cross-workspace-package imports

## To run

`yarn workspace web start` which runs the normal Snowback dev server in the `web` workspace

The `web` workspace imports code from the `shared-ts` workspace, which is TypeScript code that needs to be compiled. Currently, Snowpack errors out during install with:

```
⠼ snowpack installing... react, react-dom, shared-ts/src/some-shared-ts
✖ Package "shared-ts/src/some-shared-ts" not found. Have you installed it?
error Command failed with exit code 1.
```

Yarn workspaces store node modules in the `node_modules` folder at the repo root:

```
kamloop ~/C/snowpack-workspace-test (master) ➜  ls -lA node_modules/ | grep react-dom
drwxr-xr-x   19 airhorns  staff     608 12 Jun 09:55 react-dom
```

And the `shared-ts` module is present in that folder, presented as a symlink to the package in the workspace

```
kamloop ~/C/snowpack-workspace-test (master) ➜  ls -lA node_modules/ | grep shared-ts
lrwxr-xr-x    1 airhorns  staff      23 12 Jun 09:55 shared-ts -> ../packages/shared-ts
```

But, you can't import typescript files from the `shared-ts` workspace package, because snowpack is trying to install that package as if it were from NPM, and thusly expects it to have only JS/MJS in it.

### JS

Importing files from JavaScript packages in the workspace works, but requires a re-install each time a change is made in the package for Snowpack to re-bundle it into `web_modules`. If you comment out the `shared-ts` import and invocation in `App.tsx`, Snowpack can successfully import the `OtherUtility` from the `shared-js` package.