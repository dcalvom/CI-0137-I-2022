import { useEffect } from "react";
import Header from "../../Component/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Slices/userSlice";

function Admin() {

  const theme = useSelector(
    (state) => state.app.theme
  );

  const users = useSelector(
    (state) => state.user.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-3 gap-4 px-4 md:px-8 lg:px-20 py-4">
        {users.map((u) => {
          return (
            <div key={`users_${u.id}`} className={`border ${theme.productBorder}`}>
              <div className="p-4 text-center">
                <p>{u.name}</p>
                <p className={`${theme.priceTag}`}>{u.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
