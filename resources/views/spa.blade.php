<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <meta name="mobile-web-app-capable" content="yes">

        <title>{{ env('APP_NAME', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500:700&display=swap"/>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>

    <div id="root"></div>

    <script type="text/javascript">
        function toggleFullScreen() {
            var doc = window.document;
            var docEl = doc.documentElement;

            var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

            if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }

        document.body.requestFullscreen();
    </script>

    </body>
</html>
