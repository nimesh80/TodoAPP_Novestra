type NavbarProps = {
    userName: string;
};

function Navbar({ userName }: NavbarProps) {
    return (
        <nav className="bg-blue-600 shadow">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <h1 className="text-2xl font-bold text-white">
                    Todo App
                </h1>

                <button className="rounded-lg px-4 py-2 text-white transition hover:bg-blue-700">
                    {userName} ▼
                </button>
            </div>
        </nav>
    );
}

export default Navbar;