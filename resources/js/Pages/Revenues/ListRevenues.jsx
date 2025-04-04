import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

const RevenueTable = ({ revenues: initialRevenues, success,error }) => {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('id');
    const [revenues, setRevenues] = useState(initialRevenues);


    console.log(success, error)
    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this revenue?')) return;

        destroy(route('revenues.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                setRevenues(prev => ({
                    ...prev,
                    data: prev.data.filter(revenue => revenue.id !== id)
                }));
            },
            onError: () => alert('Failed to delete revenue.'),
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const sortByColumn = (column) => {
        setSortOrder(sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc');
        setSortColumn(column);
    };

    // Safely filter revenues
    const filteredRevenues = revenues?.data?.filter(revenue =>
        revenue.object.toLowerCase().includes(searchQuery) ||
        revenue.prix.toString().includes(searchQuery)
    ) || [];

    // Sort revenues
    const sortedRevenues = [...filteredRevenues].sort((a, b) => {
        const aValue = sortColumn === 'prix' ? a.prix : a[sortColumn];
        const bValue = sortColumn === 'prix' ? b.prix : b[sortColumn];

        return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });

    return (
        <div>


            <h1 className="mb-4 h2">List Revenues</h1>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <input 
                type="text" 
                placeholder="Rechercher par Objet ou Prix" 
                value={searchQuery} 
                onChange={handleSearch} 
                className="form-control mb-3 rounded"
            />

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => sortByColumn('id')} style={{ cursor: 'pointer' }}>
                                ID 
                                <i className={`bi bi-arrow-down-up mx-2 ${sortColumn === 'id' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('object')} style={{ cursor: 'pointer' }}>
                                Objet 
                                <i className={`bi bi-arrow-down-up mx-2 ${sortColumn === 'object' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('prix')} style={{ cursor: 'pointer' }}>
                                Prix 
                                <i className={`bi bi-arrow-down-up mx-2 ${sortColumn === 'prix' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th>Opération</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRevenues.length > 0 ? (
                            sortedRevenues.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.object}</td>
                                    <td>{e.prix}</td>
                                    <td className="d-flex gap-2">
                                        <Link href={route('revenues.edit', e.id)} className="bg-warning text-white rounded px-2 py-1 hover:bg-black">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <Link onClick={() => handleDelete(e.id)} className="bg-danger text-white rounded px-2 py-1 hover:bg-danger-dark"title="Delete">
                                            <i className="bi bi-trash"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Aucun revenu trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {revenues?.links && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {revenues.links.map((l) => (
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
};

export default RevenueTable;