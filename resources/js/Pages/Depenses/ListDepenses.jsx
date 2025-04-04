import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { route } from 'ziggy-js';

export default function ListDepenses({ depenses }) {
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('id');
    const [sortedDepenses, setSortedDepenses] = useState(depenses.data);
    
    const { delete: destroy } = useForm();

    const filteredDepenses = useMemo(() => {
        return sortedDepenses.filter(depense =>
            depense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            depense.montant.toString().includes(searchQuery)
        );
    }, [searchQuery, sortedDepenses]);

    const handleDelete = (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette dépense ?')) return;

        destroy(route('depenses.destroy', id), {
            onSuccess: () => {
                const updatedDepenses = sortedDepenses.filter((d) => d.id !== id);
                setSortedDepenses(updatedDepenses);
            },
            onError: () => {
                alert('Échec de la suppression de la dépense.');
            },
        });
    };

    const sortByColumn = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);

        const sorted = [...filteredDepenses].sort((a, b) => {
            if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedDepenses(sorted);
    };

    return (
        <div className="mx-auto ">
            <h1 className="text-3xl font-bold mb-4">Lister les Dépenses</h1>

            {flash?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{flash.success}</span>
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{flash.error}</span>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow pr-5">
                    <input
                        type="text"
                        placeholder="Rechercher par description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                </div>
                <Link href={route('depenses.create')} className="bg-green-700 text-white px-4 py-2 rounded">
                    <i className="bi bi-plus-square-fill"></i> Ajouter une Dépense
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-bordered table-striped">
                    <thead className='table-dark'>
                        <tr>
                            <th onClick={() => sortByColumn('id')} style={{ cursor: 'pointer' }}>
                                ID
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'id' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('description')} style={{ cursor: 'pointer' }}>
                                Objet
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'description' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('montant')} style={{ cursor: 'pointer' }}>
                                Prix
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'montant' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th>Opération</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepenses.length > 0 ? (
                            filteredDepenses.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td>{d.description}</td>
                                    <td>{d.montant}</td>
                                    <td className="d-flex gap-2">
                                        <Link href={route('depenses.edit', d.id)} className="bg-warning text-white rounded px-2 py-1 hover:bg-black">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <Link onClick={() => handleDelete(d.id)} className="bg-danger text-white rounded px-2 py-1 hover:bg-danger-dark">
                                            <i className="bi bi-trash-fill"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Aucune dépense trouvée.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {depenses?.links && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {depenses.links.map((l) => (
                            l.url ? (
                                <li className={`page-item ${l.active ? "active" : ""}`} key={l.label}>
                                    <Link className="page-link" href={l.url}>
                                        {l.label === '&laquo; Previous' ? 'Previous' : l.label === 'Next &raquo;' ? 'Next' : l.label}
                                    </Link>
                                </li>
                            ) : (
                                <li className="page-item disabled" key={l.label}>
                                    <span className="page-link">
                                        {l.label === '&laquo; Previous' ? 'Previous' : l.label === 'Next &raquo;' ? 'Next' : l.label}
                                    </span>
                                </li>
                            )
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}
