import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePageLayout from "./components/Home/HomePageLayout";
import HomePage from "./components/Home/HomePage";
import LoginFormContainer from "./components/Login/LoginFormContainer";
import LoginForm from "./components/Login/LoginForm";
import NewProductForm from "./components/Products/NewProductForm";
import NewProductContainer from "./components/Products/NewProductContainer";
import Item from "./components/Products/Item";
import ItemContainer from "./components/Products/ItemContainer";

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route element={<HomePageLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<LoginFormContainer/>}>
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route element={<NewProductContainer/>}>
          <Route path="/addNew" element={<NewProductForm />} />
        </Route>
        <Route path ="/product" element = {<ItemContainer />}>
            <Route path="/product:id" element={<Item/>} />
        </Route>
      </Routes>
       </BrowserRouter>
  );
}

export default App;
