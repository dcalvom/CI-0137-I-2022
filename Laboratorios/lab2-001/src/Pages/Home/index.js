import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";

export default function Home() {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  //ESTE EFECTO SECUNDARIO, VA A CARGAR TODOS MIS PRODUCTOS DESDE LA BD AL INICIAR LA PAGINA
  useEffect(() => {
    const fetchProducts = async () => {
      const productsFetch = await fetch('https://api.ticolitas.com/categoria-categoria-padre/55/?filter={%22include%22:[{%22relation%22:%22categorias%22,%22scope%22:{%22fields%22:{%22id%22:true,%22idCategoria%22:true,%22idCategoriaPadre%22:true},%22include%22:[{%22relation%22:%22categoria%22,%22scope%22:{%22fields%22:{%22id%22:true,%22nombre%22:true,%22colorFondo%22:true,%22imagen%22:true}}}]}},{%22relation%22:%22productos%22,%22offset%22:0,%22limit%22:10,%22skip%22:0,%22scope%22:{"limit":4,%22fields%22:{%22createdAt%22:false,%22updatedAt%22:false},%22where%22:{%22idMarca%22:18},%22order%22:%20[%22nombreTienda%20asc%22,%20%22precioVenta%20asc%22]}},{%22relation%22:%22marcas%22,%22scope%22:{%22limit%22:1,%22fields%22:{%22createdAt%22:false,%22updatedAt%22:false},%22where%22:{%22id%22:18}}},{%22relation%22:%22categoria%22,%22scope%22:{%22fields%22:{%22id%22:true,%22nombre%22:true,%22colorFondo%22:true,%22imagen%22:true}}},{%22relation%22:%22categoriaPadre%22,%22scope%22:{%22fields%22:{%22createdAt%22:false,%22updatedAt%22:false},%22include%22:[{%22relation%22:%22categoriaPadre%22,%22scope%22:{%22fields%22:{%22createdAt%22:false,%22updatedAt%22:false},%22include%22:[{%22relation%22:%22categoriaPadre%22,%22scope%22:{%22fields%22:{%22createdAt%22:false,%22updatedAt%22:false},%22include%22:[{%22relation%22:%22categoria%22,%22scope%22:{%22fields%22:{%22id%22:true,%22nombre%22:true}}}]}},{%22relation%22:%22categoria%22,%22scope%22:{%22fields%22:{%22id%22:true,%22nombre%22:true}}}]}},{%22relation%22:%22categoria%22,%22scope%22:{%22fields%22:{%22id%22:true,%22nombre%22:true}}}]}}],%22fields%22:{%22createdAt%22:false,%22updatedAt%22:false}}');
      const productsJSON = await productsFetch.json();
      setItems(productsJSON);
      setLoading(false);
    }

    fetchProducts();
  }, []); //SI YO NO PONGO NINGUN VALOR, SOLAMENTE SE VA A EJECUTAR AL CARGAR MI PÁGINA

  return (
    loading ? <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div> : (
      <div>
        <Header welcomeText="¡Hola!" />
        <div className="flex gap-8 sm:px-4 md:px-8 lg:px-16 mt-8">
          {
            items && items.productos.map((i) => {
              return (
                <Link className="w-1/4" to={`/item/${i.id}`} key={`product_${i.id}`}>
                  <div>
                    <div className="w-full flex justify-center h-36 min-h-36 max-h-36">
                      <img className="h-full" src={i.fotoPrincipal} alt={i.nombreTienda} />
                    </div>
                    <div className="w-full text-center pt-4">
                      <p className="font-bold">{i.nombreTienda}</p>
                      <p  className="text-sm">{i.marca}</p>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  )
}