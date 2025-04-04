import { useForm, usePage } from "@inertiajs/react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateClient() {
    const { old } = usePage().props;
    const { data, setData, post, processing } = useForm({
        nomClient: old?.nomClient || '',
        nomSociete: old?.nomSociete || '',
        telephone: old?.telephone || '',
        email: old?.email || '',
        adresse: old?.adresse || '',
        ICE: old?.ICE || '',
        IF: old?.IF || ''
    });
    
    const { errors } = usePage().props;

    function submit(e) {
        e.preventDefault();
        post('/imagine/clients', {
            onSuccess: () => {
                console.log('Client added successfully');
            },
            onError: () => {
                console.log('Error adding client');
            }
        });
    }

    return (
        <form onSubmit={submit} disabled={processing} className="p-5 shadow-sm">
            <h1 className='mb-4 h3'>Create Client</h1>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="nomClient" className="form-label">Nom Client</label>
                    <input type="text" placeholder="Nom Client" className="form-control rounded" value={data.nomClient} onChange={(e) => setData('nomClient', e.target.value)} />
                    {errors.nomClient && <div className="text-danger">{errors.nomClient}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="nomSociete" className="form-label">Nom Société</label>
                    <input type="text" placeholder="Nom Société" className="form-control rounded" value={data.nomSociete} onChange={(e) => setData('nomSociete', e.target.value)} />
                    {errors.nomSociete && <div className="text-danger">{errors.nomSociete}</div>}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="telephone" className="form-label">Téléphone</label>
                    <input type="tel" placeholder="Téléphone" className="form-control rounded" value={data.telephone} onChange={(e) => setData('telephone', e.target.value)} />
                    {errors.telephone && <div className="text-danger">{errors.telephone}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" placeholder="Email" className="form-control rounded" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="adresse" className="form-label">Adresse</label>
                    <input type="text" placeholder="Adresse" className="form-control rounded" value={data.adresse} onChange={(e) => setData('adresse', e.target.value)} />
                    {errors.adresse && <div className="text-danger">{errors.adresse}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="ICE" className="form-label">ICE</label>
                    <input type="text" placeholder="ICE" className="form-control rounded" value={data.ICE} onChange={(e) => setData('ICE', e.target.value)} />
                    {errors.ICE && <div className="text-danger">{errors.ICE}</div>}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="IF" className="form-label">IF</label>
                    <input type="text" placeholder="IF" className="form-control rounded" value={data.IF} onChange={(e) => setData('IF', e.target.value)} />
                    {errors.IF && <div className="text-danger">{errors.IF}</div>}
                </div>
            </div>

            <button type="submit" className="btn btn-success" disabled={processing}>
                {processing ? 'Processing...' : 'Ajouter Client'}
            </button>
        </form>
    );
}