<?php

namespace App\Traits;

trait FormatNumberToText
{
    private static $digits = [
        0 => 'Nol',
        1 => 'Satu',
        2 => 'Dua',
        3 => 'Tiga',
        4 => 'Empat',
        5 => 'Lima',
        6 => 'Enam',
        7 => 'Tujuh',
        8 => 'Delapan',
        9 => 'Sembilan'
    ];

    private static $groups = [
        1 => '',
        2 => 'Puluh',
        3 => 'Ratus',
        4 => 'Ribu'
    ];

    public static function convertYear($year)
    {
        // Validasi input
        if (!is_numeric($year) || strlen($year) !== 4) {
            return 'Format tahun tidak valid';
        }

        $result = '';
        $digits = str_split($year);
        
        // Ribu (digit pertama)
        if ($digits[0] > 0) {
            $result .= self::$digits[$digits[0]] . ' ' . self::$groups[4] . ' ';
        }
        
        // Ratus (digit kedua)
        if ($digits[1] > 0) {
            $result .= self::$digits[$digits[1]] . ' ' . self::$groups[3] . ' ';
        }
        
        // Puluhan (digit ketiga & keempat)
        if ($digits[2] == 1) { // Khusus belasan
            if ($digits[3] == 0) {
                $result .= 'Sepuluh';
            } elseif ($digits[3] == 1) {
                $result .= 'Sebelas';
            } else {
                $result .= self::$digits[$digits[3]] . ' Belas';
            }
        } else {
            if ($digits[2] > 0) {
                $result .= self::$digits[$digits[2]] . ' ' . self::$groups[2] . ' ';
            }
            if ($digits[3] > 0) {
                $result .= self::$digits[$digits[3]];
            }
        }

        return trim($result);
    }
}
