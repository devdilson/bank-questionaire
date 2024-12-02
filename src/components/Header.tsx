import React, { FC } from "react";
import { Account } from "../model/model";

export interface HeaderProps {
    currentUser: Account | null;
    onLogout: () => void;
    companyName?: string;
}


const Header: FC<HeaderProps> = ({
    currentUser,
    onLogout,
    companyName = "SecureBank"
}) => {
    return (
        <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 flex justify-between items-center">
            <h1 className="text-gray-800 font-semibold">{companyName}</h1>
            <div className="flex items-center gap-4">
                {currentUser && (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">{new Date().toDateString()}</span>
                        <span className="text-gray-800">Welcome, {currentUser.username}</span>
                        {currentUser.entitlement?.map(r => (
                            <span key={r} className="px-2 py-1 text-xs font-medium rounded">
                                {r}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {currentUser && (
                <a
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        onLogout();
                    }}
                >
                    Log out
                </a>
            )}
        </header>
    );
};

export default Header;
