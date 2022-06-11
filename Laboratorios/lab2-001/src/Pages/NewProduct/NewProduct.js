import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import { createItem } from "../../Slices/item/requests/createItem";

export default function NewProduct() {
  const [item, setItem] = useState({
    nombre: "",
    descripcion: "",
    categoria: -1,
    condicion: -1,
    provincia: -1,
    foto: "",
  });

  const itemState = useSelector((state) => state.item);

  const [foto, setFoto] = useState(null);

  const handleChange = (key, value) => {
    setItem({
      ...item,
      [key]: value,
    });
  };

  const dispatch = useDispatch();

  return (
    <div>
      <Header welcomeText="¡Hola!" />
      {itemState.success ? (
        <div className="sm:px-4 md:px-8 lg:px-16 mt-8">
          <div className="flex items-center justify-center h-12 bg-green-700 text-white animate-bounce rounded-md w-full">
            <p>Producto creado exitosamente</p>
          </div>
        </div>
      ) : (
        <div className="sm:px-4 md:px-8 lg:px-16 mt-8">
          <h1 className="text-2xl font-bold mb-8">Nuevo artículo</h1>
          <input
            placeholder="Ingre el nombre del artículo"
            type="text"
            className="rounded-md w-full border border-slate-400 h-12 pl-2 mb-5"
            value={item.nombre}
            onChange={(evt) => {
              handleChange("nombre", evt.target.value);
            }}
          />
          <textarea
            placeholder="Ingrese una descripción"
            rows={5}
            className="rounded-md w-full border border-slate-400 pl-2 mb-5"
            value={item.descripcion}
            onChange={(evt) => {
              handleChange("descripcion", evt.target.value);
            }}
          />
          <select
            value={item.categoria}
            className="rounded-md w-full border border-slate-400 h-12 pl-2 mb-5 appearance-none"
            onChange={(evt) => {
              handleChange("categoria", evt.target.value);
            }}
          >
            <option
              disabled
              className="w-full"
              label="Seleccione una categoría"
              value={-1}
            ></option>
            <option
              className="w-full"
              label="Artículos deportivos"
              value={1}
            ></option>
            <option
              className="w-full"
              label="Artículos domésticos"
              value={2}
            ></option>
            <option label="Vehículos" value={3}></option>
          </select>
          <select
            value={item.condicion}
            className="rounded-md w-full border border-slate-400 h-12 pl-2 mb-5 appearance-none"
            onChange={(evt) => {
              handleChange("condicion", evt.target.value);
            }}
          >
            <option
              disabled
              className="w-full"
              label="Seleccione una condición del artículo"
              value={-1}
            ></option>
            <option className="w-full" label="Nuevo" value={1}></option>
            <option className="w-full" label="Usado" value={2}></option>
            <option label="Para repuestos" value={3}></option>
          </select>
          <select
            value={item.provincia}
            className="rounded-md w-full border border-slate-400 h-12 pl-2 mb-5 appearance-none"
            onChange={(evt) => {
              handleChange("provincia", evt.target.value);
            }}
          >
            <option
              disabled
              className="w-full"
              label="Seleccione la provincia donde se encuentra"
              value={-1}
            ></option>
            <option className="w-full" label="San José" value={1}></option>
            <option className="w-full" label="Alajuela" value={2}></option>
            <option label="Cartago" value={3}></option>
            <option label="Heredia" value={4}></option>
            <option label="Guanacaste" value={5}></option>
            <option label="Puntarenas" value={6}></option>
            <option label="Limón" value={7}></option>
          </select>
          <div className="mb-4">
            <label
              className="bg-cyan-500 px-4 py-2 rounded-md text-white cursor-pointer"
              htmlFor="foto"
            >
              Cargar Fotografía
            </label>
          </div>
          <input
            id="foto"
            name="foto"
            hidden
            multiple={false}
            type="file"
            onChange={(evt) => {
              setFoto(evt.target.files[0]);
            }}
          />
          {foto && (
            <div>
              <button
                onClick={() => {
                  setFoto(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
              <img
                className="max-h-56 mt-8"
                src={URL.createObjectURL(foto)}
                alt="Foto del nuevo artículo"
              />
            </div>
          )}
          <button
            onClick={() => {
              dispatch(createItem({ item, foto }));
            }}
            className="my-8 w-full bg-cyan-500 text-white py-3 rounded-md"
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
}
