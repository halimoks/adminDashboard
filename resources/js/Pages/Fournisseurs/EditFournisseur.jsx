import { useForm, usePage } from "@inertiajs/react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditFournisseur({ fournisseur }) {
    const { old } = usePage().props;

    const { data, setData, put, processing } = useForm({
        nomFournisseur: old?.nomFournisseur || fournisseur.nomFournisseur || '',
        nomSC: old?.nomSC || fournisseur.nomSC || '',
        tel: old?.tel || fournisseur.tel || '',
        fax: old?.fax || fournisseur.fax || '',
        email: old?.email || fournisseur.email || '',
        adresse: old?.adresse || fournisseur.adresse || ''
    });

    const { errors } = usePage().props;

    function submit(e) {
        e.preventDefault();
        put(`/imagine/fournisseurs/${fournisseur.id}`);
    }

    return (
        <>
            <form onSubmit={submit} disabled={processing} className=" p-5 shadow-sm">
                <h1 className='mb-4 h2'>Edit Fournisseur</h1>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nomFournisseur" className="form-label">Nom du Fournisseur</label>
                        <input type="text" className="form-control" value={data.nomFournisseur} onChange={(e) => setData('nomFournisseur', e.target.value)} />
                        {errors.nomFournisseur && <div className="text-danger">{errors.nomFournisseur}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="nomSC" className="form-label">Nom de la Société</label>
                        <input type="text" className="form-control" value={data.nomSC} onChange={(e) => setData('nomSC', e.target.value)} />
                        {errors.nomSC && <div className="text-danger">{errors.nomSC}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="tel" className="form-label">Téléphone</label>
                        <input type="text" className="form-control" value={data.tel} onChange={(e) => setData('tel', e.target.value)} />
                        {errors.tel && <div className="text-danger">{errors.tel}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fax" className="form-label">Fax</label>
                        <input type="text" className="form-control" value={data.fax} onChange={(e) => setData('fax', e.target.value)} />
                        {errors.fax && <div className="text-danger">{errors.fax}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="adresse" className="form-label">Adresse</label>
                        <input type="text" className="form-control" value={data.adresse} onChange={(e) => setData('adresse', e.target.value)} />
                        {errors.adresse && <div className="text-danger">{errors.adresse}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-success" disabled={processing}>
                    {processing ? 'Processing...' : 'Update Fournisseur'}
                </button>
            </form>
        </>
    );
}
