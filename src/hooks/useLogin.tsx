import { useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BankServiceContext } from "../services";

interface UseLoginResult {
    username: string;
    password: string;
    loginError: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    showLoginMessage: string | null;
}

export const useLogin = (): UseLoginResult => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setError] = useState<string>("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const bankService = useContext(BankServiceContext);

    const showLoginMessage = searchParams.get("showLoginMessage");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await bankService.login(username, password);
            navigate("/dashboard");
            // eslint-disable-next-line
        } catch (err: any) {
            searchParams.delete("showLoginMessage");
            if ("message" in err) {
                setError(err.message || "Failed to login");
            }

        }
    };

    return {
        username,
        password,
        loginError,
        setUsername,
        setPassword,
        handleSubmit,
        showLoginMessage
    };
};