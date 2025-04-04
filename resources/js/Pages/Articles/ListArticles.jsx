import { Link, useForm, usePage } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { route } from "ziggy-js";

export default function ListArticles({ articles , fournisseurs}) {
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('id');
    const [sortedArticles, setSortedArticles] = useState(articles.data);

    const { delete: destroy } = useForm();


    const filteredArticles = useMemo(() => {
        return sortedArticles.filter(article =>
            article.nomProduit.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, sortedArticles]);

    const handleDelete = (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet article ?")) return;

        destroy(route("articles.destroy", id), {
            method: 'delete', 
            preserveScroll: true,
            onSuccess: () => {
                setSortedArticles((prev) => prev.filter((a) => a.id !== id));
            },
            onError: () => {
                alert("Échec de la suppression de l'article.");
            },
        });
    };

    const sortByColumn = (column) => {
        const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
        setSortColumn(column);

        const sorted = [...filteredArticles].sort((a, b) => {
            if (a[column] < b[column]) return newSortOrder === "asc" ? -1 : 1;
            if (a[column] > b[column]) return newSortOrder === "asc" ? 1 : -1;
            return 0;
        });

        setSortedArticles(sorted);
    };

    return (
        <div className="mx-auto ">
            <h1 className="text-3xl font-bold mb-4">Liste des Articles</h1>

            {flash?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {flash.error}
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
                <Link href={route('articles.create')} className="bg-green-700 text-white px-4 py-2 rounded">
                    <i className="bi bi-plus-square-fill"></i> Ajouter une Dépense
                </Link>
            </div>

            <div className="overflow-x-auto">
            <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => sortByColumn("id")} className="cursor-pointer">
                                ID
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'id' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn("nomProduit")} className="cursor-pointer">
                                Nom Produit
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'description' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th onClick={() => sortByColumn("quantity")} className="cursor-pointer">
                                Quantité
                                <i className={`bi bi-arrow-down-up pl-2 ${sortColumn === 'description' ? (sortOrder === 'asc' ? 'rotate-180' : '') : ''}`}></i>
                            </th>
                            <th>
                                Nom Fournisseur
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.nomProduit}</td>
                                    <td>{a.quantity}</td>
                                    <td>
                                        {fournisseurs.find(f => f.id === a.fournisseur_id)?.nomFournisseur || 'Non défini'}
                                    </td>
                                    <td className="d-flex gap-2">
                                        <Link href={route("articles.edit", a.id)} className="bg-warning text-white rounded px-2 py-1 hover:bg-black">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <Link onClick={() => handleDelete(a.id)} className="bg-danger text-white rounded px-2 py-1 hover:bg-danger-dark">
                                            <i className="bi bi-trash-fill"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">Aucun article trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {articles?.links && (
                <nav>
                    <ul className="pagination justify-content-center mt-4">
                        {articles.links.map((l) => (
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
