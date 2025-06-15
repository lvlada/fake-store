// import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


function HomePage() {
  // const [products, setProducts] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleNewProduct = () =>{
    navigate('/addNew');
  }
    const handleProduct = (id) =>{
    navigate(`product/${id}`);
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getAllProducts()
  //       .then((data) => setProducts(data))
  //       .catch((err) =>
  //         console.error("Greška prilikom dohvatanja proizvoda:", err)
  //       );
  //   }
  // }, [isAuthenticated]);

  const {
    data: products = [], 
    isLoading, 
    isError, 
    error} = useQuery({
     queryKey: ['products'], 
     queryFn: getAllProducts, 
     enabled: isAuthenticated
    });

    const mergeProduct = 
    location.state?.newProduct && products.length
    ? [location.state.newProduct, ...products]
    : products;

    
  // useEffect(()=>{
  //   if(location.state?.newProduct){
  //     setProducts((prev) => [location.state.newProduct, ...prev])
  //   }
  // },[location.state?.newProduct])

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Molimo vas da se prijavite da biste videli proizvode.</h2>
        <button className="add-btn" onClick={handleLogIn}>Login</button>
      </div>
    );
  }

  if (isLoading) return <div style={{ padding: "2rem" }}>Učitavanje proizvoda...</div>
  if (isError) return <div style={{ padding: "2rem" }}>Greška: {error.message}</div>

  return (
    <div className="product-list">
      <div className="product-header">
        <h1>Svi proizvodi iz prodavnice</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="add-btn" onClick={handleNewProduct}>Dodaj novi</button>
          <button className="logout-btn" onClick={handleLogout}>
            Izloguj se
          </button>
        </div>
      </div>
      {mergeProduct.map((product) => (
        <div key={product.id} className="product-card" onClick={() => handleProduct(product.id)}>
          <img src={product.image} alt={product.title} />
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <p className="desc">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
