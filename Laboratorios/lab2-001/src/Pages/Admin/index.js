import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import { getUsers } from "../../Slices/user/requests/getUsers";

export default function Admin() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector(
    (state) => state.user.users
  );

  const loading = useSelector(
    (state) => state.app.loading
  );

  return (
    loading ? <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div> : (
      <div>
        <Header welcomeText="¡Hola!" />
        <div className="grid grid-cols-4 gap-4 sm:px-4 md:px-8 lg:px-16 mt-8">
          {
            users && users.map((u) => {
              return (
                <Link className="border border-slate-500" to={`/user/${u.id}`} key={`user_${u.id}`}>
                  <div>
                    <div className="w-full text-center p-4">
                      <p className="font-bold">{u.name}</p>
                      <p  className="text-sm">{u.email}</p>
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