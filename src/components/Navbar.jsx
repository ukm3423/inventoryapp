
const Navbar = () => {
    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className=" mx-auto px-4 py-3 flex justify-between items-center">
                {/* Toggle button for opening sidebar (shown on mobile) */}
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {/* Logo or Company Name */}
                <div className="flex items-center">
                    {/* <img className="h-8 mr-2" src="/logo.png" alt="Company Logo" /> */}
                    <span className="text-white text-xl font-semibold">Dashboard</span>
                </div>
                {/* Login and Profile Image */}
                <div className="flex items-center">
                    <input type="text" placeholder="Search..." className="bg-gray-800 text-white py-1 px-2 rounded-md mr-4 hidden md:block" />
                    <button className="text-white mr-4">Login</button>
                    <img src="/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
