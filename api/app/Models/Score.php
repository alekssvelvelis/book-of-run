<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $fillable = ['user', 'score', 'hood'];

    protected $hidden = ['created_at', 'updated_at', 'id'];

    public function user(){
        return $this->hasMany(User::class, 'id', 'user');
    }
}
