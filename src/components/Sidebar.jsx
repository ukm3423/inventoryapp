import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstore, AiOutlineShopping, AiOutlineFileText, AiOutlineSetting } from 'react-icons/ai';
import logo from '../assets/sspl.png';

const Sidebar = () => {
    const [masterDropdown, setMasterDropdown] = useState(false);
    const [reportsDropdown, setReportsDropdown] = useState(false);
    const location = useLocation();

    const toggleMasterDropdown = () => {
        setMasterDropdown(!masterDropdown);
        setReportsDropdown(false); // Close other dropdown if open
    };

    const toggleReportsDropdown = () => {
        setReportsDropdown(!reportsDropdown);
        setMasterDropdown(false); // Close other dropdown if open
    };

    return (
        <div className="bg-gradient-to-b from-blue-700 via-teal-600 to-green-600 w-64  flex-shrink-0">
            <div className="p-4 flex items-center justify-center flex-col">
                <div className="flex flex-col items-center mb-4 w-full">
                    <img src={logo} alt="Company Logo" className="h-16 w-auto mb-2" />
                    <h1 className="text-white text-lg font-semibold">Sparrow Softech</h1>
                </div>
                <hr className="border-t border-gray-300 w-full" />
            </div>
            <nav className="mt-4">
                <ul>
                    <li className="mb-2">
                        <Link to="/" className={`flex items-center text-gray-200 font-semibold mx-5 my-2 hover:bg-white hover:text-gray-800 hover:rounded-md py-2 px-4 w-5/6 ${location.pathname === '/' ? 'bg-white text-gray-900 rounded-md' : ''}`}>
                            <AiOutlineHome className="mr-2" />
                            Overview
                        </Link>
                    </li>
                    <li className="mb-2">
                        <button onClick={toggleMasterDropdown} className={`flex items-center text-gray-200 font-semibold mx-5 my-2 hover:bg-white hover:text-gray-800 hover:rounded-md py-2 px-4 w-5/6 text-left focus:outline-none relative `}>
                            <AiOutlineAppstore className="mr-2" />
                            Master
                            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-transform">
                                <svg className={`h-5 w-5 ${masterDropdown ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                        {masterDropdown && (
                            <ul className="pl-4">
                                <li className="mb-2"><Link to="/product" className={`text-gray-200 hover:text-gray-800 hover:bg-white py-2 px-4 block rounded-md w-4/5 ml-7 font-semibold ${location.pathname === '/product' ? 'bg-white text-gray-900 rounded-md' : ''}`}>Product</Link></li>
                                <li className="mb-2"><Link to="/category" className={`text-gray-200 hover:text-gray-800 hover:bg-white py-2 px-4 block rounded-md w-4/5 ml-7 font-semibold ${location.pathname === '/category' ? 'bg-white text-gray-900 rounded-md' : ''}`}>Category</Link></li>
                                <li className="mb-2"><Link to="/supplier" className={`text-gray-200 hover:text-gray-800 hover:bg-white py-2 px-4 block rounded-md w-4/5 ml-7 font-semibold ${location.pathname === '/supplier' ? 'bg-white text-gray-900 rounded-md' : ''}`}>Supplier</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className="mb-2">
                        <Link to="/purchase" className={`flex items-center text-gray-200 font-semibold mx-5 my-2 hover:bg-white hover:text-gray-800 hover:rounded-md py-2 px-4 w-5/6 ${location.pathname === '/purchase' ? 'bg-white text-black rounded-md' : ''}`}>
                            <AiOutlineShopping className="mr-2" />
                            Purchase
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/sales" className={`flex items-center text-gray-200 font-semibold mx-5 my-2 hover:bg-white hover:text-gray-800 hover:rounded-md py-2 px-4 w-5/6 ${location.pathname === '/sales' ? 'bg-white text-black rounded-md' : ''}`}>
                            <AiOutlineFileText className="mr-2" />
                            Sales
                        </Link>
                    </li>
                    <li className="mb-2">
                        <button onClick={toggleReportsDropdown} className={`flex items-center text-gray-200 font-semibold mx-5 my-2 hover:bg-white hover:text-gray-800 hover:rounded-md py-2 px-4 w-5/6 text-left focus:outline-none relative `}>
                            <AiOutlineFileText className="mr-2" />
                            Reports
                            <span className="absolute right-5 top-1/2 transform -translate-y-1/2 transition-transform">
                                <svg className={`h-5 w-5 ${reportsDropdown ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 5.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>
                        {reportsDropdown && (
                            <ul className="pl-4">
                                <li className="mb-2"><Link to="/purchase-report" className={`text-gray-200 hover:text-gray-800 hover:bg-white py-2 px-4 block rounded-md w-4/5 ml-7 font-semibold ${location.pathname === '/purchase-report' ? 'bg-white text-black rounded-md' : ''}`}>Purchase Report</Link></li>
                                <li className="mb-2"><Link to="/sale-report" className={`text-gray-200 hover:text-gray-800 hover:bg-white py-2 px-4 block rounded-md w-4/5 ml-7 font-semibold ${location.pathname === '/sale-report' ? 'bg-white text-black rounded-md' : ''}`}>Sale Report</Link></li>
                                <li className="mb-2"><Link to="/current-stock" className={`text-gray-200 hover:text-gray-800 hover:bg-white py-2 px-4 block rounded-md w-4/5 ml-7 font-semibold ${location.pathname === '/current-stock' ? 'bg-white text-black rounded-md' : ''}`}>Current Stock</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className="mb-2">
                        <Link to="/setting" className={`flex items-center text-gray-200 font-semibold mx-5 my-2 hover:bg-white hover:text-gray-800 hover:rounded-md py-2 px-4 w-5/6 ${location.pathname === '/setting' ? 'bg-white text-gray-800 rounded-md' : ''}`}>
                            <AiOutlineSetting className="mr-2" />
                            Setting
                        </Link>
                    </li>
                    {/* Add other navigation items */}
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
