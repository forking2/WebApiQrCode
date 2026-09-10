import { useState, type FormEvent } from "react";
import { UseLoginMutation } from "./hooks/useLoginMutation.ts";
import {useGoogleLogin} from "@react-oauth/google";
import {UseGoogleLoginMutation} from "./hooks/useGoogleLoginMutation.ts";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState<string | null>(null);

    const { mutateAsync, isPending } = UseLoginMutation();
    const { mutateAsync: googleMutationAsync } = UseGoogleLoginMutation();

    const loginByGoogleHandler = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            setFormError(null);
            try {
                await googleMutationAsync({data: {token: codeResponse.access_token}});
            } catch {
                setFormError("Невірний email або пароль");
            }
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError(null);
        try {
            console.log("Email:", email, " Password:", password);
            await mutateAsync({ data: { email, password } });
        } catch {
            setFormError("Невірний email або пароль");
        }
    };

    return (
        <div className="flex items-center justify-center px-4 mt-20">
            <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <h1 className="text-2xl font-bold text-center text-gray-900">Вхід</h1>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {formError && <p className="text-red-500 text-sm">{formError}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium transition-colors"
                    >
                        {isPending ? "Вхід..." : "Увійти"}
                    </button>
                    <div className="flex items-center gap-4 py-1">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">або</span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <button
                        type="button"
                        onClick={() => loginByGoogleHandler()}
                        className="group relative flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-[0.98] "
                    >
                        <svg
                            className="absolute left-4 h-5 w-5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fill="#4285F4"
                                d="M21.35 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 21.75c2.62 0 4.82-.87 6.43-2.36l-3.14-2.44c-.87.58-1.98.93-3.29.93-2.53 0-4.67-1.71-5.44-4.01H3.32v2.52A9.72 9.72 0 0 0 12 21.75Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M6.56 13.87A5.86 5.86 0 0 1 6.25 12c0-.65.11-1.28.31-1.87V7.61H3.32A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.07 4.39l3.24-2.52Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 6.12c1.43 0 2.71.49 3.72 1.45l2.79-2.79A9.36 9.36 0 0 0 12 2.25a9.72 9.72 0 0 0-8.68 5.36l3.24 2.52C7.33 7.83 9.47 6.12 12 6.12Z"
                            />
                        </svg>
                        Продовжити через Google
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;