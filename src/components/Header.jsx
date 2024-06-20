import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import LoginImage from './LoginImage';
import { Bell } from 'react-feather';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md py-2 px-6 sm:px-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        <SearchBar />
        <div className='ml-5'>
          <button className="hidden md:block mr-4">
            <Bell className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="relative" ref={dropdownRef}>
          <div onClick={toggleDropdown}>
            <LoginImage />
          </div>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Profile</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Settings</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors">Logout</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
