import { useState } from 'react';
import Link from 'next/link';
import constants from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';



export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

  
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

 
        const data = { fullName : name, email, password };

        try {
            const response = await fetch(`${constants.backend_url}users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result  = await response.json();
            if (result.success == true) {
             toast.success(result.msg);
             router.push('/sign-in'); 
              } else {
                toast.error(result.msg);
              }
           
        } catch (error) {
            toast.error("Something Went Wrong");
        }

    };

    return (

        <>
       <ToastContainer />
   
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link href="/sign-in">
                            <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                 Login
                            </a>
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>





                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <label htmlFor="email-address" className="sr-only">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input

                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                            required
                        />
                      
                      <span onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? "Show" : "Hide"}
                                </span>
                    </div>


                    <div className="mb-4 rounded-md shadow-sm -space-y-px">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Register
                        </button>
                    </div>

                </form>
            </div>
        </div>
        </>
    );

}