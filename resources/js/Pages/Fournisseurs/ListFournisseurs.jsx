import { Link, useForm } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import { route } from 'ziggy-js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ListFournisseurs({ fournisseurs , flash }) {
    const { delete: destroy } = useForm();

    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('id');

    const filteredFournisseurs = useMemo(() => {
        return fournisseurs.data.filter((item) => {
            return (
                item.nomFournisseur.toLowerCase().includes(search.toLowerCase()) ||
                item.nomSC.toLowerCase().includes(search.toLowerCase()) ||
                item.tel.includes(search)
            );
        });
    }, [search, fournisseurs]);

    const sortedFournisseurs = useMemo(() => {
        return [...filteredFournisseurs].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredFournisseurs, sortOrder, sortColumn]);

    const sortByColumn = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this supplier?')) return;

        destroy(route('fournisseurs.destroy', id), {
            onSuccess: () => {
                window.history.pushState(null, '', '/imagine/fournisseurs');
            },
            onError: (errors) => {
                alert('Failed to delete fournisseur.');
            },
        });
    };


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Liste des Fournisseurs</h1>

            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow pr-5">
                    <input type="text" name="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 rounded px-2 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
                </div>
                    <Link href={route('fournisseurs.create')} className="bg-green-700 text-white px-4 py-2 rounded">
                        <i className="bi bi-plus-square-fill"></i> Ajouter un Fournisseur
                    </Link>

            </div>

            {flash?.success && <div className="alert alert-success">{flash.success}</div>}
            {flash?.error && <div className="alert alert-danger">{flash.error}</div>}


            <div className="overflow-x-auto">
            <table className="table table-bordered table-striped">
                <thead className='table-dark'>
                    <tr>
                        <th onClick={() => sortByColumn('nomFournisseur')} className="cursor-pointer">Nom Fournisseur</th>
                        <th onClick={() => sortByColumn('nomSC')} className="cursor-pointer">Nom SC</th>
                        <th onClick={() => sortByColumn('tel')} className="cursor-pointer">Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFournisseurs.length > 0 ? (
                        sortedFournisseurs.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nomFournisseur}</td>
                                <td>{item.nomSC}</td>
                                <td>{item.tel}</td>
                                <td className="d-flex gap-2">
                                    <Link href={route('fournisseurs.edit', item.id)} className="bg-warning text-white rounded px-2 py-1 hover:bg-black">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Link onClick={() => handleDelete(item.id)} className="bg-danger text-white rounded px-2 py-1 hover:bg-danger-dark">
                                        <i className="bi bi-trash-fill"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Aucun fournisseur trouvé.</td>
                        </tr>
                    )}
                </tbody>
            </table>


        </div>
        {fournisseurs?.links && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {fournisseurs.links.map((l) => (
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
            </>
    );
}