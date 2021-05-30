# YNAB Chrome Extension

A simple [YNAB](https://www.youneedabudget.com/) transaction addition tool in Chrome Browser extension form!

This is built on Kocal's [vue-web-extension](https://github.com/Kocal/vue-web-extension/tree/master).

## Authentication

This will likely change in the future. However, for now, you'll need to do the following:

1. Convert the `.env.example` to a `.env`
1. Receive a [personal access token from YNAB](https://api.youneedabudget.com/#personal-access-tokens)
1. Apply this token value to the `YNAB_TOKEN` key in your `.env` file

## Usage

Both commands below will populate the `dist` folder of the project - do this first. This folder can be loaded into Chrome for development.

1. In Chrome, click the extensions icon to the left of your profile to expand the list of extensions
1. Click "Manage Extensions"
1. Click "Load Unpacked"
1. Navigate to the `dist` folder and load that
1. Click the extensions icon again, find it at the bottom, and pin it
1. Click it in the extension bar to open it

### `npm run build`

Build the extension into `dist` folder for **production**.

A zip file is also built and is located in `artifacts` directory.

### `npm run serve`

Build the extension for **development** and watch over file changes.

## Documentation

Please see Kocal's original documentation for the [boilerplate](https://v1-vue-web-extension.netlify.app/).
