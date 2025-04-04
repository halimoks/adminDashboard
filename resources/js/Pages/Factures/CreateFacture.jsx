import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateFacture({ clients, articles }) {

    const {old}= usePage().props
    const { data, setData, post, processing } = useForm({
        object: old?.object || "",
        client_id: old?.client_id || "",
        etatPayement: old?.etatPayement || 1,
        products: [{ designation: old?.designation || "" , qte: old?.qte || "", produit: old?.produit || "", pu: old?.pu || "" }],
        paperType: old?.paperType || 'facture' // Track the type of document (facture or devis)
    });


    const { errors } = usePage().props; // Get errors from server response

    const addProductField = () => {
        setData('products', [...data.products, { designation: '', qte: '', produit: '', pu: '' }]);
    };

    const removeProductField = (index) => {
        setData('products', data.products.filter((_, i) => i !== index));
    };

    const handleChange = (e, index, field) => {
        const updatedProducts = [...data.products];
        updatedProducts[index][field] = e.target.value;
        setData('products', updatedProducts);
    };

    const handlePaperTypeChange = (e) => {
        setData('paperType', e.target.value); 
    };

    function submit(e) {
        e.preventDefault();
        post('/imagine/factures');
    }

    return (
            
        <form onSubmit={submit} disabled={processing} className="form">
            <h1 className="mb-4 h3">Créer {data.paperType === 'facture' ? 'une Facture' : 'un Devis'}</h1>

            <div className="mb-3">
                <label className="form-label">Type de document</label>
                <div>
                    <input type="radio" id="facture" name="paperType" value="facture" checked={data.paperType === 'facture'} onChange={handlePaperTypeChange} />
                    <label htmlFor="facture" className="form-label ms-2">Facture</label>
                </div>
                <div>
                    <input type="radio" id="devis" name="paperType" value="devis" checked={data.paperType === 'devis'} onChange={handlePaperTypeChange} />
                    <label htmlFor="devis" className="form-label ms-2">Devis</label>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="object" className="form-label">Objet</label>
                <input id="object" type="text" value={data.object}  onChange={(e) => setData('object', e.target.value)} className={`form-control  ${errors.object ? 'border-red-500' : ''}`} placeholder="Objet" />
                {errors.object && <div className="text-danger">{errors.object}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="client_id" className="form-label">Client</label>
                <select id="client_id" value={data.client_id} onChange={(e) => setData('client_id', e.target.value)} className="form-select">
                    <option value="">Sélectionnez un client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.nomClient}</option>
                    ))}
                </select>
                {errors.client_id && <div className="text-danger">{errors.client_id}</div>}
            </div>

            {data.paperType === 'facture' && (
                <div className="mb-3">
                    <label htmlFor="etatPayement" className="form-label">État de Paiement</label>
                    <select id="etatPayement" value={data.etatPayement} onChange={(e) => setData('etatPayement', e.target.value)} className="form-select">
                        <option value="1">Payée</option>
                        <option value="0">Non Payée</option>
                    </select>
                    {errors.etatPayement && <div className="text-danger">{errors.etatPayement}</div>}
                </div>
            )}

            <h1 className="mb-3 h3">Produits</h1>
            
            {data.products.map((e, i) => (
                <div key={i} className='row g-2 mb-3 division rounded p-3'>
                    <div className="col-md-3">
                        <input type="text" value={e.designation} onChange={(e) => handleChange(e, i, 'designation')} placeholder="Désignation" className={`form-control  ${errors[`products.${i}.designation`] ? 'border-red-500' : ''}`} />
                        {errors[`products.${i}.designation`] && (
                            <div className="text-danger">{errors[`products.${i}.designation`][0]}</div>
                        )}
                    </div>
                    <div className="col-md-2">
                        <input type="number" min={1} value={e.qte} onChange={(e) => handleChange(e, i, 'qte')} placeholder="Quantité" className={`form-control  ${errors[`products.${i}.qte`] ? 'border-red-500' : ''}`} />
                        {errors[`products.${i}.qte`] && <div className="text-danger">{errors[`products.${i}.qte`]}</div>}
                    </div>

                    <div className="col-md-3">
                        <select value={e.produit} onChange={(e) => handleChange(e, i, 'produit')} className="form-select">
                            <option value="">Sélectionnez un produit</option>
                            {articles.map(article => (
                                <option key={article.id} value={article.id}>{article.nomProduit}</option>
                            ))}
                        </select>
                        {errors[`products.${i}.produit`] && <div className="text-danger">{errors[`products.${i}.produit`]}</div>}
                    </div>
        
                    <div className="col-md-2">
                        <input type="number" value={e.pu} min={1} onChange={(e) => handleChange(e, i, 'pu')} placeholder="Prix" className={`form-control  ${errors[`products.${i}.pu`] ? 'border-red-500' : ''}`} />
                        {errors[`products.${i}.pu`] && <div className="text-danger">{errors[`products.${i}.pu`]}</div>}
                    </div>

                    <div className="col-md-2 d-flex align-items-center">
                        <button type="button" onClick={() => removeProductField(i)} className="btn btn-danger"> X </button>
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-between mb-3">
                <button type="button" onClick={addProductField} className="btn btn-primary btn-custom me-2">Ajouter Produit</button>
                <button type="submit" className="btn btn-success btn-custom">Ajouter {data.paperType === 'facture' ? 'Facture' : 'Devis'}</button>
            </div>
        </form>
    );
}
