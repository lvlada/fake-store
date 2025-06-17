import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./HomePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  // const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loacalProduct, setLocalProduct] = useState([]);
  const productPerPage = 8;

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

  const handleNewProduct = () => {
    navigate("/addNew");
  };
  const handleProduct = (id) => {
    navigate(`product/${id}`);
  };

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
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    enabled: isAuthenticated,
  });

useEffect(() => {
  if (location.state?.newProduct) {
    setLocalProduct((prev) => {
      // Proveri da li već postoji proizvod sa istim ID-jem
      if (prev.some(p => p.id === location.state.newProduct.id)) return prev;
      return [location.state.newProduct, ...prev];
    });
    navigate(location.pathname, { replace: true });
  }
}, [location.state?.newProduct]);

  const mergeProduct = [...loacalProduct, ...products];


  //PAGINATION
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = mergeProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(mergeProduct.length / productPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // useEffect(()=>{
  //   if(location.state?.newProduct){
  //     setProducts((prev) => [location.state.newProduct, ...prev])
  //   }
  // },[location.state?.newProduct])

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Molimo vas da se prijavite da biste videli proizvode.</h2>
        <button className="add-btn" onClick={handleLogIn}>
          Login
        </button>
      </div>
    );
  }

  if (isPending)
    return <div style={{ padding: "2rem" }}>Učitavanje proizvoda...</div>;
  if (isError)
    return <div style={{ padding: "2rem" }}>Greška: {error.message}</div>;

  return (
    <>
      <div className="product-list">
        <div className="product-header">
          <h1>Svi proizvodi iz prodavnice</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="add-btn" onClick={handleNewProduct}>
              Dodaj novi
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Izloguj se
            </button>
          </div>
        </div>
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProduct(product.id)}
          >
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h2>{product.title}</h2>
              <p className="price">${product.price}</p>
              <p className="desc">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? "active" : ""}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default HomePage;
