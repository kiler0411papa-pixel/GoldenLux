import React, { useEffect, useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600";

const CatalogPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Усі");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [isOneClickOpen, setIsOneClickOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/all_products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Помилка завантаження товарів:", err));
  }, []);

  const filteredProducts = products.filter((item) => {
    if (category === "Усі") return true;
    return item.category === category;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
    setNotification(`Успішно додано ${quantity} шт. до кошика!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleOneClickSubmit = (e) => {
    e.preventDefault();
    setIsOneClickOpen(false);
    setSelectedProduct(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerCity("");

    const customAlert = document.createElement("div");
    customAlert.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 3000;">
            <div style="background: #181512; border: 1px solid #d4af37; border-radius: 12px; padding: 40px; text-align: center; max-width: 500px; box-shadow: 0 20px 50px rgba(0,0,0,0.9);">
              <div style="font-size: 48px; margin-bottom: 15px;">✨</div>
              <h3 style="color: #d4af37; font-size: 26px; margin: 0 0 15px 0; font-family: 'Playfair Display', serif;">Дякуємо за замовлення!</h3>
              <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">Ваше замовлення успішно оформлено. Наш ювелірний консультант зв'яжеться з вами найближчим часом.</p>
              <button id="closeSuccessBtn" style="margin-top: 25px; padding: 14px 35px; background: #d4af37; color: #121212; border: none; font-weight: bold; font-size: 14px; text-transform: uppercase; border-radius: 4px; cursor: pointer;">Чудово</button>
            </div>
          </div>
        `;
    document.body.appendChild(customAlert);
    document.getElementById("closeSuccessBtn").onclick = () =>
      customAlert.remove();
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#d4af37",
            color: "#121212",
            padding: "14px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(212,175,55,0.5)",
            zIndex: 2000,
          }}
        >
          ✨ {notification}
        </div>
      )}

      <h2
        style={{
          color: "#d4af37",
          textAlign: "center",
          marginBottom: "35px",
          fontSize: "34px",
          fontFamily: "'Playfair Display', serif, 'Georgia'",
        }}
      >
        Каталог ювелірних виробів
      </h2>

      {/* Фильтры */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "20px",
          background: "#141210",
          padding: "20px 25px",
          borderRadius: "8px",
          border: "1px solid #28221b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#d4af37",
              marginRight: "5px",
            }}
          >
            Метал:
          </span>
          {["Усі", "Золото", "Срібло", "Біле золото"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "8px 16px",
                background: category === cat ? "#d4af37" : "#1e1b18",
                color: category === cat ? "#121212" : "#e0e0e0",
                border: "1px solid #d4af37",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: category === cat ? "bold" : "normal",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{ fontWeight: "bold", fontSize: "14px", color: "#d4af37" }}
          >
            Сортування:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "8px 14px",
              background: "#1e1b18",
              color: "#e0e0e0",
              border: "1px solid #d4af37",
              borderRadius: "4px",
              fontSize: "13px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="default">За замовчуванням</option>
            <option value="asc">Від дешевих до дорогих</option>
            <option value="desc">Від дорогих до дешевих</option>
          </select>
        </div>
      </div>

      {/* Сетка товаров */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#141210",
              border: "1px solid #28221b",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => handleOpenModal(product)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#d4af37")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#28221b")
            }
          >
            <div
              style={{
                width: "100%",
                height: "230px",
                overflow: "hidden",
                background: "#0a0a0a",
              }}
            >
              <img
                src={product.image || FALLBACK_IMAGE}
                alt={product.title}
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#d4af37",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {product.category}
                </span>
                <h3
                  style={{
                    fontSize: "17px",
                    margin: "8px 0 12px 0",
                    color: "#fff",
                    fontWeight: "400",
                  }}
                >
                  {product.title}
                </h3>
              </div>
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#d4af37",
                  }}
                >
                  {product.price} ₴
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    setNotification(`Товар додано до кошика!`);
                    setTimeout(() => setNotification(""), 3000);
                  }}
                  className="gold-btn"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  Купити
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* УВЕЛИЧЕННОЕ И ПРОСТОРНОЕ МОДАЛЬНОЕ ОКНО ТОВАРА */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: "#161412",
              border: "1px solid #d4af37",
              borderRadius: "16px",
              maxWidth: "960px",
              width: "100%",
              minHeight: "520px",
              display: "flex",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 25px 60px rgba(0,0,0,0.95)",
              flexWrap: "wrap",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "22px",
                background: "transparent",
                border: "none",
                color: "#d4af37",
                fontSize: "32px",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              &times;
            </button>

            {/* Левый блок с увеличенным фото */}
            <div
              style={{
                width: "48%",
                minWidth: "320px",
                minHeight: "480px",
                background: "#0a0a0a",
              }}
            >
              <img
                src={selectedProduct.image || FALLBACK_IMAGE}
                alt={selectedProduct.title}
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Правый правый блок с детальной информацией */}
            <div
              style={{
                padding: "40px 35px",
                width: "52%",
                minWidth: "320px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#d4af37",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedProduct.category}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#4caf50",
                      background: "rgba(76, 175, 80, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "1px solid rgba(76, 175, 80, 0.3)",
                    }}
                  >
                    В наявності
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "28px",
                    color: "#fff",
                    margin: "0 0 16px 0",
                    fontFamily: "'Playfair Display', serif, 'Georgia'",
                    fontWeight: "400",
                    lineHeight: "1.25",
                  }}
                >
                  {selectedProduct.title}
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#bbb",
                    lineHeight: "1.7",
                    marginBottom: "22px",
                  }}
                >
                  {selectedProduct.description ||
                    "Вишукана ювелірна прикраса найвищої якості від бренду GoldenLux. Створена з витонченим чуттям стилю та увагою до кожної деталі."}
                </p>

                {/* Расширенные характеристики */}
                <div
                  style={{
                    background: "#1c1815",
                    padding: "16px 20px",
                    borderRadius: "8px",
                    marginBottom: "25px",
                    border: "1px solid #2d2620",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#d4af37",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Технічні характеристики:
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      fontSize: "14px",
                      color: "#ccc",
                    }}
                  >
                    <div>
                      Проба:{" "}
                      <span style={{ color: "#fff", fontWeight: "bold" }}>
                        585° / 925°
                      </span>
                    </div>
                    <div>
                      Виробник:{" "}
                      <span style={{ color: "#fff", fontWeight: "bold" }}>
                        GoldenLux
                      </span>
                    </div>
                    <div>
                      Вставка:{" "}
                      <span style={{ color: "#fff", fontWeight: "bold" }}>
                        Фіаніт / Діамант
                      </span>
                    </div>
                    <div>
                      Середня вага:{" "}
                      <span style={{ color: "#fff", fontWeight: "bold" }}>
                        3.45 г
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "#d4af37",
                    }}
                  >
                    {selectedProduct.price * quantity} ₴
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#1c1815",
                      border: "1px solid #3d3328",
                      borderRadius: "6px",
                    }}
                  >
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        color: "#fff",
                        padding: "0 12px",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "15px" }}>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      flex: 1,
                      padding: "15px",
                      fontSize: "13px",
                      textTransform: "uppercase",
                      background: "#1c1815",
                      color: "#d4af37",
                      border: "1px solid #d4af37",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    🛒 В кошик
                  </button>
                  <button
                    onClick={() => setIsOneClickOpen(true)}
                    className="gold-btn"
                    style={{
                      flex: 1,
                      padding: "15px",
                      fontSize: "13px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      letterSpacing: "1px",
                    }}
                  >
                    ⚡ Купити зараз
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ОФОРМЛЕНИЕ ЗАКАЗА */}
      {isOneClickOpen && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 1100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
          onClick={() => setIsOneClickOpen(false)}
        >
          <div
            style={{
              background: "#181512",
              border: "1px solid #d4af37",
              borderRadius: "12px",
              maxWidth: "520px",
              width: "100%",
              padding: "40px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.9)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOneClickOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "transparent",
                border: "none",
                color: "#d4af37",
                fontSize: "28px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>

            <h3
              style={{
                color: "#d4af37",
                margin: "0 0 10px 0",
                fontSize: "26px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Оформлення замовлення
            </h3>
            <p
              style={{
                color: "#aaa",
                fontSize: "14px",
                marginBottom: "25px",
                lineHeight: "1.5",
              }}
            >
              Заповніть контактні дані для доставки. Загальна сума замовлення:{" "}
              <strong style={{ color: "#d4af37" }}>
                {selectedProduct.price * quantity} ₴
              </strong>
            </p>

            <form onSubmit={handleOneClickSubmit}>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#d4af37",
                    fontSize: "12px",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Ваше ПІБ:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Папакіца Вікторія"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#100e0c",
                    border: "1px solid #332b20",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#d4af37",
                    fontSize: "12px",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Номер телефону:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+380 (99) 000-00-00"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#100e0c",
                    border: "1px solid #332b20",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#d4af37",
                    fontSize: "12px",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Місто та відділення Нової Пошти:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Одеса, Відділення №1"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#100e0c",
                    border: "1px solid #332b20",
                    color: "#fff",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                className="gold-btn"
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontWeight: "bold",
                }}
              >
                Підтвердити замовлення
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
