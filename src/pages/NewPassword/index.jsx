import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Alert from "../../components/Alert/index";
import clientAxios from "../../config/clientAxios";

const NewPassword = () => {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clientAxios(`/users/reset-password/${token}`);
        setTokenChecked(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };

    checkToken();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({ msg: "El password debe ser minimo de 6 caracteres" });
    }

    try {
      const url = `/users/reset-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({ msg: data.msg, error: false });
      setPasswordChanged(true);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        reestablece tu password y no pierdas acceso a tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      {tokenChecked && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="capitalize text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              id="password"
              type="Password"
              placeholder="Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nueva password"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {passwordChanged && (
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
