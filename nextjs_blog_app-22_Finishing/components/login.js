import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';


import { FaLock } from "react-icons/fa";
import { useRouter } from 'next/router';
import constants from '../utils/constants';
import { decrypt, encrypt } from '../utils/cryptoUtils';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);





    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = { email, password };

        try {
            const response = await fetch(`${constants.backend_url}users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            console.log(result)
            if (result.success == true) {

                const user_data = result.user;

                localStorage.setItem("user_data", encrypt(JSON.stringify(user_data.user)))
                localStorage.setItem("token", encrypt(user_data.token))
                toast.success(result.msg);
                router.push('/all-blogs');
            } else {
                toast.error(result.msg);
            }

        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }

    };



    return (
        <>
            <ToastContainer />
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className="mb-4 rounded-md shadow-sm -space-y-px">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"

                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    required
                                />
                            </div>
                            <div className="mb-4 rounded-md shadow-sm -space-y-px">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"

                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? "Show" : "Hide"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                No account?
                                <Link href="/register">
                                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Register
                                    </a>
                                </Link>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FaLock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}