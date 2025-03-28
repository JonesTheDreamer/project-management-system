<?php

use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\AuthController;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(["prefix" => "user", "namespace" => "App\Http\Controllers\API"], function () {
    Route::post("/", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/logout", [AuthController::class, "logout"])->middleware("auth:sanctum");
});

Route::group(["prefix" => "projects", "namespace" => "App\Http\Controllers\API"], function () {
    Route::get("/", [ProjectController::class, "index"]);
    Route::post("/", [ProjectController::class, "store"]);
    Route::get("/{id}", [ProjectController::class, "show"]);
    Route::put("/{id}", [ProjectController::class, "update"]);
    Route::put("/update-status/{id}", [ProjectController::class, "updateStatus"]);
    Route::delete("/{id}", [ProjectController::class, "destroy"]);
    Route::get("/{id}/tasks", [TaskController::class, "showTaskGroupedByID"]);
});

Route::group(["prefix" => "tasks", "namespace" => "App\Http\Controllers\API"], function () {
    Route::get("/", [TaskController::class, "index"]);
    Route::post("/", [TaskController::class, "store"]);
    Route::get("/{id}", [TaskController::class, "show"]);
    Route::put("/{id}", [TaskController::class, "update"]);
    Route::delete("/{id}", [TaskController::class, "destroy"]);
});