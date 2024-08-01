<!DOCTYPE html>
<scrip lang="{{ str_replace('_', '-', app()->getLocale()) }}">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- tradetracker -->
        <meta name="d8636510c24e825" content="52a6550d24090e50b2ddb19a87f344cf" />

        <title inertia>{{ config('app.name', 'zoekhetbestecadeau') }}</title>

        <!-- author -->
        <meta name="author" content="zoekhetbestecadeau.nl">

        <!-- description -->
        <meta name="description"
            content="zoekhetbestecadeau.nl is een website die je helpt bij het vinden van perfecte cadeaus!">

        <!-- keywords -->
        <meta name="keywords" content="
        cadeau, cadeaus, cadeau idee, cadeau ideeën, cadeau tips, cadeau voor hem, cadeau voor haar, cadeau voor vriend, cadeau voor vriendin, cadeau voor moeder, cadeau voor vader, cadeau voor opa, cadeau voor oma, cadeau voor kind, cadeau voor baby, cadeau voor peuter, cadeau voor kleuter, cadeau voor tiener, cadeau voor volwassen
    ">
        <!-- favicon -->
        <link id="favicon-ico" rel="icon" type="image/x-icon" href="/branding/favicon.ico">
        <link id="favicon-ico-32x32" rel="icon" type="image/png" href="/branding/favicon-32x32.png" sizes="32x32">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>

    <!-- Scripts -->
    <script>

        var _TradeTrackerTagOptions = {
            t: 'a',
            s: '474149',
            chk: '5b15b5e41e5508c3e7dcd93a6e6f6d20',
            overrideOptions: {}
        };

        (function () {
            var tt = document.createElement('script'),
                s = document.getElementsByTagName('script')[0];
            tt.setAttribute('type', 'text/javascript');
            tt.setAttribute('src', (document.location.protocol == 'https:' ? 'https' : 'http') + '://tm.tradetracker.net/tag?t=' + _TradeTrackerTagOptions.t + '&s=' + _TradeTrackerTagOptions.s + '&chk=' + _TradeTrackerTagOptions.chk);
            s.parentNode.insertBefore(tt, s);
        })();
    </script>
    <!-- Hotjar Tracking Code for zoekhetbestecadeau -->
    <script>
        (function (h, o, t, j, a, r) {
            h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
            h._hjSettings = { hjid: 5073237, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script'); r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    </script>

    </html>