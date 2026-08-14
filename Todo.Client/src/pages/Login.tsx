import { useAuth0 } from "@auth0/auth0-react";

function Login() {

    const { loginWithRedirect } = useAuth0();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">

            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:flex">

                {/* Left Side */}
                <div className="hidden bg-blue-600 p-12 text-white md:flex md:w-1/2 md:flex-col md:justify-center">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Todo App
                        </h1>

                        <h2 className="mt-10 text-4xl font-bold leading-tight">
                            Organize your tasks.
                            <br />
                            Get things done.
                        </h2>

                        <p className="mt-6 text-lg leading-relaxed text-blue-100">
                            Manage your daily tasks, track priorities,
                            and stay organized in one simple place.
                        </p>

                        <div className="mt-10 space-y-3 text-blue-100">
                            <p>Manage your tasks easily</p>
                            <p>Track priorities and deadlines</p>
                            <p>Keep everything organized</p>
                        </div>

                    </div>

                </div>

                {/* Right Side */}
                <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:w-1/2">

                    <div className="mx-auto w-full max-w-md">

                        <div className="md:hidden">

                            <h1 className="text-2xl font-bold text-gray-900">
                                Todo App
                            </h1>

                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-gray-900 md:mt-0">
                            Welcome 
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Sign in to continue managing your tasks.
                        </p>

                        <button
                            onClick={() => loginWithRedirect()}
                            className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Continue
                        </button>

                        <p className="mt-6 text-center text-sm text-gray-400">
                            Secure authentication powered by Auth0
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;