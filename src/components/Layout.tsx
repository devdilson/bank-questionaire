import React, { useContext } from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { BankServiceContext } from '../services/service';
import { useNavigate } from 'react-router-dom';



interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const bankService = useContext(BankServiceContext);
    const navigate = useNavigate();
    const currentUser = bankService.getCurrentUser();
    return (
        <div className="min-h-screen flex flex-col">
            <Header
                currentUser={currentUser}
                onLogout={() => {
                    bankService.logout();
                    navigate("/login");
                }}
                companyName="SecureBank"
            />
            <main className="flex-2 mx-auto flex items-center justify-center">
                <div className="w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );

}



export default Layout;


