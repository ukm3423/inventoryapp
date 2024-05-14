import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';
import UpdateModal from './UpdateModal';

const Product = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [productList, setProductList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});

  const perPage = 5;
  const API = `http://192.168.1.173:9090/productservice/api`;

  useEffect(() => {
    fetchCategoryList();
    fetchProductList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(`${API}/category/get-list`);
      setCategoryList(response.data);
      // console.log(categoryList.data[0].categoryName);

    } catch (error) {
      console.error('Error fetching category list:', error);
    }
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${API}/products/get-product-list?offset=${currentPage}&limit=${perPage}`);
      setProductList(response.data.data);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('categoryId', selectedCategory);
      formData.append('image', image);
      await axios.post(`${API}/products/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProductName('');
      setPrice('');
      setSelectedCategory('');
      setImage(null);
      fetchProductList();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleDeleteConfirmation = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmationModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/products/delete/${productIdToDelete}`);
      fetchProductList();
      setShowConfirmationModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEdit = async (productId) => {
    try {
      const response = await axios.get(`${API}/products/get-product-by-id?productId=${productId}`);
      setUpdateProduct(response.data.data);
      setShowUpdateModal(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryList && categoryList.data && (
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                <option value="">Select Category</option>
                {categoryList.data.map((category) => (
                  <option key={category.id} value={category.id}>{category.categoryName}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
        </div>
        <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4">Add Product</button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200`}>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl. No.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th scope="col" className="relative px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {productList.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-0 whitespace-nowrap">{index + 1 + currentPage * perPage}</td>
                <td className="px-6 py-0 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-0 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-0 whitespace-nowrap">{product.categoryName}</td>
                <td className="px-6 py-0 whitespace-nowrap">
                  <img src={product.imagePath} alt={product.productName} className="h-10 w-10 object-cover rounded-full" />
                </td>
                <td className="px-6 py-0 whitespace-nowrap text-left text-sm font-medium">
                  <button onClick={() => handleEdit(product.id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDeleteConfirmation(product.id)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onCancel={() => setShowConfirmationModal(false)}
        onConfirm={handleDelete}
      />

      {showUpdateModal && (
        <UpdateModal
          product={updateProduct}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={() => {
            fetchProductList();
          }}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default Product;
