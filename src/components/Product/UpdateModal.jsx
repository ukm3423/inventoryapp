import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateModal = ({ category, onClose, onUpdate }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [description, setDescription] = useState(category.description);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // State to hold the error message

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://192.168.1.115:9090/productservice/api/category/update-category/${category.id}`, {
        categoryName: categoryName,
        description: description,
      });

      // Handle success
      onUpdate(); // Assuming the backend returns the updated category data
      closeModal();
    } catch (error) {
      // Handle error
      console.error('Error updating category:', error);
      setErrorMessage(error.response.data.message); // Set error message from backend response
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 200); // Close modal after transition
  };

  return (
    <div className={`fixed z-50 inset-0 overflow-y-auto ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ transition: 'opacity 0.3s ease-in-out' }}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" style={{ transition: 'transform 0.3s ease-in-out' }}>
          <div className="bg-gray-800 px-4 py-3 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-white">Edit Category</h3>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleUpdate}>
              <div className=" sm:items-start">
                <div className="mb-4">
                  <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                  <input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20 resize-none"></textarea>
                </div>
              </div>
              {errorMessage && ( // Display error message if exists
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                  <p className="font-bold">Error:</p>
                  <p>{errorMessage}</p>
                </div>
              )}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 ease-in-out">
                  Update
                </button>
                <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-300 ease-in-out">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
