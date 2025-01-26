@extends('layouts.main')

@section('styles')

@endsection

@section('content')
    <section class="mx-auto container">
        <div class="py-24">
            <h1 class="font-bold text-9xl">
                Hey!<br>
                I'm Nikita Vassilenko. Welcome to my webpage!
            </h1>
        </div>
    </section>
    <section class="h-screen bg-[#FF2D20]/10" id="sticky">
        <div class="viewer"></div>
    </section>
@endsection

@section('scripts')
    @vite(['resources/js/pages/welcome/script.js'])
@endsection
