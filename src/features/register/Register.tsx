import { useContext, useState } from "react";
import { BankServiceContext } from "../../services";
import { useNavigate } from "react-router-dom";
import { BackendError } from "../../model/model";
import ErrorMessage from "../../components/Errors";


export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<BackendError | null>(null);
    const navigate = useNavigate()
    const bankService = useContext(BankServiceContext);



    const createAccount = async () => {
        setError(null)
        if (username && password) {
            await bankService.registerAccount({
                username: username.toLocaleLowerCase(),
                password: password.toLocaleLowerCase(),
            }).catch((error) => {
                if (error.code === 'USER_EXISTS') {
                    navigate("/login?showLoginMessage=true")
                }
            });

            navigate("/login?showLoginMessage=true")
        }
    }

    return (
        <div className="min-h-screen flex items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Open Bank Account</h2>
                    <p className="text-gray-500 mt-2">Create your account credentials</p>
                </div>

                {error && (
                    <ErrorMessage message={error.message} type='error' />
                )}

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={createAccount}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}