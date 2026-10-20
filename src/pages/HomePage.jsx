import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1600",
];

const HomePage = ({ addToCart }) => {
  const [featured, setFeatured] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [isOneClickOpen, setIsOneClickOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [notification, setNotification] = useState("");

  const [hoverCatalog, setHoverCatalog] = useState(false);
  const [hoverSale, setHoverSale] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/all_products")
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch((err) => console.error(err));
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
    <div style={{ position: "relative" }}>
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

      {/* БАННЕР */}
      <div
        style={{
          position: "relative",
          minHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "60px 20px",
          overflow: "hidden",
          borderBottom: "1px solid #d4af37",
        }}
      >
        {BANNER_IMAGES.map((imgUrl, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(180deg, rgba(5, 5, 5, 0.6) 0%, rgba(10, 10, 10, 0.8) 100%), url("${imgUrl}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: 1,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
            pointerEvents: "none",
            filter: "blur(50px)",
            zIndex: 2,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: "900px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              border: "1px solid #d4af37",
              padding: "6px 24px",
              borderRadius: "30px",
              color: "#d4af37",
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "20px",
              background: "rgba(15, 13, 10, 0.85)",
              boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
            }}
          >
            ✨ Ексклюзивна колекція 2026
          </div>

          <h1
            style={{
              fontSize: "60px",
              fontFamily: "'Playfair Display', serif, 'Georgia'",
              color: "#ffffff",
              margin: "0 0 15px 0",
              fontWeight: "400",
              lineHeight: "1.15",
              textShadow: "0 4px 25px rgba(0,0,0,0.95)",
            }}
          >
            Вишуканість, що залишається <br />
            <span
              style={{
                color: "#f3d475",
                fontStyle: "italic",
                fontWeight: "600",
                textShadow: "0 0 20px rgba(212,175,55,0.6)",
              }}
            >
              назавжди
            </span>
          </h1>

          <p
            style={{
              color: "#f0f0f0",
              fontSize: "18px",
              lineHeight: "1.7",
              maxWidth: "700px",
              margin: "0 auto 40px auto",
              textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              fontWeight: "300",
            }}
          >
            Ювелірні вироби ручної роботи з золота, срібла та коштовного
            каміння. Створіть свій неповторний стиль разом з GoldenLux.
          </p>

          <div
            style={{
              display: "flex",
              gap: "25px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/catalog"
              onMouseEnter={() => setHoverCatalog(true)}
              onMouseLeave={() => setHoverCatalog(false)}
              style={{
                padding: "16px 40px",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "4px",
                background: hoverCatalog ? "#f3d475" : "#d4af37",
                color: "#121212",
                fontWeight: "bold",
                boxShadow: hoverCatalog
                  ? "0 0 30px rgba(212, 175, 55, 0.9)"
                  : "0 4px 20px rgba(212, 175, 55, 0.4)",
                transform: hoverCatalog ? "translateY(-3px)" : "translateY(0)",
                transition: "all 0.3s ease",
              }}
            >
              Переглянути каталог
            </Link>
            <Link
              to="/sale"
              onMouseEnter={() => setHoverSale(true)}
              onMouseLeave={() => setHoverSale(false)}
              style={{
                padding: "16px 40px",
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "4px",
                background: hoverSale ? "#ff4d5e" : "rgba(230, 57, 70, 0.9)",
                color: "#ffffff",
                fontWeight: "bold",
                border: "1px solid #ff4d5e",
                boxShadow: hoverSale
                  ? "0 0 30px rgba(230, 57, 70, 0.9)"
                  : "0 4px 20px rgba(230, 57, 70, 0.4)",
                transform: hoverSale ? "translateY(-3px)" : "translateY(0)",
                transition: "all 0.3s ease",
              }}
            >
              Акції та знижки %
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "25px",
            zIndex: 4,
            display: "flex",
            gap: "10px",
          }}
        >
          {BANNER_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? "35px" : "10px",
                height: "10px",
                borderRadius: "5px",
                background:
                  currentSlide === idx ? "#d4af37" : "rgba(255, 255, 255, 0.5)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ВИТРИНА НОВИНОК */}
      <div
        style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              color: "#d4af37",
              fontSize: "32px",
              fontWeight: "400",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Популярні новинки
          </h2>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "#d4af37",
              margin: "15px auto 0",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "25px",
          }}
        >
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)}
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#d4af37")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#28221b")
              }
            >
              <div
                style={{
                  height: "220px",
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
                    style={{ fontSize: "16px", margin: "8px 0", color: "#fff" }}
                  >
                    {product.title}
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
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
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    Купити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* УВЕЛИЧЕННОЕ МОДАЛЬНОЕ ОКНО ТОВАРА НА ГЛАВНОЙ */}
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
                <h2
                  style={{
                    fontSize: "28px",
                    color: "#fff",
                    margin: "5px 0 16px 0",
                    fontFamily: "'Playfair Display', serif",
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
                    "Вишукана прикраса найвищої якості."}
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

export default HomePage;
