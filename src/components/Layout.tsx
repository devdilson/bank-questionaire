import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className="min-h-screen">
        <Header/>
        <div className="flex-1 flex items-center justify-center">
            {children}
        </div>
        <Footer />
    </div>
);

export default Layout;