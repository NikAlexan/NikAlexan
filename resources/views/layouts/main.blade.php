<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Main page | Nikita Vassilenko</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>

    <!-- Styles / Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @yield('styles')
</head>
<body>
    <div class="min-h-screen flex flex-col">
        <header class="sticky top-0 bg-[#FFFFFF] shadow-[0px_14px_34px_0px_rgba(0,0,0,0.05)]">
            <div class="mx-auto container">
                <nav class="flex justify-between py-6">
                    <a href="{{route('main')}}" class="w-12 flex items-center gap-2">
                        <img src="{{url('/images/chill-guy.png')}}" alt="Chill guy">
                        <span class="font-semibold text-xl text-nowrap">Nikita Vassilenko</span>
                    </a>
                    <ul class="flex items-center gap-12">
                        <li><a href="{{route("about")}}">About Me</a></li>
                        <li><a href="{{route("projects")}}">Projects</a></li>
                        <li><a href="{{route("resume")}}">Resume</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main class="flex-1">
            @yield('content')
        </main>
        <footer>
            <div class="mx-auto container text-center py-4">
                © Nikita Vassilenko (nikalexan) {{ date('Y') }}
            </div>
        </footer>
    </div>
    <!-- Scripts -->
    @yield('scripts')
</body>
</html>
