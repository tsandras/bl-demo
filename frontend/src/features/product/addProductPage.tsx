import { useState } from 'react';
import { createProduct, ProductState } from '../../services/product.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const STATE_OPTIONS = [
  {
    value: ProductState.GOOD,
    label: 'Bon'
  },
  {
    value: ProductState.AVERAGE,
    label: 'Moyen'
  },
  {
    value: ProductState.BAD,
    label: 'Mauvais'
  },
]

const AddProductPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [productState, setProductState] = useState(ProductState.GOOD);

  const saveProduct = () => {
    var data = {
      title,
      description,
      price,
      state: productState
    };

    createProduct(data)
      .then(response => {
        toast.success(`Le produit ${title} a bien été créé !`)
        navigate('/', {
          state: {newProduct: response}
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            name="title"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            name="description"
          />
        </div>

        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            required
            value={price}
            onChange={e => setPrice(parseFloat(e.target.value))}
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
                value={option.value} 
                required
                onChange={() => setProductState(option.value)}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>

        <button onClick={saveProduct} className="self-start btn-success">
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default AddProductPage;
