import Header from "../../Component/Header";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Slices/cartSlice";

const products = [
  {
    id: 1,
    name: "Patrón Duendecillo Repartidor",
    image:
      "https://ci0137.s3.amazonaws.com/amigurumis/products/1.jpg",
    price: 7.26,
  },
  {
    id: 2,
    name: "Patrón Amigurumi Pengui el Pingüino",
    image:
      "https://duendedeloshilos.es/wp-content/uploads/2019/02/ping%C3%BCino-amigurumi-2-350x400.jpg",
    price: 7.26,
  },
  {
    id: 3,
    name: "Patrón Amigurumi Mani el Mono",
    image:
      "https://duendedeloshilos.es/wp-content/uploads/2019/01/patrones-amigurumi-3-350x400.jpg",
    price: 7.26,
  },
  {
    id: 4,
    name: "PACK Amigurumis Prehistóricos",
    image:
      "https://duendedeloshilos.es/wp-content/uploads/2019/01/tricer%C3%A1tops-amigurumi-1-1-350x400.jpg",
    price: 7.26,
  },
];

function Home() {

  const theme = useSelector(
    (state) => state.app.theme
  );

  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <div className="flex gap-4 px-4 md:px-8 lg:px-20 py-4">
        {products.map((p) => {
          return (
            <div key={`product_${p.id}`} className={`border ${theme.productBorder}`}>
              <div>
                <img src={p.image} alt={p.name} />
              </div>
              <div className="p-4 text-center">
                <p>{p.name}</p>
                <p className={`${theme.priceTag}`}>€{p.price}</p>
                <button onClick={() => { dispatch(addItem()) }}>Agregar al carrito</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
