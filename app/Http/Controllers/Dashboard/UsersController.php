<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::paginate(10);
  
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'jabatan' => ['required', 'string', 'max:255'],
            'nip' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'is_admin' => ['nullable']
        ]);

        User::create([
            'name' => $request->name,
            'jabatan' => $request->jabatan,
            'nip' => $request->nip,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin,
        ]);

        return redirect()->route('users.index');
    }

    public function edit($id)
    {
        $user = User::find($id);

        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function destroy($id)
    {
        User::find($id)->delete();

        return redirect()->route('users.index');
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'jabatan' => ['required', 'string', 'max:255'],
            'nip' => ['required', 'string', 'max:255'],
            'is_admin' => ['nullable']
        ]);

        $user = User::find($id);

        if ($request->password) {
            $request->validate([
                'password' => ['required', 'string', 'min:8'],
            ]);

            $user->update([
                'name' => $request->name,
                'jabatan' => $request->jabatan,
                'nip' => $request->nip,
                'password' => Hash::make($request->password),
                'is_admin' => $request->is_admin,
            ]);

            return redirect()->route('users.index');
        }

        $user->update([
            'name' => $request->name,
            'jabatan' => $request->jabatan,
            'nip' => $request->nip,
            'is_admin' => $request->is_admin,
        ]);

        return redirect()->route('users.index');
    }
}
