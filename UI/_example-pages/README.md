# Example survey pages
- New ES6 modules have to be run from a local web server to fix CORS errors.
- We'll use `http-server` for this.
- Example HTML pages have to be copied into `./UI/_example-pages/` folder, and each one to be tested has to be copied/renamed to `index.html`.

## Generate build assets and run server
- From terminal prompt, enter `cd UI`.
- Enter `npm run build` to generate up-to-date CSS/JavaScript.
- Copy newly generated CSS/JavaScript folders from `./UI/build/` folder to `./UI/_example-pages/` folder.

## Run local server
- Enter `npx http-server _example-pages/`.
- Open http://127.0.0.1:8080 to see webpage.
