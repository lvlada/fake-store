import { useParams, useNavigate } from "react-router-dom";
import { getOneProducts } from "../../services/api";
import { useEffect, useState } from "react";
import "./Item.css";

function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();

  useEffect(() => {
    getOneProducts(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="loading">Učitavanje...</div>;

  return (
    <div className="item-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Nazad</button>
      <div className="item-card">
        <img src={product.image} alt={product.title} />
        <div className="item-info">
          <h1>{product.title}</h1>
          <p className="desc">{product.description}</p>
          <p className="price">${product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
