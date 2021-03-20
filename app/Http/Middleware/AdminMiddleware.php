<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()->tokenCan('role:admin')) {
            return $next($request);
        }

        return response()->json([
            "success"=>false,
            "message"=>"انتهت الجلسة ا لخاصة بك, يجب عليك إعادة تسجيل الدخول مجددا"
        ], 401);
    }
}
