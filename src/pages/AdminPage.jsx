import React, { useState } from "react";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Золото");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      category,
      price: Number(price),
      description,
      image:
        image ||
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
    };

    fetch("http://localhost:4000/add_product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (res.ok) {
          setMessage("Товар успішно додано до каталогу!");
          setTitle("");
          setPrice("");
          setDescription("");
          setImage("");
        } else {
          setMessage("Помилка при додаванні товару.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Помилка з'єднання з сервером.");
      });
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2
        style={{ color: "#d4af37", textAlign: "center", marginBottom: "30px" }}
      >
        Панель адміністратора
      </h2>

      {message && (
        <p
          style={{
            textAlign: "center",
            color: "#d4af37",
            marginBottom: "20px",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#1a1a1a",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Назва товару:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              background: "#121212",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Категорія (метал):
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#121212",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "4px",
            }}
          >
            <option value="Золото">Золото</option>
            <option value="Срібло">Срібло</option>
            <option value="Біле золото">Біле золото</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Ціна (₴):
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              background: "#121212",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Опис:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              background: "#121212",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Посилання на картинку (URL):
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            style={{
              width: "100%",
              padding: "10px",
              background: "#121212",
              color: "#fff",
              border: "1px solid #d4af37",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          className="gold-btn"
          style={{ padding: "12px", fontSize: "16px", marginTop: "10px" }}
        >
          Додати товар
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
