<?php

namespace App\Http\Controllers\API;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use PhpParser\Node\Stmt\Echo_;

class ProjectController extends Controller implements HasMiddleware
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
        return response()->json(Project::all(), 200);
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
     * @param \App\Http\Requests\StoreProjectRequest $request
     */
    public function store(StoreProjectRequest $request)
    {
        $item = Project::create($request->validated());
        $title = $item->title;
        return response()->json(["message" => "$title added successfully", "data" => $item, $request->all()], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $item = Project::find($id);
        if (!$item) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }

        return response()->json($item, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, int $id)
    {
        $item = Project::find($id);
        if (!$item) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }

        $item->update($request->validated());
        return response()->json(["message" => "Project $id updated", "all" => $request->all()], 200);
    }

    public function updateStatus(UpdateProjectRequest $request, int $id)
    {
        $item = Project::find($id);
        if (!$item) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }
        if ($item === "FINISHED") {
            return response()->json(["message" => "Project already finished"], 400);
        }
        $item->update(["status" => "FINISHED"]);
        return response()->json(["message" => "Project $id updated"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $item = Project::find($id);
        if (!$item) {
            return response()->json(["message" => "ID:{$id} doesn't exist"], 404);
        }
        $item->delete();
        return response()->json(["message" => "ID:{$id} deleted"], 200);
    }
}