import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Component/Header";
import { createProduct } from "../../Slices/productSlice";

function ProductsAdmin() {
  const [productPicture, setProductPicture] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    picture: "",
  });
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setProduct({
      ...product,
      [field]: value,
    });
  };

  const productState = useSelector((state) => state.product);

  return (
    <div>
      <Header />
      <div className="block px-4 md:px-8 lg:px-20 py-4">
        {productState.success ? (
          <div className="flex items-center justify-center h-16 bg-green-800 text-white w-full rounded-md mb-8 animate-bounce">
            <p>Producto creado exitósamente</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl mb-8">Nuevo Producto</h1>
            <input
              className="block w-full mb-4 border rounded-md pl-4"
              placeholder="Indique el nombre del producto"
              type="text"
              value={product.name}
              onChange={(evt) => {
                handleChange("name", evt.target.value);
              }}
            />
            <input
              className="block w-full mb-4 border rounded-md pl-4"
              placeholder="Indique el precio del producto"
              type="text"
              value={product.price}
              onChange={(evt) => {
                handleChange("price", evt.target.value);
              }}
            />
            <textarea
              rows={4}
              className="block w-full mb-4 border rounded-md pl-4"
              placeholder="Ingrese una descripción de su producto"
              type="text"
              value={product.description}
              onChange={(evt) => {
                handleChange("description", evt.target.value);
              }}
            />
            <label htmlFor="productPhoto">Foto del producto</label>
            <input
              className="block w-full mb-4 border rounded-md"
              id="productPhoto"
              onChange={(evt) => {
                setProductPicture(evt.target.files[0]);
              }}
              type="file"
            />
            {productPicture && (
              <img
                src={URL.createObjectURL(productPicture)}
                alt="Product preview"
              />
            )}
            <button
              onClick={() => {
                dispatch(
                  createProduct({
                    product,
                    productPicture,
                  })
                );
              }}
              className="px-8 py-3 w-full my-8 bg-purple-600 text-white rounded-md"
            >
              Crear
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductsAdmin;
