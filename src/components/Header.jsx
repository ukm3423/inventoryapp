import SearchBar from './SearchBar'
import LoginImage from './LoginImage'
import { Bell } from 'react-feather'

export default function Header() {
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
        <LoginImage />
      </div>
    </header>
  )
}
