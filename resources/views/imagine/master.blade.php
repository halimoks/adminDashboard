<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('style.css') }}">
</head>
<body>
    <section>
        <nav class="sidebar">
            <div class="container-fluid">
                <div>
                    <img src={{ asset('imagincreative2.png') }} alt="imagine" class="sidebar-logo">
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('accueil.index') }}">
                            <i class="fas fa-home"></i> Accueil
                        </a>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary>
                                <i class="fas fa-file-invoice"></i>
                                Facture / Devis / Reçu
                            </summary>
                            <ul>
                                <li><a href="{{ route('factures.create') }}"><i class="fas fa-plus"></i> Nouveau</a></li>
                                <li><a href='{{ route('factures.index') }}'><i class="fas fa-list"></i> Lister</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary><i class="fas fa-users"></i> Clients</summary>
                            <ul>
                                <li><a href="#"><i class="fas fa-plus"></i> Ajouter client</a></li>
                                <li><a href="#"><i class="fas fa-list"></i> Lister client</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary><i class="fas fa-money-bill-wave"></i> Revenu</summary>
                            <ul>
                                <li><a href="{{ route('revenues.index') }}"><i class="fas fa-list"></i> List Revenues</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary><i class="fas fa-box"></i> Articles</summary>
                            <ul>
                                <li><a href="#"><i class="fas fa-plus"></i> Ajouter Article</a></li>
                                <li><a href="#"><i class="fas fa-list"></i> Lister Article</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary><i class="fas fa-wallet"></i> Dépenses</summary>
                            <ul>
                                <li><a href="#"><i class="fas fa-list"></i> Ajouter un Depense</a></li>
                                <li><a href="#"><i class="fas fa-list"></i> Lister les Depenses</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary><i class="fas fa-user"></i> Utilisateur</summary>
                            <ul>
                                <li><a href="#"><i class="fas fa-plus"></i> Ajouter Utilisateur</a></li>
                                <li><a href="#"><i class="fas fa-list"></i> Lister Utilisateur</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <details>
                            <summary><i class="fas fa-truck"></i> Fournisseurs</summary>
                            <ul>
                                <li><a href="#"><i class="fas fa-plus"></i> Ajouter Fournisseur</a></li>
                                <li><a href="#"><i class="fas fa-list"></i> Lister Fournisseur</a></li>
                            </ul>
                        </details>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-file-invoice-dollar"></i> Factures
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-truck"></i> Bon de livraison
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fas fa-percent"></i> TVA
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </section>
    
    <main>
        <div class="content">
            @yield('content')
        </div>
    </main>
    
</body>
</html>