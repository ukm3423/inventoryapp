
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Overview from './components/Overview';
import Product from './components/Product/Product';
import Category from './components/Category/Category';

export default function App() {
  return (
    <div>
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6 sm:p-8">
              <Routes>
                <Route path='/' element={<Overview/>}/>
                <Route path='/product' element={<Product />}/>
                <Route path='/category' element={<Category />}/>
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </div>
  )
}
