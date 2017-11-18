# zxcvbn-presentation frontend

## Before you start

If you don't yet have the frontend dependencies installed (if there's no
`node_modules` folder in this directory) you need to install them. It's a good
idea to also make sure we're using a recent version of
[Node.js](https://nodejs.org/en/) installed - in a terminal run:

```
node --version
```

If it's less than 6, follow [these instructions for installing version 6](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

Once that's done, in a terminal in this directory, run:

```
npm install
```

## Developing

From this directory:

```
npm start
```

This will run a watch process that keeps an eye on your files and recompiles
whenever you save changes. `control-c` will quit the watch process.

## Project structure & build process features

```
├── .editorconfig
├── .gitignore
├── .retireignore.json
├── gulpfile.js
├── package.json
├── README.md
└── src
    ├── fonts
    ├── img
    ├── js
    └── scss

```

To learn about `.editorconfig` and to see if there is a plugin for your code
editor, see [the EditorConfig website](http://editorconfig.org/).

### SCSS compilation

All `.scss` files in the `src/scss/` folder will be compiled. Use the
[underscore import functionality](http://sass-lang.com/guide#topic-5) to create
includes of module files so you don't end up with more than one `.css` file in `dist/css/`.

[Autoprefixer](https://github.com/postcss/autoprefixer#autoprefixer-) (so you
don't need to write vendor prefixes) and CSS minification is included in the
compile process.

[Bootstrap](http://getbootstrap.com/) is included,
as well as a file for you to put in your overrides of its variables, at `src/scss/_variables-bootstrap.scss`.

### JS concatenation and minification

The JavaScript files in your `src` folder will all be concatenated into
one minified file named `bundle.js` in your `dist` folder. You can name
them whatever you like.

[jQuery](https://jquery.com/) will also be included
in the bundle file, as will [Bootstrap's JS](https://v4-alpha.getbootstrap.com/getting-started/javascript/#data-attributes) and [Popper.js](https://popper.js.org/).

### Other static files are copied

Any other files you have in your `src` folder (like images, fonts,
favicons etc) will be copied across to the `dist` folder so you can
include them as normal. As well as the pre-configured `img` and `fonts` folders,
you can create any other subfolders as you please (or just put files in the root
of `src`).

## Deploying

To generate the compiled static files, from this directory run:

```
npm run build
```

Note that by default these files are __not__ kept in version control (to avoid
conflicts), so your project deployment process should include this build
process.

## Keeping project dependencies up to date

It's a good idea to keep up to date with the latest versions of your
dependencies (although you'll need to manually vet if an upgrade has breaking
changes to your application, usually by looking at their release log - hopefully
you have automated tests to help detect regressions).

There is a command you can run to figure out if your project dependencies are
behind the latest versions:

```
npm run deps:check
```

There is also a command to force update all your dependencies (this is the one
you need to think about before running) by updating your `package.json` and
updating:

```
npm run deps:update
```

Both of these commands will also run a security check
against all of your dependencies, telling you if there are any security
advisories, using [retire.js](http://retirejs.github.io/retire.js/).

If there are packages that `retire` indicates have security issues but you have
determined that those security issues don't affect you, you can create a
`.retireignore.json` file in your project root which documents exceptions (a default one to document some exceptions for
Bootstrap's JavaScript has already been added). For example:

```
[
  {
    "component": "bootstrap",
    "identifiers" : { "issue": "20184" },
    "justification" : "User data should never be used in a data- attribute."
  },
  {
    "path" : "node_modules/tether/docs",
    "justification" : "Old jQuery only used in Tether's documentation."
  }
]
```

## Extending the build process

If you want to alter the build process you should modify `gulpfile.js`. The
training materials for the
[js-build-pipelines-training](https://github.com/jenofdoom/js-build-pipelines-training#gulp)
course may be helpful in this regard, or refer to the [gulp plugins
directory](http://gulpjs.com/plugins/). Don't forget you need to restart the
watch process whenever you alter the build configuration.
