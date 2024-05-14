import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';
import UpdateModal from './UpdateModal';

const Category = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Updated state for current page
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateCategory, setUpdateCategory] = useState({});

  const perPage = 5;
  const API = `http://192.168.1.173:9090/productservice/api/category`;

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(`${API}/get-category-list?offset=${currentPage}&limit=${perPage}`);
      setCategoryList(response.data.data);
      setPageCount(response.data.totalPages); // Update pageCount with totalPages from response
    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, [currentPage]); // Trigger fetchCategoryList when currentPage changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/add`, { categoryName, description });
      setCategoryName('');
      setDescription('');
      fetchCategoryList();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDeleteConfirmation = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setShowConfirmationModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/delete/${categoryIdToDelete}`);
      fetchCategoryList();
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // Update currentPage state when page changes
  };

  const handleEdit = async (categoryId) => {
    try {
      const response = await axios.get(`${API}/get-category/${categoryId}`);
      setUpdateCategory(response.data.data);
      setShowUpdateModal(true);
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Form to add a new category */}
      <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20 resize-none" required></textarea>
          </div>
        </div>
        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4">Add Category</button>
      </form>

      {/* Display the category list */}
      <h2 className="text-2xl font-semibold mb-4">Category List</h2>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 `}>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. No.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th scope="col" className="relative px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white  divide-gray-200">
            {categoryList.map((category, index) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1 + currentPage * perPage}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button onClick={() => handleEdit(category.id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDeleteConfirmation(category.id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination flex justify-center'}
          activeClassName={'bg-blue-500 text-white'}
          previousClassName={'px-3 py-1 bg-gray-200 rounded-md mr-2 hover:bg-gray-300'}
          nextClassName={'px-3 py-1 bg-gray-200 rounded-md ml-2 hover:bg-gray-300'}
          disabledClassName={'px-3 py-1 bg-gray-200 rounded-md mr-2'}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={handleDelete}
      />

      {/* Update Modal */}
      {showUpdateModal && (
        <UpdateModal
          category={updateCategory}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={() => {
            fetchCategoryList();
          }}
        />
      )}

      {/* Toast Container for displaying error messages */}
      <ToastContainer />
    </div>
  );
}

export default Category;
