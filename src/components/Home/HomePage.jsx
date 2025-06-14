import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";
import { useNavigate, useLocation } from "react-router-dom";


function HomePage() {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
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

  useEffect(() => {
    if (isAuthenticated) {
      getAllProducts()
        .then((data) => setProducts(data))
        .catch((err) =>
          console.error("Greška prilikom dohvatanja proizvoda:", err)
        );
    }
  }, [isAuthenticated]);

  useEffect(()=>{
    if(location.state?.newProduct){
      setProducts((prev) => [location.state.newProduct, ...prev])
    }
  },[location.state?.newProduct])

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Molimo vas da se prijavite da biste videli proizvode.</h2>
        <button className="add-btn" onClick={handleLogIn}>Login</button>
      </div>
    );
  }

  const handleProduct = (id) =>{
    navigate(`product/${id}`);
  }

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
      {products.map((product) => (
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
