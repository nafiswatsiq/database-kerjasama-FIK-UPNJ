<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NullDokumenMitra extends Notification
{
    use Queueable;

    public $mitraId;
    public $nama_mitra;
    /**
     * Create a new notification instance.
     */
    public function __construct($mitraId, $nama_mitra)
    {
        $this->mitraId = $mitraId;
        $this->nama_mitra = $nama_mitra;
        logger()->info('IA dengan Mitra '.$this->nama_mitra.' belum ditandatangani');
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
            'type' => 'null-dokumen-'.$this->mitraId,
            'data' =>' IA dengan Mitra '. $this->nama_mitra.' belum ditandataangani',
        ];
    }
}
