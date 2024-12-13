<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ExpiredMitra extends Notification
{
    use Queueable;
    protected $mitraId; 
    protected $mitra; 
    protected $expiredDate; 
    /**
     * Create a new notification instance.
     */
    public function __construct($mitraId, $mitra, $expiredDate)
    {
        $this->mitraId = $mitraId;
        $this->mitra = $mitra;
        $this->expiredDate = $expiredDate;
        logger()->info('Mitra '.$this->mitra.' akan berakhir pada tanggal '.$this->expiredDate);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'mitra_id' => $this->mitraId,
            'data' =>' Kerjasama dengan mitra '. $this->mitra.' akan berakhir pada tanggal '.$this->expiredDate,
        ];
    }
}
