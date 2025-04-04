import { useForm } from '@inertiajs/react';

export default function EditArticle({ fournisseurs, article }) {
    const { data, setData, put, processing, errors } = useForm({
        nomProduit: article.nomProduit || '',
        quantity: article.quantity || '',
        fournisseur_id: article.fournisseur_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/imagine/articles/${article.id}`);
    };

    return (
        <>
            <h1 className='h2'>Edit Article</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="nomProduit" className="form-label">Nom Produit</label>
                    <input 
                        type="text" 
                        placeholder="Nom Produit" 
                        id="nomProduit" 
                        className={`form-control ${errors.nomProduit ? 'is-invalid' : ''}`} 
                        value={data.nomProduit} 
                        onChange={(e) => setData('nomProduit', e.target.value)} 
                        required 
                    />
                    {errors.nomProduit && <div className="invalid-feedback">{errors.nomProduit}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantité</label>
                    <input 
                        type="number" 
                        placeholder="Quantity" 
                        min={1} 
                        id="quantity" 
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} 
                        value={data.quantity} 
                        onChange={(e) => setData('quantity', e.target.value)} 
                        required 
                    />
                    {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="fournisseur_id" className="form-label">Nom Fournisseur</label>
                    <select 
                        id="fournisseur_id" 
                        className={`form-select ${errors.fournisseur_id ? 'is-invalid' : ''}`} 
                        value={data.fournisseur_id} 
                        onChange={(e) => setData('fournisseur_id', e.target.value)} 
                        required
                    >
                        <option value="">Select a fournisseur</option>
                        {fournisseurs.map((f) => (
                            <option key={f.id} value={f.id}>{f.nomFournisseur}</option>
                        ))}
                    </select>
                    {errors.fournisseur_id && <div className="invalid-feedback">{errors.fournisseur_id}</div>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Article'}
                </button>
            </form>
        </>
    );
}