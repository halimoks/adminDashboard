<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseNotification;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPasswordNotification extends BaseNotification
{
    public function toMail($notifiable)
    {
        $url = url(route('password.reset', $this->token, false));
    
        return (new MailMessage)
            ->subject('🔒 Reset Your Password')
            ->greeting('👋 Hello, Halimoks!')
            ->line('We noticed you want to reset your password. Click the button below to proceed.')
            ->action('Reset Password', $url)
            ->line('If you did not request this, simply ignore this email.')
            ->salutation('🎮 Stay safe, The Team.')
            ->with([
                'buttonStyle' => 'background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px;',
                'textStyle' => 'color: #333; font-size: 14px;',
            ]);
    }
    
}
