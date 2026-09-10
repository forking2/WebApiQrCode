import {Route, Routes} from "react-router";
import Main from "./screens/main/Main.tsx";
import Header from "./components/Header.tsx";
import Profile from "./screens/profile/Profile.tsx";
import QRCodeCreate from "./screens/qr-code/create/QRCodeCreate.tsx";
import QRCodeEdit from "./screens/qr-code/edit/QRCodeEdit.tsx";
import Login from "./screens/login/Login.tsx";
import Register from "./screens/register/Register.tsx";

function App() {

  return (
      <>
          <Header/>
          <Routes>
              <Route path="/">
                  <Route index element={<Main/>}></Route>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/register" element={<Register/>}></Route>
                  <Route path="/profile" element={<Profile/>}></Route>
                  <Route path="/qr-code">
                      <Route path="create" element={<QRCodeCreate/>}/>
                      <Route path="edit/:id" element={<QRCodeEdit/>}/>
                  </Route>
              </Route>
          </Routes>
      </>
  );
}

export default App;