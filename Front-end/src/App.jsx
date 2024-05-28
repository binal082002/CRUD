import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Users from "./pages/User"
import Logout from "./pages/Logout"


import Error from "./pages/Error"

import Navbar from "./Components/Navbar"

const App = () => {
  return(
  <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/userList" element = {<Users />} />
        <Route path = "/logout" element = {<Logout />} />
        
        <Route path = "*" element = {<Error />} />

      </Routes>
    </BrowserRouter>

    {/* <h1 className="text-red-800">Hello</h1> */}

    {/* <Footer /> */}

     
  </>
);

}

export default App;