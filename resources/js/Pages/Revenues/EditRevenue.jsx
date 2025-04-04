import { useForm, usePage } from "@inertiajs/react";

export default function EditRevenue({ revenue, errors, old }) {
    const { data, setData, put, processing } = useForm({
        object: old?.object || revenue?.object || '',
        prix: old?.prix || revenue?.prix || '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (revenue && revenue.id) {
            put(route('revenues.update', revenue.id), {
                onSuccess: () => {
                    window.history.pushState(null, '', '/imagine/revenues');
                },
            });
        } else {
            console.error("Revenue object or id is undefined");
        }
    };

    return (
        <div className="mt-5">
            <h1 className="mb-4 h2">Modifier un revenu</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-2">
                    <label htmlFor="object">Objet</label>
                    <input type="text" className="form-control rounded" name="object" id="object" value={data.object} onChange={(e) => setData('object', e.target.value)} />
                    {errors?.object && <div className="text-danger">{errors.object}</div>}
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="prix">Montant</label>
                    <input type="number" className="form-control rounded" name="prix" id="prix" value={data.prix} onChange={(e) => setData('prix', e.target.value)} />
                    {errors?.prix && <div className="text-danger">{errors.prix}</div>}
                </div>

                <button type="submit" className="btn btn-primary mt-4" disabled={processing}>
                    {processing ? 'Updating...' : 'Modifier'}
                </button>
            </form>
        </div>
    );
}
