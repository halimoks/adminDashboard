@component('mail::message')
# Reset Your Password

You requested a password reset. Please click the button below to reset your password.

@component('mail::button', ['url' => $url])
    Halim
@endcomponent

Halim El Hailouch

Thanks,<br>
{{ config('app.name') }}
@endcomponent
