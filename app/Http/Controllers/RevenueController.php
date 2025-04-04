<?php

namespace App\Http\Controllers;

use App\Models\Revenue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RevenueController extends Controller
{
    public function index()
    {
        $revenues = Revenue::paginate(8);
        return Inertia::render('Revenues/ListRevenues', [
            'revenues' => $revenues,
            'success' => session('success'),
            'error' => session('error')
        ]);
    }

    public function edit(Revenue $revenue)
    {
        return Inertia::render('Revenues/EditRevenue', [
            'revenue' => $revenue,
        ]);
    }

    public function update(Request $request, Revenue $revenue)
    {
        $messages = [
            'object.required' => 'L\'objet est requis.',
            'prix.required' => 'Le prix est requis.',
            'prix.numeric' => 'Le prix doit être un nombre.',
            'prix.min' => 'Le prix ne peut pas être négatif.',
        ];

        $validator = Validator::make($request->all(), [
            'object' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
        ], $messages);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $revenue->update($request->all());
            return redirect()->route('revenues.index')->with('success', 'Revenue updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while updating the revenue.');
        }
    }

    public function destroy(Revenue $revenue)
    {
        $revenue->delete();
        return redirect()->route('revenues.index')->with('success', 'Revenue deleted successfully.');
    }
}