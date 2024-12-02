import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-2 mx-auto flex items-center justify-center">
            <div className="w-full">
                {children}
            </div>
        </main>
        <Footer />
    </div>
);

export default Layout;