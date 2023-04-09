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
        Schema::create('issues', function (Blueprint $table) {
            $table->uuid('issueId')->primary();
            $table->string('name');
            $table->text('description')->nullable()->default(null);
            $table->date('dueDate');
            $table->int('priority');
            $table->timestamps();
            $table->softDeletes();
            $table->string('projectId');
            $table->foreign('projectId')->references('projectId')->on('projects');
            $table->string('statusId')->default('STT01');
            $table->foreign('statusId')->references('statusId')->on('statuses');
            $table->string('reporterId');
            $table->foreign('reporterId')->references('userId')->on('users')->onDelete('cascade');
            $table->string('assigneeId');
            $table->foreign('assigneeId')->references('userId')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
};
