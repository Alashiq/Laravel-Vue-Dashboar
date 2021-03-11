const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .vue()
    .js("resources/js/admin.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);
