const mix = require("laravel-mix");

mix.js("resources/js/web.js", "public/js")
    .vue()
    .js("resources/js/dash.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);
