import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { findProductByTitle, getAllProducts, ProductViewModel } from '../../services/product.service';
import Pagination from './pagination';

const ProductsListPage = () => {
  const [products, setProducts] = useState<ProductViewModel[]>([]);
  const location = useLocation();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 0
  })
  const [currentProduct, setCurrentProduct] = useState<ProductViewModel|undefined>(
    location.state?.editedProduct || location.state?.newProduct
  );
  const [searchTitle, setSearchTitle] = useState("");

  const retrieveProducts = useCallback((page = 1) => {
    getAllProducts(page)
      .then((response) => {
        setProducts(response.products);
        setPagination({
          currentPage: response.currentPage,
          totalItems: response.totalItems,
          totalPages: response.totalPages,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    retrieveProducts();
  }, [retrieveProducts]);

  const handleSearchTitle = () => {
    setCurrentProduct(undefined);

    findProductByTitle(searchTitle)
      .then((response) => {
        setProducts(response.products);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 justify-between">
        {/* col 1 */}
        <div className="shrink w-1/2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Rechercher par titre"
              value={searchTitle}
              onChange={e => setSearchTitle(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearchTitle}
            >
              Rechercher
            </button>
          </div>
          <h2 className="text-xl font-semibold">
            Liste des produits
          </h2>
          <ul className="m-2">
            {products?.map((product) => (
              <li
                className={`cursor-pointer w-full hover:bg-gray-200 ${
                  product.id === currentProduct?.id? 'font-bold text-blue-500':''
                }`}
                onClick={() => setCurrentProduct(product)}
                key={product.id}
              >
                {product.title}
              </li>
            ))}
          </ul>
          {pagination.totalPages > 0 && <Pagination 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
            onPageChange={page => retrieveProducts(page)}
          />}
        </div>
        {/* col2 */}
        <div className="w-1/2 bg-blue-100 rounded p-4">
          {currentProduct && (
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <label>Titre</label>
                <span>{currentProduct.title}</span>
                <label>Description</label>
                <span>{currentProduct.description}</span>
                <label>Prix</label>
                <span>{currentProduct.price}€</span>
                <label>État</label>
                <span>{currentProduct.state}</span>

              <Link
                to={"/products/" + currentProduct.id}
                className="btn"
              >
                Modifier
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsListPage;
