<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/tailwind.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <title>غيمة البرمجيات - @yield('title')</title>

    <!-- Fonts -->

    <!-- Styles -->
    <style>
        body {
            font-family: 'cairo';
        }


        .video-wrapper {
            overflow: hidden
        }

        .video-wrapper #video {
            position: relative;
            /* could be absolute if needed */
            left: 1px;
        }

        video:focus {
            outline: none;
        }
    </style>
</head>

<body>
    <div id="app" dir="rtl">
        <web-header :page="@yield('page')"></web-header>

        @yield('content')

        <web-footer></web-footer>
    </div>
    <script src="{{ mix('js/admin.js') }}"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>