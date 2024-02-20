
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/Login"  element={<Login />} />
        <Route path="/Signup"  element={<Signup />} />
        <Route path="/AboutUs"  element={<AboutUs />} />
      </Routes>
      </Navbar>
    </BrowserRouter>
  );
}
export default App;

