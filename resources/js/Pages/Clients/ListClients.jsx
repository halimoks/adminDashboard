import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function ListClients({ clients }) {
    const [sortedClients, setSortedClients] = useState(clients.data);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('id');
    const [searchQuery, setSearchQuery] = useState('');
    
    const { flash } = usePage().props;

    const sortByColumn = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);
    
        const sorted = [...clients].sort((a, b) => {
            if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedClients(sorted);
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        
        const filteredClients = clients.filter(client =>
            client.nomClient.toLowerCase().includes(query) || 
            client.nomSociete.toLowerCase().includes(query) ||
            client.telephone.toLowerCase().includes(query) ||
            client.email.toLowerCase().includes(query)
        );
        
        setSortedClients(filteredClients);
    };

    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;

        destroy(route('clients.destroy', id), {
            onSuccess: () => {
                console.log('halim')
            },
            onError: (errors) => {
                alert('Failed to delete client.');
            },
        });
    };

    return (
        <>
            <h1 className="h2 mb-6">List Clients</h1>

                {flash?.success && <div className="alert alert-success">{flash.success}</div>}
                {flash?.error && <div className="alert alert-danger">{flash.error}</div>}

                <input type="text" placeholder="Search by Client Name or Company" value={searchQuery} onChange={handleSearch} className="form-control rounded mb-3"/>

                <table className="table table-borderd">
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => sortByColumn('id')} style={{ cursor: 'pointer' }}>
                                #
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'id' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('nomClient')} style={{ cursor: 'pointer' }}>
                                Nom Client 
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'nomClient' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('nomSociete')} style={{ cursor: 'pointer' }}>
                                Nom Société
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'nomSociete' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('telephone')} style={{ cursor: 'pointer' }}>
                                Téléphone
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'telephone' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn('email')} style={{ cursor: 'pointer' }}>
                                Email
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'email' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedClients.map((client, i) => (
                            <tr key={i}>
                                <td>{client.id}</td>
                                <td>{client.nomClient}</td>
                                <td>{client.nomSociete}</td>
                                <td>{client.telephone}</td>
                                <td>{client.email}</td>
                                <td>
                                    <Link href={route('clients.edit', client.id)} className="btn text-white btn-warning btn-sm">
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <Link onClick={() => handleDelete(client.id)} className="btn text-white btn-danger btn-sm ms-2">
                                        <i className="bi bi-trash-fill"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {clients?.links && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {clients.links.map((l) => (
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
