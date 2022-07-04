<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->integer('material_id');
            $table->integer('admin_id'); //teacher id
            $table->string('name');
            $table->string('description');
            // Q 1
            $table->string('q1');
            $table->string('q1_a');
            $table->string('q1_b');
            $table->string('q1_c');
            $table->integer('q1_true');
            $table->integer('q1_point');  // if 0=null

            // Q 2
            $table->string('q2');
            $table->string('q2_a');
            $table->string('q2_b');
            $table->string('q2_c');
            $table->integer('q2_true');
            $table->integer('q2_point');  // if 0=null

            // Q 3
            $table->string('q3');
            $table->string('q3_a');
            $table->string('q3_b');
            $table->string('q3_c');
            $table->integer('q3_true');
            $table->integer('q3_point');  // if 0=null


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exams');
    }
}
