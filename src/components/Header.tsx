import { useContext } from "react";
import { BankServiceContext } from "../services";

interface HeaderProps {

}
const Header: React.FC<HeaderProps> = ({ }) => {
    const bankService = useContext(BankServiceContext);

    const account = bankService.getCurrentUser();

    return <header className="bg-white shadow-sm p-4 fixed top-0 left-0 right-0 flex justify-between items-center">
        <h1 className="text-gray-800 font-semibold">SecureBank</h1>
        <div className="flex items-center gap-4">
            {account && (
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">{new Date().toDateString()}</span>
                    <span className="text-gray-800">Welcome, {account.username}</span>
                    {account.entitlement?.map(r => <span key={r} className="px-2 py-1 text-xs font-medium rounded">
                        {r}
                    </span>)}
                </div>
            )}
        </div>
    </header>
}

export default Header;