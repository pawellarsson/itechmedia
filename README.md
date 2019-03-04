## Instructions

* Clone the repository.

* Use this command to install all dependencies for the project:

```bash
# Uses package.json "devDependencies" to install dependencies
npm install
```

* Start `gulp` by running:

```bash
npm start
```


## Folder structure

* `dist` - The converted files that are linked via `index.html`. You don't have to touch these files
    - `js` - All converted `js`-files go here
    - `css` - All converted `css`-files go here
* `src` - This is where your development-files are. There are the ones you work on
    - `js` - All unconverted `js`-files
    - `scss` - All unconverted `scss`-files
* `Gulpfile.js` - This config file must be in the root-folder
* `index.html` - The index must be in the root-folder
* `package.json` - All the dependencies and config for the project
