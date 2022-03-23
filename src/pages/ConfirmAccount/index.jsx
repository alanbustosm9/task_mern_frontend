import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Alert from "../../components/Alert/index";
import clientAxios from "../../config/clientAxios";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clientAxios(url);
        setAlert({ msg: data.msg, error: false });
        setAccountConfirmed(true);
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };

    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        confirma tu cuenta y comienza a crear tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {accountConfirmed && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
