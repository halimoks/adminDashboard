@extends('imagine.master')
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Accueil</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- MyStyles --}}
	<link rel="stylesheet" href="{{asset('build/assets/home.css')}}">
    
    {{-- Bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8"></script>
    
    <style>
        /* Custom Styles for Font */
        h1, h2, h3, h4, h5, h6, p {
            font-family: 'Roboto', sans-serif; /* Apply Google Font */
        }

        /* Optional Bootstrap classes for weight */
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700; /* Bold weight for headings */
        }

        p {
            font-weight: 400; /* Regular weight for paragraphs */
        }
    </style>
</head>
<body class="bdd">
    @section('content')
        @php
            $greeting = (now()->format('H') < 18) ? 'Bonjour' : 'Bonsoir';
        @endphp
        <h2 class="welcome">
            {{ $greeting }} Mr. Imagine
        </h2>
        <div class="overview">
            <div class="card first">
                <div class="left">
                    <h3>{{$totalDevis}}</h3>
                    <h4>New Orders</h4>
                    <p>
                        <i class="{{ $devisClass }}"></i>
                        <span>{{$devisPercentageChange}}</span>
                    </p>
                </div>
                <div class="right">
                    <i class="bi bi-cart2"></i>
                </div>
            </div>
            <div class="card second">
                <div class="left">
                    <h3>{{ $totalFactures }}</h3>
                    <h4>Completed Orders</h4>
                    <p>
                        <i class="{{ $factureClass }}"></i>
                        <span>{{$facturePercentageChange}}</span>
                    </p>
                </div>
                <div class="right">
                    <i class="bi bi-check-circle"></i>
                </div>
            </div>
            <div class="card third">
                <div class="left">
                    <h3>{{ number_format($totalRevenue, 0) }} DH</h3>
                    <h4>Income This Month</h4>
                    <p>
                        <i class="{{ $revenueClass }}"></i>
                        <span>{{ $revenuePercentageChange }}</span>
                    </p>
                </div>
                <div class="right">
                    <i class="bi bi-cash"></i>
                </div>
            </div>
            <div class="card fourth">
                <div class="left">
                    <h3>{{ number_format($totalDepense, 0) }} DH</h3>
                    <h4>Losses This Month</h4>
                    <p>
                        <i class="{{ $depenseClass }}"></i>
                        <span>{{$depensePercentageChange}}</span>
                    </p>
                </div>
                <div class="right">
                    <i class="bi bi-graph-down-arrow"></i>
                </div>
            </div>
        </div>
        
        {{-- <button >halim</button> --}}
        
        <div class="division">
            <div class="leftStatistics">
                <div class="flexbox mb-4">
                    <div>
                        <h3 class="m-0">Statistics</h3>
                        <div>Your shop sales analytics</div>
                    </div>
                    <div class="d-inline-flex">
                        <div class="px-3" style="border-right: 1px solid rgba(0,0,0,.1);">
                            <div class="text-muted">WEEKLY INCOME</div>
                            <div>
                                <span class="h2 m-0">{{ number_format($weekRevenue,0) }}</span>
                                <span class="{{ $lwrSpanClass }}"><i class="{{ $lwRevenueClass }}"></i>{{$lwRevenuePercentageChange}}%</span>
                            </div>
                        </div>
                        <div class="px-3">
                            <div class="text-muted">WEEKLY SALES</div>
                            <div>
                                <span class="h2 m-0">{{ $weekSales }}</span>
                                <span class="{{ $lwsSpanClass }}"><i class="{{ $lwSalesClass }}"></i>{{ $lwSalesPercentageChange }} </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="graph">
                    <canvas id="myChart1"></canvas>
                </div>
            </div>
            <div class="rightStatistics">
                <h5>Statistics</h5>
                <hr>
                <div class="graph">
                    <canvas id="myChart2"></canvas>
                </div>
                <div class="mostSelling">
                    @foreach ($mostSoldProducts as $msp)
                        <div class="product">
                            <h4>{{$msp['name']}}</h4>
                            <i class="{{ $msp['state'] === 'increased' ? 'bi bi-graph-up-arrow' : ($msp['state'] === 'decreased' ? 'bi bi-graph-down-arrow' : 'bi bi-graph') }}"></i>
                        </div>
                    @endforeach       
                </div>
            </div>
        </div>
    @endsection

    <script>
            document.addEventListener("DOMContentLoaded", function() {
                var ctx = document.querySelector('#myChart1');
                var months = @json($months);
                var revenueValues = @json($revenueValues);
                var depensesValues = @json($depensesValues);

                ctx = ctx.getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line', 
                        data: {
                            labels: months,
                            datasets: [
                                {
                                    label: 'Revenues',
                                    data: revenueValues,
                                    backgroundColor: 'rgba(128, 255, 0, 0.2)',
                                    borderColor: 'green',
                                    borderWidth: 2,
                                    fill : true
                                },
                                {
                                    label: 'Depenses',
                                    data: depensesValues,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'red',
                                    borderWidth: 2,
                                    fill: true
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                })

                
            
                Chart.register(
                    Chart.ArcElement,  // Required for doughnut slices
                    Chart.Tooltip,     // Tooltip functionality
                    Chart.Legend,      // Legend to display the labels
                    Chart.Title,       // Title plugin (optional)
                    Chart.LinearScale, // Linear scale for axes (optional)
                    Chart.CategoryScale // Category scale for categories (optional)
                );                
                
                var ctx2 = document.querySelector("#myChart2");
                
                var myDoughnutChart = new Chart(ctx2, {
                    type : 'doughnut',
                    data:{
                        labels : @json($labels),
                        datasets : [{
                            label : 'Most Sold Products',
                            data : @json($data),
                            backgroundColor: ['#FF5733', '#33FF57', '#3357FF'], // Slice colors
                            borderColor: ['#FF5733', '#33FF57', '#3357FF'], // Slice border color
                            borderWidth: 2
                        }]
                    },
                    options : {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    usePointStyle : true,
                                    pointStyle : 'circle',
                                    padding:10,
                                }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.label + ' - ' + tooltipItem.raw;
                                    }
                                }
                            }
                        },
                        cutout:'80%'
                    }
                })

            });
    </script>

    </body>
    </html>
