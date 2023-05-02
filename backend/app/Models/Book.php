<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class Book extends Model
{
    use HasFactory, Searchable;
    use SoftDeletes;

    protected $table = "books";

    protected $fillable = [
        "title",
        "author",
        "genre",
        "description",
        "isbn",
        "image",
        "publisher",
    ];

    public function toSearchableArray()
    {
        return [
            'title'      => $this->title,
            'author'     => $this->author,
            'genre'      => $this->genre,
            'isbn'       => $this->isbn,
            'publisher'  => $this->publisher,
            'created_at' => $this->created_at,
        ];
    }
}
