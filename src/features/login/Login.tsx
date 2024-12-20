import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
    const {
        username,
        password,
        loginError,
        setUsername,
        setPassword,
        handleSubmit,
        showLoginMessage
    } = useLogin();

    return (
        <div className="min-h-screen flex items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="text-gray-500 mt-2">Please enter your details</p>
                </div>

                {showLoginMessage && (
                    <ErrorMessage message="Please login with your account" />
                )}

                {loginError && <ErrorMessage message={loginError} type='error' />}

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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        onClick={handleSubmit}
                    >
                        Log In
                    </button>
                </form>

                <div className="pt-4 border-t border-gray-200">
                    <Link to="/register">
                        <button className="w-full bg-gray-50 text-gray-700 py-3 rounded-lg">
                            Create Account
                        </button>
                    </Link>
                </div>


            </div>
        </div>
    );
}