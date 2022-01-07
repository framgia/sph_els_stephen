<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler {
    protected $dontReport = [];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register() {
        // $this->reportable(function (Throwable $e) {
        // });

        $this->renderable(function (Exception $e, $request) {
            // dd($e);
            if (request()->wantsJson()) {
                if ($e instanceof ValidationException) {
                    $errors = $e->validator->errors()->getMessages();
                    return response()->json([
                        "error" => ["message" => $errors, "code" => 422],
                    ], 422);
                }
            } else {
                return response()->json(["error" => $e->getMessage()], 500);
            }
        });
    }

    // public function isFrontEnd() {
    //     return request()->acceptsHtml() && collect(request()->route()->middleware())->contains('web');
    // }
}
