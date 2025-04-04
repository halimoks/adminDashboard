import Layout from '../Layout/Layout';
import { useEffect, useRef } from 'react';
import '/resources/css/home.css';
import { Chart, registerables } from 'chart.js';
import { usePage } from '@inertiajs/react';

Chart.register(...registerables); 


function Home({ 
    months, 
    labels, 
    data,

    totalDevis, 
    devisPercentageChange, 
    devisClass, 

    totalFactures, 
    facturePercentageChange, 
    factureClass, 

    totalRevenue, 
    revenueValues, 
    revenuePercentageChange, 
    revenueClass,
    
    totalDepense, 
    depensesValues, 
    depensePercentageChange, 
    depenseClass, 
    
    weekRevenue, 
    lwRevenuePercentageChange, 
    lwRevenueClass, 
    lwrSpanClass,

    weekSales, 
    lwSalesPercentageChange,
    lwsSpanClass,
    lwSalesClass, 

    mostSoldProducts, 
}) {

    const user = usePage().props.auth.user.name;

    const greeting = new Date().getHours() < 18 ? 'Bonjour' : 'Bonsoir';
    
    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);

    useEffect(() => {
        if (!chart1Ref.current || !chart2Ref.current) return;
    
        const ctx1 = chart1Ref.current.getContext('2d');
        const myChart1 = new Chart(ctx1, {
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
                        fill: true,
                    },
                    {
                        label: 'Depenses',
                        data: depensesValues,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'red',
                        borderWidth: 2,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    
        const ctx2 = chart2Ref.current.getContext('2d');
        const myDoughnutChart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Most Sold Products',
                    data: data,
                    backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
                    borderColor: ['#FF5733', '#33FF57', '#3357FF'],
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 10,
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ' - ' + tooltipItem.raw;
                            },
                        },
                    },
                },
                cutout: '80%',
            },
        });
    
        return () => {
            myChart1.destroy();
            myDoughnutChart.destroy();
        };
    }, [months, revenueValues, depensesValues, labels, data]);
    
    const number_format = (number, decimals) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    };

    return (
        <>
            <h2 className="welcome">{greeting} Mr. {user}</h2>
            <div className="overview">
                <div className="card first">
                    <div className="left">
                        <h3>{totalDevis}</h3>
                        <h4>Total Devis</h4>
                        <p>
                            <i className={devisClass}></i>
                            <span>{devisPercentageChange}</span>
                        </p>
                    </div>
                    <div className="right">
                        <i className="bi bi-cart3"></i>
                    </div>
                </div>
                <div className="card second">
                    <div className="left">
                        <h3>{totalFactures}</h3>
                        <h4>Total Factures</h4>
                        <p>
                            <i className={factureClass}></i>
                            <span>{facturePercentageChange}</span>
                        </p>
                    </div>
                    <div className="right">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                </div>
                <div className="card third">
                    <div className="left">
                        <h3>{number_format(totalRevenue, 0)} DH</h3>
                        <h4>Revenue Ce Mois</h4>
                        <p>
                            <i className={revenueClass}></i>
                            <span>{revenuePercentageChange}</span>
                        </p>
                    </div>
                    <div className="right">
                        <i className="bi bi-cash-coin"></i>
                    </div>
                </div>
                <div className="card fourth">
                    <div className="left">
                        <h3>{number_format(totalDepense, 0)} DH</h3>
                        <h4>Perte Ce Mois</h4>
                        <p>
                            <i className={depenseClass}></i>
                            <span>{depensePercentageChange}</span>
                        </p>
                    </div>
                    <div className="right">
                        <i className="bi bi-graph-down-arrow text-white"></i>
                    </div>
                </div>
            </div>

            <div className="division">
                <div className="leftStatistics">
                    <div className="header">
                        <div>
                            <h3 className="m-0">Statistics</h3>
                            <div>Your shop sales analytics</div>
                        </div>
                        <div className="rightS">
                            <div className="income">
                                <div className="text-muted">WEEKLY INCOME</div>
                                <div>
                                    <span className="h2">{number_format(weekRevenue, 0)}</span>
                                    <span className={lwrSpanClass + ' weekPercentage'}>
                                        <i className={lwRevenueClass}></i>{lwRevenuePercentageChange}
                                    </span>
                                </div>
                            </div>
                            <div className="sales">
                                <div className="text-muted">WEEKLY SALES</div>
                                <div>
                                    <span className="h2">{weekSales}</span>
                                    <span className={lwsSpanClass + ' weekPercentage'}>
                                        <i className={lwSalesClass}></i>{lwSalesPercentageChange}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="graph">
                        <canvas ref={chart1Ref}></canvas> 
                    </div>
                </div>
                <div className="rightStatistics">
                    <h5>Statistics</h5>
                    <hr />
                    <div className="graph">
                        <canvas ref={chart2Ref}></canvas> 
                    </div>
                    <div className="mostSelling">
                        {mostSoldProducts.map((msp) => (
                            <div className="product" key={msp.name}>
                                <h4>{msp.name}</h4>
                                <i className={msp.state === 'increased' ? 'bi bi-graph-up-arrow text-green' : (msp.state === 'decreased' ? 'bi bi-graph-down-arrow text-red' : 'bi bi-graph-up-arrow text-green')}></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Home.layout = page => <Layout>{page}</Layout>;

export default Home;