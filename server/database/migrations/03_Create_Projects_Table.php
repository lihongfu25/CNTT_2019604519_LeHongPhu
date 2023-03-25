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
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('projectId')->primary();
            $table->string('name');
            $table->text('description')->nullable()->default(null);
            $table->date('dueDate')->nullable()->default(null);
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->string('leaderId');
            $table->foreign('leaderId')->references('userId')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
