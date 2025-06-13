import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./NewProductForm.css";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../../services/api";

function NewProductForm() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title,
      price,
      description,
      category,
      image,
    };
  try {
    const response = await addNewProduct(newProduct);
    if (response && response.id) { 
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage('');
      alert("Proizvod uspešno dodat!");
      navigate("/", { state: { newProduct } });
    } else {
      alert("Greška prilikom dodavanja proizvoda!");
    }
  } catch (err) {
    alert("Greška prilikom dodavanja proizvoda!");
    console.error(err);
  }
  }

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Dodaj Novi Proizvod</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cena:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Slika:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
        <button onClick={handleBack} className="backButton">
          {" "}
          Back
        </button>
      </form>
    </div>
  );
}

export default NewProductForm;
