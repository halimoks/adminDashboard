import { useForm } from "@inertiajs/react";

export default function CreateArticle({ fournisseurs }) {
    const { data, setData, post, processing, errors } = useForm({
        nomProduit: '',
        quantity: '',
        fournisseur_id: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    return (
        <>
        <div className="">
            <h1 className="mb-4 h2">Create Article</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nomProduit" className="form-label">Nom Produit</label>
                    <input type="text" placeholder="Nom Produit" id="nomProduit" className={`form-control rounded ${errors.nomProduit ? 'is-invalid' : ''}`} value={data.nomProduit} onChange={e => setData('nomProduit', e.target.value)} required />
                    {errors.nomProduit && <div className="invalid-feedback">{errors.nomProduit}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantité</label>
                    <input type="number" placeholder="Quantity" min={1} id="quantity" className={`form-control rounded ${errors.quantity ? 'is-invalid' : ''}`} value={data.quantity} onChange={e => setData('quantity', e.target.value)} required />
                    {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="fournisseur_id" className="form-label">Nom Fournisseur</label>
                    <select id="fournisseur_id" className={`form-select rounded ${errors.fournisseur_id ? 'is-invalid' : ''}`} value={data.fournisseur_id} onChange={e => setData('fournisseur_id', e.target.value)} required >
                        <option value="">Select a fournisseur</option>
                        {fournisseurs.map(fournisseur => (
                            <option key={fournisseur.id} value={fournisseur.id}>
                                {fournisseur.nomFournisseur}
                            </option>
                        ))}
                    </select>
                    {errors.fournisseur_id && <div className="invalid-feedback">{errors.fournisseur_id}</div>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={processing}>
                    {processing ? 'Adding...' : 'Add Article'}
                </button>
            </form>
            </div>
        </>
    );
}
