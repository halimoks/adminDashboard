<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture</title>
    <link rel="stylesheet" href="{{ asset('bl.css') }}">
</head>
<body onload="window.print()">
    <header>
        <div class="logo">
            <img src={{ asset('imagine.png')}}>
        </div>
    </header>

    <h1 class="paperType">BL #{{ $bl->id }} / Facture #{{ $facture->id }} </h1>
    <div class="details">
        <div class="paperD">
            <div class="date">Fes le : <span>{{ $facture->dateFacture }}</span> </div>
            <div class="company">A l'attention de : <span>{{ $facture->client->nomSociete }}</span> </div>
            <div class="objet">Objet : <span>{{$facture->object}}</span></div>
        </div>
        <div class="companyD">
            <div class="company"><span> {{ $facture->client->nomSociete }} </span></div>
            <div class="adresse">{{ $facture->client->adresse }}</div>
            <div class="phone"><span>Téléphone : </span>{{ $facture->client->telephone }}</div>
            <div class="ice"><span>ICE : </span>{{ $facture->client->ICE }}</div>
        </div>
    </div>
    <div class="table">
        <table>
            <thead >
                <tr>
                    <th>Designation</th>
                    <th>quantity</th>
                    <th>Prix HT</th>
                    <th>Montant HT</th>
                </tr>
            </thead>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
        <div class="articles">
            @php
                $total = 0;
                $tva = 0.20;
            @endphp
            <div class="designation">
                @foreach ($details as $item)
                    <div class="articleName">{{ $item->designation }}</div>
                @endforeach
            </div>
            <div class="quantity">
                @foreach ($details as $item)
                    <div class="articleQte">{{ $item->quantity }}</div>
                @endforeach
            </div>
            <div class="prixHT">
                @foreach ($details as $item)
                    <div class="articlePrice">{{ number_format($item->prixUnitaire,2)  }}</div>
                @endforeach
            </div>
            <div class="totalHT">
                @foreach ($details as $item)
                    <div class="articleTotal">{{ number_format($item->quantity * $item->prixUnitaire) }}</div>
                    @php
                        $total += $item->quantity * $item->prixUnitaire;
                    @endphp
                @endforeach
            </div>
        </div>
        <div class="totalD">
            <div class="totalLetters">
                @php
                    $totalTTC = $total + ($total * $tva);
                @endphp
                Arrêtée la présente facture à la somme de : <br>
                <span>
                    @php
                        $number = floor($totalTTC);
                        $formatter = new \NumberFormatter('fr', \NumberFormatter::SPELLOUT);
                        echo $formatter->format($number);  
                    @endphp
                </span>
            </div>
            <div class="totalNumbers">
                <div>Total HT : {{number_format($total , 2)}}</div>
                <div>TVA 20% : {{number_format($total * $tva , 2)}}</div>
                <div>Total TTC : {{number_format($totalTTC,2) }}</div>
            </div>
        </div>
        <div class="signatures">
            <div class="clientSignature">
                <hr>
                <div>Nom Société</div>
            </div>
            <div class="companySignature">
                <hr>
                <div>Direction Générale</div>
            </div>
        </div>
        <div class="companyDetails ">
            <div class="contact">
                <img src={{ asset('ss-removebg-preview.png') }} alt="">
            </div>
        </div>
</body>
</html>