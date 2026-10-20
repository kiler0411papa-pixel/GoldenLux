import React, { useEffect, useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600";

const SalePage = ({ addToCart }) => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Поля формы "Купити зараз" (3 поля)
  const [isOneClickOpen, setIsOneClickOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/all_products")
      .then((res) => res.json())
      .then((data) => {
        // Для страницы акций берём товары и показываем их со скидкой
        setSaleProducts(data);
      })
      .catch((err) =>
        console.error("Помилка завантаження акційних товарів:", err),
      );
  }, []);

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
              <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">Ваше акційне замовлення успішно оформлено. Наш ювелірний консультант зв'яжеться з вами найближчим часом.</p>
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
      {/* Всплывающее уведомление */}
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

      {/* Заголовок страницы акций */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-block",
            border: "1px solid #e63946",
            padding: "6px 20px",
            borderRadius: "30px",
            color: "#e63946",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "15px",
            background: "rgba(230, 57, 70, 0.1)",
          }}
        >
          🔥 Спеціальні пропозиції
        </div>
        <h2
          style={{
            color: "#d4af37",
            fontSize: "36px",
            fontFamily: "'Playfair Display', serif, 'Georgia'",
            margin: 0,
          }}
        >
          Акції та знижки до -30%
        </h2>
        <p style={{ color: "#aaa", fontSize: "15px", marginTop: "10px" }}>
          Вишукані прикраси за вигідними цінами тільки цього місяця
        </p>
      </div>

      {/* Сетка акционных товаров */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {saleProducts.map((product) => {
          // Вычисляем старую акционную цену (+25% к текущей)
          const oldPrice = Math.round(product.price * 1.25);

          return (
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
                position: "relative",
                transition: "border-color 0.3s",
              }}
              onClick={() => handleOpenModal(product)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#d4af37")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#28221b")
              }
            >
              {/* Стильный бейдж скидки */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "#e63946",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  zIndex: 2,
                }}
              >
                -20%
              </div>

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
                  <div>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#888",
                        textDecoration: "line-through",
                        marginRight: "8px",
                      }}
                    >
                      {oldPrice} ₴
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#e63946",
                      }}
                    >
                      {product.price} ₴
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      setNotification(
                        `Акційний товар "${product.title}" додано до кошика!`,
                      );
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
          );
        })}
      </div>

      {/* УВЕЛИЧЕННОЕ МОДАЛЬНОЕ ОКНО ТОВАРА В АКЦИЯХ */}
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
                      color: "#e63946",
                      background: "rgba(230, 57, 70, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      border: "1px solid rgba(230, 57, 70, 0.3)",
                      fontWeight: "bold",
                    }}
                  >
                    🔥 Акційна ціна
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
                    "Вишукана акційна прикраса з лімітованої колекції бренду GoldenLux."}
                </p>

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
                  <div>
                    <span
                      style={{
                        fontSize: "15px",
                        color: "#888",
                        textDecoration: "line-through",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {Math.round(selectedProduct.price * 1.25) * quantity} ₴
                    </span>
                    <span
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        color: "#e63946",
                      }}
                    >
                      {selectedProduct.price * quantity} ₴
                    </span>
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

      {/* ОФОРМЛЕНИЕ ЗАКАЗА В АКЦИЯХ (3 ПОЛЯ) */}
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
              Оформлення акційного замовлення
            </h3>
            <p
              style={{
                color: "#aaa",
                fontSize: "14px",
                marginBottom: "25px",
                lineHeight: "1.5",
              }}
            >
              Заповніть контактні дані для доставки. Акційна сума замовлення:{" "}
              <strong style={{ color: "#e63946" }}>
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

export default SalePage;
