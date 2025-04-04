import { useForm, usePage } from "@inertiajs/react";
export default function EditClient({client}){

    const { old } = usePage().props;

    const {data,setData, put, processing } = useForm({
        nomClient: old?.nomClient || client.nomClient || '',
        nomSociete: old?.nomSociete || client.nomSociete || '',
        telephone: old?.telephone || client.telephone || '',
        email: old?.email || client.email || '',
        adresse: old?.adresse || client.adresse || '',
        ICE: old?.ICE || client.ICE || '',
        IF: old?.IF || client.IF || ''
    });

    const { errors } = usePage().props;

    function submit(e) {
        e.preventDefault();
        put(`/imagine/clients/${client.id}`);
    }

    return(
        <>
        <form className="p-5 shadow-sm" onSubmit={submit}>
            <h1 className='h2 mb-4'>Modifier Client</h1>

    <div className="row mb-3">
        <div className="col-md-6">
            <label htmlFor="nomClient" className="form-label">Nom Client</label>
            <input type="text" placeholder='Nom Client' value={data.nomClient} id="nomClient"  onChange={(e) => setData('nomClient', e.target.value)} className="form-control rounded" required />
            {errors.nomClient && <div className="text-danger">{errors.nomClient}</div>}
        </div>

        <div className="col-md-6">
            <label htmlFor="nomSociete" className="form-label">Nom Société</label>
            <input type="text" placeholder='Nom Société' value={data.nomSociete} id="nomSociete"  onChange={(e) => setData('nomSociete', e.target.value)} className="form-control rounded" required />
            {errors.nomSociete && <div className="text-danger">{errors.nomSociete}</div>}
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label htmlFor="telephone" className="form-label">Téléphone</label>
            <input type="tel" placeholder='Téléphone' value={data.telephone} id="telephone"  onChange={(e) => setData('telephone', e.target.value)} className="form-control rounded" required />
            {errors.telephone && <div className="text-danger">{errors.telephone}</div>}
        </div>

        <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" placeholder='Email' value={data.email} id="email" onChange={(e) => setData('email', e.target.value)} className="form-control rounded" required />
            {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label htmlFor="adresse" className="form-label">Adresse</label>
            <input type="text" placeholder='Adresse' value={data.adresse} id="adresse"  onChange={(e) => setData('adresse', e.target.value)} className="form-control rounded" required />
            {errors.adresse && <div className="text-danger">{errors.adresse}</div>}
        </div>

        <div className="col-md-6">
            <label htmlFor="ICE" className="form-label">ICE</label>
            <input type="text" placeholder='ICE' value={data.ICE} id="ICE"  onChange={(e) => setData('ICE', e.target.value)} className="form-control rounded" required />
            {errors.ICE && <div className="text-danger">{errors.ICE}</div>}
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label htmlFor="IF" className="form-label">IF</label>
            <input type="text" placeholder='IF' value={data.IF} id="IF"  onChange={(e) => setData('IF', e.target.value)} className="form-control rounded" required />
            {errors.IF && <div className="text-danger">{errors.IF}</div>}
        </div>
    </div>

    <button type="submit" className="btn btn-success" disabled={processing}>
        {processing ? 'Processing...' : 'Modifier'}
    </button>
</form>

        </>
    )
}