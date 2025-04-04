import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';

export default function ListFactures({ factures, clients, success, error }) {
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('id');
    const [sortedFactures, setSortedFactures] = useState(factures.data); // State to store sorted data


    const { delete: destroy } = useForm();

    const getClientName = (clientId) => {
        const client = clients.find((c) => c.id === clientId);
        return client ? client.nomClient : 'N/A';
    };

    const handleDelete = (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette facture ?')) return;

        destroy(route('factures.destroy', id), {
            method: 'delete',
            onSuccess: () => {
                const updatedFactures = sortedFactures.filter((d) => d.id !== id);
                setSortedFactures(updatedFactures);
            },
            onError: () => {
                alert('Échec de la suppression de la dépense.');
            },
        });
    };
    
    const filteredFactures = sortedFactures.filter((item) => {
        const clientName = getClientName(item.client_id).toLowerCase();
        return (
            item.id.toString().includes(search.toLowerCase()) ||
            (item.object && item.object.toLowerCase().includes(search.toLowerCase())) ||
            clientName.includes(search.toLowerCase())
        );
    });

    const sortByColumn = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);

        const sorted = [...filteredFactures].sort((a, b) => {
            if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedFactures(sorted);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Liste des Factures et Devis</h1>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="flex justify-between items-center mb-4">
                <div className="flex-grow pr-5">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="mb-4">
                <Link href={route('factures.create')} className="btn btn-success">
                    <i className="bi bi-plus-square mr-2"></i> Ajouter un Devis / Facture
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-bordered table-striped">
                    <thead className='table-dark'>
                        <tr>
                            <th onClick={() => sortByColumn('source')} style={{ cursor: 'pointer' }}>
                                Type
                                <i className="bi bi-arrow-down-up"></i>
                            </th>
                            <th onClick={() => sortByColumn('id')} style={{ cursor: 'pointer' }}>
                                Id
                                <i className="bi bi-arrow-down-up"></i>
                            </th>
                            <th onClick={() => sortByColumn('dateFacture')} style={{ cursor: 'pointer' }}>
                                Date
                                <i className="bi bi-arrow-down-up"></i>
                            </th>
                            <th onClick={() => sortByColumn('client_id')} style={{ cursor: 'pointer' }}>
                                Nom Client
                                <i className="bi bi-arrow-down-up"></i>
                            </th>
                            <th onClick={() => sortByColumn('object')} style={{ cursor: 'pointer' }}>
                                Objet
                                <i className="bi bi-arrow-down-up"></i>
                            </th>
                            <th onClick={() => sortByColumn('etatPayement')} style={{ cursor: 'pointer' }}>
                                Etat Payment
                                <i className="bi bi-arrow-down-up"></i>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredFactures.length > 0 ? (
                            filteredFactures.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.source === 'facture' ? 'Facture' : 'Devis'}</td>
                                    <td>{item.id}</td>
                                    <td>{item.dateFacture || item.dateDevis}</td>
                                    <td>{getClientName(item.client_id)}</td>
                                    <td>{item.object}</td>
                                    <td>
                                        <span 
                                            style={{  backgroundColor: Number(item.etatPayement) === 0 ? '#e44c3c' : '#2ec471',  borderRadius: "5px",  color: "white",   padding: "4px 10px"   }} >
                                            {Number(item.etatPayement) === 0 ? 'Non Payée' : 'Payé'}
                                        </span>
                                    </td>
                                    <td className="d-flex gap-4 justify-center">
                                        <Link href={route('factures.edit', item.id)}>
                                            <i className="bi bi-pencil-square" style={{ 
                                                color: "#007bff", 
                                                fontSize: "1.2rem",
                                                transition: "0.3s",
                                                cursor: "pointer"
                                            }}></i>
                                        </Link>
                                        <Link onClick={() => handleDelete(item.id)}>
                                            <i className="bi bi-trash-fill" style={{ 
                                                color: "#dc3545", 
                                                fontSize: "1.2rem",
                                                transition: "0.3s",
                                                cursor: "pointer"
                                            }}></i>
                                        </Link>
                                        {item.source === 'facture' && (
                                            <>
                                                <Link target='_blank' href={route('imagine.factures.printFacture', item.id)}>
                                                    <i className="bi bi-printer-fill" style={{ 
                                                        color: "#28a745", 
                                                        fontSize: "1.2rem",
                                                        transition: "0.3s",
                                                        cursor: "pointer"
                                                    }}></i>
                                                </Link>
                                                <Link target='_blank' href={route('imagine.factures.printRecu', item.id)}>
                                                    <i className="bi bi-receipt" style={{ 
                                                        color: "#6f42c1", 
                                                        fontSize: "1.2rem",
                                                        transition: "0.3s",
                                                        cursor: "pointer"
                                                    }}></i>
                                                </Link>
                                                <Link target='_blank' href={route('imagine.factures.printBL', item.id)}>
                                                    <i className="bi bi-truck" style={{ 
                                                        color: "#fd7e14", 
                                                        fontSize: "1.2rem",
                                                        transition: "0.3s",
                                                        cursor: "pointer"
                                                    }}></i>
                                                </Link>
                                            </>
                                        )}
                                        {item.source === 'devis' && (
                                            <>
                                                <Link target='_blank' href={route('imagine.factures.printFacture', item.id)}>
                                                    <i className="bi bi-printer" style={{ 
                                                        color: "#28a745", 
                                                        fontSize: "1.2rem",
                                                        transition: "0.3s",
                                                        cursor: "pointer"
                                                    }}></i>
                                                </Link>
                                            </>
                                        )}
                                    </td>


                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Aucune facture trouvée.</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>



            {factures?.links && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {factures.links.map((l) => (
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