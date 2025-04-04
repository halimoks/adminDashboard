@component('mail::message')

# Hello, Abdelhalim! 🌟

We noticed you want to reset your password. Click the button below to proceed.

@component('mail::button', ['url' => $actionUrl, 'color' => 'success'])
🔒 Reset Password
@endcomponent

If you did not request a password reset, no further action is required.

Stay safe,  
**The Team**

@endcomponent
