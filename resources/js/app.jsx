import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import Layout from './Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page = pages[`./Pages/${name}.jsx`];

        // List of pages that should not use the layout
        const noLayoutPages = [
            'Auth/Login',
            'Auth/ConfirmPassword',
            'Auth/ForgotPassword',
            'Auth/Register',
            'Auth/ResetPassword',
            'Auth/VerifyEmail',
            'Dashboard',
            'Profile/Edit'
        ];

        // If the page is one of the auth pages, render without the layout and take full width/height
        if (noLayoutPages.includes(name)) {
            return {
                ...page,
                default: (props) => (
                    <div style={{width:'100vw',height:'auto' , backgroundColor:'white'}}>
                        {page.default(props)}
                    </div>
                ),
            };
        }
        return {
            ...page,
            default: (props) => (
                <Layout currentPage={props.url || window.location.pathname}>
                    {page.default(props)}
                </Layout>
            ),
        };
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        delay: 250,
        color: 'red',
        includeCSS: true,
        showSpinner: true,
    },
});