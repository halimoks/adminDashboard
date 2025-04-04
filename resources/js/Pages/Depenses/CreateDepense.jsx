import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function CreateDepense({old, errors}) {
    const { data, setData, post, processing} = useForm({
        description: old?.description || '',
        montant: old?.montant || '',
    });

    
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/imagine/depenses", {
            preserveScroll: true,
            preserveState: false,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className=" p-5 shadow-sm">
            <h2 className="mb-4 h2">Ajouter un depense</h2>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input id="description" type="text" value={data.description}  onChange={(e) => setData('description', e.target.value)} className={`form-control ${errors.object ? 'border-red-500' : ''}`} placeholder="Objet" />
                {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="Montant" className="form-label">Montant</label>
                <input id="montant" type="number" value={data.montant}  onChange={(e) => setData('montant', e.target.value)} className={`form-control ${errors.object ? 'border-red-500' : ''}`} placeholder="Montant" />
                {errors.montant && <div className="text-danger">{errors.montant}</div>}
            </div>

                <button type="submit" className="btn btn-primary" disabled={processing}>
                    {processing ? "Submitting..." : "Create"}
                </button>
        
            </form>
        </>
    );
}
