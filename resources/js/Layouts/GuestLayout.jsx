import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <img src='/imagine.png' style={{width:'300px'}} alt="" />
                </Link>
            </div>
            <div className="mt-6 w-full max-w-md overflow-hidden bg-white px-8 py-4 shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
