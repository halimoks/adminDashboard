import { useForm, usePage } from "@inertiajs/react";

export default function EditDepense({ depense }) {
    const { old, errors } = usePage().props;

    const { data, setData, put, processing } = useForm({
        description: old?.description || depense?.description || '',
        montant: old?.montant || depense?.montant || '',
    });

    function submit(e) {
        e.preventDefault();
        put(`/imagine/depenses/${depense.id}`,{

            onSuccess: () => {
                console.log('halim')
            },
            onError: () => {
                console.log('machi halim')
            },
        }
        );
    }

    return (
        <form onSubmit={submit} className="p-5 shadow-sm">
            <h2 className="mb-4 h2">Edit Depense</h2>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    id="description"
                    type="text"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className={`form-control ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="Description"
                />
                {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>

            {/* Montant Field */}
            <div className="mb-3">
                <label htmlFor="montant" className="form-label">Montant</label>
                <input
                    id="montant"
                    type="text"
                    value={data.montant}
                    onChange={(e) => setData('montant', e.target.value)}
                    className={`form-control ${errors.montant ? 'border-red-500' : ''}`}
                    placeholder="Montant"
                />
                {errors.montant && <div className="text-danger">{errors.montant}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" disabled={processing}>
                {processing ? "Submitting..." : "Update"}
            </button>
        </form>
    );
}
