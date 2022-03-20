import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import NewPassword from "./pages/NewPassword/index";
import RecoverPassword from "./pages/RecoverPassword/index";
import ConfirmAccount from "./pages/ConfirmAccount/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recover-password" element={<RecoverPassword />} />
          <Route path="recover-password/:token" element={<NewPassword />} />
          <Route path="confirm-account/:id" element={<ConfirmAccount />} />
        </Route>

        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
