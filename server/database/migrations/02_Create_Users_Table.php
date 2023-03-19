<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('userId')->primary();
            $table->string('fullName')->nullable()->default(null);
            $table->string('username')->nullable()->default(null);
            $table->string('email')->unique();
            $table->string('phoneNumber')->nullable()->default(null);
            $table->string('photoUrl')->default("");
            $table->boolean('emailVerified')->default(false);
            $table->string('password');
            $table->timestamps();
            $table->softDeletes();

            $table->string('roleId')->default('r1');
            $table->foreign('roleId')->references('roleId')->on('roles');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
