import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductState, ProductViewModel, deleteProduct, getProduct, updateProduct } from '../../services/product.service';
import { toEnum } from '../../utils';
import { STATE_OPTIONS } from './addProductPage';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<ProductViewModel>();
  const navigate = useNavigate();

  useEffect(() => {
    id && handleGetProduct(id);
  }, [id]);

  const onChangeTitle = (e: any) => {
    const title = e.target.value;
    setCurrentProduct(prev => prev? {...prev, title} : undefined);
  };

  const onChangeDescription = (e: any) => {
    const description = e.target.value;
    setCurrentProduct(prev => prev? {...prev, description} : undefined);
  };

  const onChangePrice = (e: any) => {
    const price = parseFloat(e.target.value);
    setCurrentProduct(prev => prev? {...prev, price} : undefined);
  }

  const onChangeState = (e: any) => {
    const state = toEnum(ProductState, e.target.id);
    if (!state) {
      console.error('[onChangeState] wrong type', e.target.value);
      return;
    }
    setCurrentProduct(prev => prev? {...prev, state} : undefined);
  }

  const handleGetProduct = (id: string) => {
    getProduct(id)
      .then((response) => {
        setCurrentProduct(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleUpdateProduct = () => {
    if (!currentProduct) return;
    updateProduct(currentProduct.id, currentProduct)
      .then((response) => {
        toast.success(`Le produit ${currentProduct.title} a bien été modifié !`)
        navigate('/', {
          state: {editedProduct: currentProduct}
        })
      })
      .catch((e) => {
        toast.error('Echec de la modification');
        console.log(e);
      });
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;
    deleteProduct(currentProduct.id)
      .then((response) => {
        toast.success(`Le produit ${currentProduct.title} a bien été supprimé !`)
        navigate('/');
      })
      .catch((e) => {
        toast.error('Echec de la suppression');
        console.log(e);
      });
  };

  if (!currentProduct) {
    return <div>Produit introuvable.</div>
  }

  return (
    <div>
      <div className="edit-form">
        <h4>Product</h4>
        <form>
        <div>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              required
              value={currentProduct.title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              required
              value={currentProduct.description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <div>
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              required
              value={currentProduct.price}
              onChange={onChangePrice}
              name="price"
            />
          </div>

          <div>
            <label htmlFor="price">État</label>
            {STATE_OPTIONS.map(option => (
              <div key={option.value}>
                <input type="radio" 
                  id={option.value} 
                  name="state" 
                  checked={option.value === currentProduct.state} 
                  required
                  onChange={onChangeState}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
        </form>

        <button
          className="btn-danger mr-2"
          onClick={handleDeleteProduct}
        >
          Supprimer
        </button>

        <button
          type="submit"
          className="btn-success"
          onClick={handleUpdateProduct}
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
