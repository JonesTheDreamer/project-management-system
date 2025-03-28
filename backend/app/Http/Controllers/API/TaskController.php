<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TaskController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware("auth:sanctum", except: ['index'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Task::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $item = Task::create($request->validated());
        $title = $item->title;
        return response()->json(["message" => "$title added successfully", "data" => $item, $request->all()], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $item = Task::find($id);
        if ($item === null) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }
        return response()->json(["data" => $item], 200);

    }

    public function showTaskGroupedByID(int $id)
    {
        $item = Task::where("project_id", $id)->get();
        if ($item === null) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }
        return response()->json($item, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, int $id)
    {
        $item = Task::find($id);
        if (!$item) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }
        if ($item === "FINISHED") {
            return response()->json(["message" => "Task already finished"], 400);
        }
        $item->update(["status" => "FINISHED"]);
        return response()->json(["message" => "Task $id updated"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $item = Task::find($id);
        if (!$item) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }
        $item->delete();
        return response()->json(["message" => "ID:{$id} deleted"], 200);
    }
}