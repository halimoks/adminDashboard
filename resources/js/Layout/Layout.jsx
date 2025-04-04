import { Link, router, usePage } from "@inertiajs/react";
import '/resources/css/style.css';
import { useState, useEffect } from "react";

export default function Layout({ children, currentPage }) {
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [activeLink, setActiveLink] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const { url } = usePage();

    useEffect(() => {
        setActiveLink(url);
        if (url.includes('/imagine/factures')) {
            setActiveSubMenu(1);
        } else if (url.includes('/imagine/depenses')) {
            setActiveSubMenu(2);
        } else if (url.includes('/imagine/fournisseurs')) {
            setActiveSubMenu(3);
        } else if (url.includes('/imagine/articles')) {
            setActiveSubMenu(4);
        } else if (url.includes('/imagine/clients')) {
            setActiveSubMenu(5);
        } else {
            setActiveSubMenu(null); 
        }
    }, [url]);


    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        }
        localStorage.setItem("darkMode", isDarkMode);
    }, [isDarkMode]);

    
    const toggleSubMenu = (index) => {
        if (activeSubMenu === index) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(index);
        }
    };

    const handleLinkClick = (linkName, subMenuIndex = null) => {
        setActiveLink(linkName);
        if (subMenuIndex !== null) {
            setActiveSubMenu(subMenuIndex); // Open the corresponding submenu
        } else {
            setActiveSubMenu(null); // Close all submenus if a main link is clicked
        }
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const isActive = (path) => activeLink === path;

    const getBreadcrumbs = () => {
        const cleanPath = currentPage.split('?')[0].split('#')[0];
        
        if (cleanPath === '/') return [{ name: 'Accueil', path: null }];
        
        const pathParts = cleanPath.split('/').filter(part => part !== '');
        
        const breadcrumbs = [];
        let currentPath = '';
        
        pathParts.forEach((part, index) => {
            currentPath += `/${part}`;
            
            let displayName, path;
            
            if (part === 'imagine') {
                displayName = 'Imagine';
                path = '/';
            } else {
                const nameMap = {
                    'factures': 'Factures/DV/RC',
                    'depenses': 'Dépenses',
                    'fournisseurs': 'Fournisseurs',
                    'articles': 'Articles',
                    'clients': 'Clients',
                    'create': 'Nouveau',
                    'revenues': 'Revenues'
                };
                
                displayName = nameMap[part] || 
                    part.replace(/-/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase());
                path = currentPath;
            }
            
            breadcrumbs.push({
                name: displayName,
                path: index === pathParts.length - 1 ? null : path
            });
        });
        
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <>
            <nav id="sidebar">
            <ul>
                    <li>
                    <span className="logo">
                        <img src={isDarkMode ? "/imagine.png" : "/imaginecreative2.png"} alt="Logo" />
                    </span>
                    </li>
                    <li className={isActive('/') ? "active" : ""}>
                        <Link href="/" onClick={() => handleLinkClick("/")}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z"/>
                            </svg>
                            <span>Accueil</span>
                        </Link>
                    </li>

                    <li className={isActive('/imagine/factures') ? "active" : ""}>
                        <button onClick={() => toggleSubMenu(1)} className="dropdown-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-160v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5T640-360v-40h40q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480h-40v-40q0-17-11.5-28.5T600-560q-17 0-28.5 11.5T560-520v40h-40q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400h40Z"/>
                            </svg>
                            <span>Factures/DV/RC</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="arrow">
                                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/>
                            </svg>
                        </button>
                        <ul className={`sub-menu ${activeSubMenu === 1 ? "show" : ""}`}>
                            <div>
                                <li className={isActive('/imagine/factures/create') ? "active" : ""}>
                                    <Link href="/imagine/factures/create" onClick={() => handleLinkClick("/imagine/factures/create")}><span>Nouveau</span></Link>
                                </li>
                                <li className={isActive('/imagine/factures') ? "active" : ""}>
                                    <Link href="/imagine/factures/" onClick={() => handleLinkClick("/imagine/factures")}><span>Lister</span></Link>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li className={isActive('/imagine/revenues') ? "active" : ""}>
                        <Link href="/imagine/revenues" onClick={() => handleLinkClick("/imagine/revenues")}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-360h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/>
                            </svg>
                            <span>Revenues</span>
                        </Link>
                    </li>
                    <li className={isActive('/imagine/depenses') ? "active" : ""}>
                        <button onClick={() => toggleSubMenu(2)} className="dropdown-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z"/>
                            </svg>
                            <span>Depense</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="arrow">
                                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/>
                            </svg>
                        </button>
                        <ul className={`sub-menu ${activeSubMenu === 2 ? "show" : ""}`}>
                            <div>
                                <li className={isActive('/imagine/depenses/create') ? "active" : ""}>
                                    <Link href="/imagine/depenses/create" onClick={() => handleLinkClick("/imagine/depenses/create")}><span>Ajouter un depense</span></Link>
                                </li>
                                <li className={isActive('/imagine/depenses') ? "active" : ""}>
                                    <Link href="/imagine/depenses" onClick={() => handleLinkClick("/imagine/depenses")}><span>Liste les depenses</span></Link>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li className={isActive('/imagine/fournisseurs') ? "active" : ""}>
                        <button onClick={() => toggleSubMenu(3)} className="dropdown-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-160v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5T640-360v-40h40q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480h-40v-40q0-17-11.5-28.5T600-560q-17 0-28.5 11.5T560-520v40h-40q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400h40Z"/>
                            </svg>
                            <span>Fournisseurs</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="arrow">
                                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/>
                            </svg>
                        </button>
                        <ul className={`sub-menu ${activeSubMenu === 3 ? "show" : ""}`}>
                            <div>
                                <li className={isActive('/imagine/fournisseurs/create') ? "active" : ""}>
                                    <Link href="/imagine/fournisseurs/create" onClick={() => handleLinkClick("/imagine/fournisseurs/create")}><span>Nouveau Fournisseur</span></Link>
                                </li>
                                <li className={isActive('/imagine/fournisseurs') ? "active" : ""}>
                                    <Link href="/imagine/fournisseurs/" onClick={() => handleLinkClick("/imagine/fournisseurs")}><span>Lister les fournisseurs</span></Link>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li className={isActive('/imagine/articles') ? "active" : ""}>
                        <button onClick={() => toggleSubMenu(4)} className="dropdown-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z"/>
                            </svg>
                            <span>Articles</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="arrow">
                                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/>
                            </svg>
                        </button>
                        <ul className={`sub-menu ${activeSubMenu === 4 ? "show" : ""}`}>
                            <div>
                                <li className={isActive('/imagine/articles/create') ? "active" : ""}>
                                    <Link href="/imagine/articles/create" onClick={() => handleLinkClick("/imagine/articles/create")}><span>Ajouter un article</span></Link>
                                </li>
                                <li className={isActive('/imagine/articles') ? "active" : ""}>
                                    <Link href="/imagine/articles/" onClick={() => handleLinkClick("/imagine/articles")}><span>Liste les articles </span></Link>
                                </li>
                            </div>
                        </ul>
                    </li>
                    <li className={isActive('/imagine/clients') ? "active" : ""}>
                        <button onClick={() => toggleSubMenu(5)} className="dropdown-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="m221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z"/>
                        </svg>
                        <span>Clients</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="arrow">
                            <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z"/>
                        </svg>
                    </button>
                    <ul className={`sub-menu ${activeSubMenu === 5 ? "show" : ""}`}>
                        <div>
                            <li className={isActive('/imagine/clients/create') ? "active" : ""}>
                                <Link href="/imagine/clients/create" onClick={() => handleLinkClick("/imagine/clients/create")}><span>Ajouter un client</span></Link>
                            </li>
                            <li className={isActive('/imagine/clients') ? "active" : ""}>
                                <Link href="/imagine/clients" onClick={() => handleLinkClick("/imagine/clients")}><span>Liste les clients</span></Link>
                            </li>
                        </div>
                    </ul>
                </li>

                <li className={isActive('/profile') ? "active" : ""}>
                    <Link href="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                        </svg>
                        <span>Profile</span>
                    </Link>
                </li>
            </ul>
            </nav>

            <header className="main-header">
                <div className="header-content">
                    <div className="breadcrumbs">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={index}>
                                {index > 0 && <span className="separator"> / </span>}
                                {crumb.path ? (
                                    <Link href={crumb.path} className={index === breadcrumbs.length - 1 ? "active" : ""}>
                                        {crumb.name}
                                    </Link>
                                ) : (
                                    <span className="active">{crumb.name}</span>
                                )}
                            </span>
                        ))}
                    </div>
                    <div className="user-info">
                        <button 
                            className="theme-toggle" 
                            onClick={toggleDarkMode}
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill"></i>} {/* Sun and Moon icons */}
                        </button>
                        <div className="user-menu-container">
                            <button 
                                className="user-menu-toggle" 
                                onClick={toggleUserMenu}
                                aria-expanded={isUserMenuOpen}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed">
                                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                </svg>
                            </button>
                            {isUserMenuOpen && (
                                <div className="user-menu">
                                    <Link 
                                        href="/profile" 
                                        className="user-menu-item"
                                        onClick={toggleUserMenu} // Close menu on click
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#e8eaed">
                                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                        </svg>
                                        <span>Profile</span>
                                    </Link>
                                    <button 
                                        className="user-menu-item"
                                        onClick={handleLogout}
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="#e8eaed">
                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                                    </svg>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>
        </>
    );
}
