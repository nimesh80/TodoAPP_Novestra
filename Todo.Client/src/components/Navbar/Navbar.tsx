import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {

    const { user, logout } = useAuth0();

    return (

        <nav className="flex items-center justify-between bg-blue-600 px-8 py-4 shadow">

            <h1 className="text-2xl font-bold text-white">
                Todo App
            </h1>

            <div className="flex items-center gap-4">

                <span className="text-white font-medium">
                    {user?.name}
                </span>

                <button
                    onClick={() =>
                        logout({
                            logoutParams: {
                                returnTo: window.location.origin,
                            },
                        })
                    }
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;