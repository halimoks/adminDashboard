<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Depense;
use App\Models\DetailsFacture;
use App\Models\Devis;
use App\Models\Facture;
use App\Models\Revenue;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;
        $lastMonth = Carbon::now()->subMonth();
        $lastWeek = Carbon::now()->subWeek();
    
        $months = [];
        $revenueValues = [];
        $depensesValues = [];

        for ($i = 1; $i <= 12; $i++) {
            $month = Carbon::create($currentYear, $i, 1)->format('F');
            $months[] = $month;

            $startDate = Carbon::create($currentYear, $i, 1)->startOfMonth();
            $endDate = Carbon::create($currentYear, $i, 1)->endOfMonth();
            
            $revenueValues[] = Revenue::whereBetween('created_at', [$startDate, $endDate])->sum('prix');
            $depensesValues[] = Depense::whereBetween('created_at', [$startDate, $endDate])->sum('montant');
        }

        // Devis
        $totalDevis = Devis::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        $lastMonthDevis = Devis::whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)
            ->count();

            // dd($lastMonth);
        if ($lastMonthDevis > 0) {
            $devisPercentageChange = number_format((($totalDevis - $lastMonthDevis) / $lastMonthDevis) * 100, 0) . '% higher';
            $devisClass = 'bi bi-graph-up-arrow text-white';
        } elseif ($totalDevis > 0) {
            $devisPercentageChange = '100% higher'; 
            $devisClass = 'bi bi-graph-up-arrow text-white';
        } else {
            $devisPercentageChange = '0% lower'; 
            $devisClass = 'bi bi-graph-down-arrow text-danger';
        }
        // Factures
        $totalFactures = Facture::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->where('source','facture')
            ->count();

        $lastMonthFactures = Facture::whereMonth('created_at', $lastMonth->month)
            ->whereYear('created_at', $lastMonth->year)
            ->where('source','facture')
            ->count();

        if ($lastMonthFactures > 0) {
            $facturePercentageChange = number_format((($totalFactures - $lastMonthFactures) / $lastMonthFactures) * 100, 2) . '% higher';
            $factureClass = 'bi bi-graph-up-arrow text-white';
        } elseif ($totalFactures > 0) {
            $facturePercentageChange = '100% higher'; 
            $factureClass = 'bi bi-graph-up-arrow text-white';
        } else {
            $facturePercentageChange = '0% lower'; 
            $factureClass = 'bi bi-graph-down-arrow text-danger';
        }



        // Revenue
        $totalRevenue = Revenue::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->sum('prix');

        $lastMonthRevenue = Revenue::whereMonth('created_at',$lastMonth->month)
            ->whereYear('created_at',$lastMonth->year)
            ->sum('prix');

        if ($lastMonthRevenue > 0) {
            $revenuePercentageChange = number_format((($totalRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 2) . '%';
            $revenueClass = $totalRevenue > $lastMonthRevenue ? 'bi bi-graph-up-arrow text-white' : 'bi bi-graph-down-arrow text-danger';
        } else {
            $revenuePercentageChange = $totalRevenue > 0 ? '100%' : '0%';
            $revenueClass = $totalRevenue > 0 ? 'bi bi-graph-up-arrow text-white' : 'bi bi-graph-down-arrow text-danger';
        }


        if ($totalRevenue > $lastMonthRevenue) {
            $revenuePercentageChange .= ' higher'; 
        } elseif ($totalRevenue < $lastMonthRevenue) {
            $revenuePercentageChange .= ' lower'; 
        } else {
            $revenuePercentageChange .= ' (no change)';  
        }


        // Depenses
        $totalDepense = Depense::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->sum('montant');

        $lastMonthDepense = Depense::whereMonth('created_at',$lastMonth->month)
            ->whereYear('created_at',$lastMonth->year)
            ->sum('montant');

        if($lastMonthDepense>0){
            $depensePercentageChange = number_format((($totalDepense - $lastMonthDepense)/ $lastMonthDepense) * 100 , 0) . '%';
            $depenseClass = $totalDepense > $lastMonthDepense ? 'bi bi-graph-up-arrow text-white' : 'bi bi-graph-down-arrow text-danger';
        }else{
            $depensePercentageChange = $totalDepense > 0 ? '100%' : '0% ';
            $depenseClass = $totalDepense > 0 ? 'bi bi-graph-up-arrow text-white' : 'bi bi-graph-down-arrow text-text white';
        }

        if ($totalDepense > $lastMonthDepense) {
            $depensePercentageChange .= ' higher'; 
        } elseif ($totalDepense < $lastMonthDepense) {
            $depensePercentageChange .= ' lower'; 
        } else {
            $depensePercentageChange .= ' (no change)';  
        }


        //WeekRevenue
        $weekRevenue = Revenue::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->sum('prix');

        $lastWeekRevenue = Revenue::whereBetween('created_at', [
            $lastWeek->startOfWeek()->toDate(),
            $lastWeek->endOfWeek()->toDate()
        ])->sum('prix');

        $lwRevenuePercentageChange = $lastWeekRevenue > 0 
            ? number_format((($weekRevenue - $lastWeekRevenue) / $lastWeekRevenue) * 100, 0) . '%'
            : ($weekRevenue > 0 ? 100 : 0);
    
        $lwRevenueClass = $weekRevenue > 0 
            ? ($lastWeekRevenue > 0 ? 'bi bi-graph-up-arrow text-green' : 'bi bi-graph-up-down text-red') 
            : 'fa fa-level-down';

        $lwrSpanClass = ($lwRevenuePercentageChange > 0 ? 'text-success ml-2' :  'text-danger ml-2');


        
        $weekSales = Facture::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
        ->count();

        $lwSales = Facture::whereBetween('created_at', [
            $lastWeek->startOfWeek()->toDate(),
            $lastWeek->endOfWeek()->toDate()
        ])->count();


        $lwSalesPercentageChange = $lwSales > 0
        ? number_format((($weekSales - $lwSales) / $lwSales) * 100, 0) . '%'
        : ($weekSales > 0 ? '100%' : '0%');

        $lwSalesClass = $weekSales > 0
            ? ($lwSales > 0 ? 'fa fa-level-up' : 'fa fa-level-up') 
            : 'fa fa-level-down';

        $lwsSpanClass = ($lwSalesPercentageChange > 0 ? 'text-success ml-2' :  'text-danger ml-2');
            // dd($lwsSpanClass);
        $mostSoldProducts = DetailsFacture::select('article_id', DB::raw('SUM(quantity) as total_quantity'))
            ->whereMonth('created_at', $currentMonth)
            ->groupBy('article_id')
            ->orderByDesc('total_quantity')
            ->take(3)
            ->get()
            ->map(function ($detail) use ($lastMonth) {
                $article = $detail->article;
                
                $lastMonthQuantity = DetailsFacture::where('article_id', $detail->article_id)
                    ->whereMonth('created_at', $lastMonth->month)
                    ->sum('quantity');
                $state = 'same'; 

                if ($detail->total_quantity > $lastMonthQuantity) {
                    $state = 'increased';
                } elseif ($detail->total_quantity < $lastMonthQuantity) {
                    $state = 'decreased';
                }

                return [
                    'name' => $article->nomProduit,
                    'state' => $state,
                    'total_quantity' => $detail->total_quantity
                ];
            });

        $labels = $mostSoldProducts->pluck('name')->toArray();
        $data = $mostSoldProducts->pluck('total_quantity')->toArray();

        
        return inertia('Home', compact(
            'months', 
            'labels',
            'data',

            'totalDevis',
            'devisPercentageChange',
            'devisClass',

            'totalFactures',
            'facturePercentageChange',
            'factureClass',

            'totalRevenue',
            'revenueValues', 
            'revenuePercentageChange',
            'revenueClass',

            'totalDepense',
            'depensesValues',
            'depensePercentageChange',
            'depenseClass',

            'weekRevenue',
            'lwRevenuePercentageChange',
            'lwRevenueClass',
            'lwrSpanClass',

            'weekSales',
            'lwSalesPercentageChange',
            'lwSalesClass',
            'lwsSpanClass',

            'mostSoldProducts'
        ));
    }
}
