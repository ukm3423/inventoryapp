// SearchBar.js

const SearchBar = () => {
  return (
    <div className="relative">
      <input type="text" className="border border-gray-300 rounded-lg py-1 px-3 focus:outline-none focus:border-blue-500" placeholder="Search..." />
      <button className="absolute right-0 top-0 mt-1 mr-2">
        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 17.5l6 6"></path>
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
