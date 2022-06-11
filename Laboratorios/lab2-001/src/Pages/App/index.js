import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainContainer from "../../Components/MainContainer";
import PrivateRoute from "../../Components/PrivateRoute";
import Home from "../Home";
import Login from "../Login";
import Register from "../Register";
import Admin from "../Admin";
import NewProduct from "../NewProduct/NewProduct";
import Unathorized from "../Unathorized";
import { ROLES } from "../../utils/constants";

export default function App() {
  return (
    <MainContainer>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="/no-autorizado" element={<Unathorized />} />
          <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/admin/products/new" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </MainContainer>
  );
}
