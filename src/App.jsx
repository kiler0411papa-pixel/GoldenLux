import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import SalePage from "./pages/SalePage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Поля формы оформления из корзины
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("goldenlux_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goldenlux_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart([]);
    setCheckoutName("");
    setCheckoutPhone("");
    setCheckoutCity("");

    // Всплывающее стильное уведомление
    const customAlert = document.createElement("div");
    customAlert.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 3000;">
        <div style="background: #181512; border: 1px solid #d4af37; border-radius: 12px; padding: 40px; text-align: center; max-width: 500px; box-shadow: 0 20px 50px rgba(0,0,0,0.9);">
          <div style="font-size: 48px; margin-bottom: 15px;">✨</div>
          <h3 style="color: #d4af37; font-size: 26px; margin: 0 0 15px 0; font-family: 'Playfair Display', serif;">Дякуємо за замовлення!</h3>
          <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6;">Наш ювелірний консультант зв'яжеться з вами найближчим часом для підтвердження доставки.</p>
          <button id="closeSuccessBtn" style="margin-top: 25px; padding: 14px 35px; background: #d4af37; color: #121212; border: none; font-weight: bold; font-size: 14px; text-transform: uppercase; border-radius: 4px; cursor: pointer;">Чудово</button>
        </div>
      </div>
    `;
    document.body.appendChild(customAlert);
    document.getElementById("closeSuccessBtn").onclick = () =>
      customAlert.remove();
  };

  return (
    <Router>
      <header
        style={{
          padding: "20px 60px",
          background: "rgba(13, 13, 13, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              color: "#d4af37",
              margin: 0,
              fontSize: "28px",
              letterSpacing: "4px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "bold",
            }}
          >
            GoldenLux
          </h1>
        </Link>

        <nav style={{ display: "flex", gap: "35px", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              color: "#e0e0e0",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textDecoration: "none",
            }}
          >
            ГОЛОВНА
          </Link>
          <Link
            to="/catalog"
            style={{
              color: "#e0e0e0",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textDecoration: "none",
            }}
          >
            КАТАЛОГ
          </Link>
          <Link
            to="/sale"
            style={{
              color: "#e63946",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            ЗНИЖКИ %
          </Link>
          <Link
            to="/admin"
            style={{
              color: "#d4af37",
              fontSize: "12px",
              border: "1px solid #d4af37",
              padding: "8px 18px",
              borderRadius: "4px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              textDecoration: "none",
            }}
          >
            Адмін-панель
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              color: "#d4af37",
              fontSize: "13px",
              fontWeight: "bold",
              background: "#1a1612",
              padding: "8px 18px",
              borderRadius: "20px",
              border: "1px solid #d4af37",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🛒 Кошик{" "}
            <span
              style={{
                background: "#d4af37",
                color: "#121212",
                borderRadius: "50%",
                padding: "2px 8px",
                fontSize: "12px",
              }}
            >
              {cart.length}
            </span>
          </button>
        </nav>
      </header>

      {/* ПЛАВНО ВЫЕЗЖАЮЩАЯ БОКОВАЯ КОРЗИНА */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "flex-end",
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? "all" : "none",
          transition: "opacity 0.4s ease-in-out",
        }}
        onClick={() => setIsCartOpen(false)}
      >
        <div
          style={{
            width: "480px",
            height: "100%",
            background: "#141210",
            borderLeft: "1px solid #d4af37",
            padding: "35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "-10px 0 40px rgba(0,0,0,0.9)",
            boxSizing: "border-box",
            transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #2d2620",
                paddingBottom: "20px",
              }}
            >
              <h3
                style={{
                  color: "#d4af37",
                  margin: 0,
                  fontSize: "24px",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Ваш кошик ({cart.length})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d4af37",
                  fontSize: "28px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            <div
              style={{
                marginTop: "25px",
                maxHeight: "55vh",
                overflowY: "auto",
              }}
            >
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "60px",
                    color: "#888",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    🛍️
                  </div>
                  <p style={{ fontSize: "16px" }}>Ваш кошик порожній</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                      marginBottom: "15px",
                      background: "#1c1916",
                      padding: "12px 15px",
                      borderRadius: "8px",
                      border: "1px solid #2a241e",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <h4
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          margin: "0 0 6px 0",
                          fontWeight: "400",
                        }}
                      >
                        {item.title}
                      </h4>
                      <span
                        style={{
                          color: "#d4af37",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.price} ₴
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#e63946",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div style={{ borderTop: "1px solid #2d2620", paddingTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#fff",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                <span>Разом до сплати:</span>
                <span style={{ color: "#d4af37" }}>{totalPrice} ₴</span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="gold-btn"
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Оформити замовлення
              </button>
            </div>
          )}
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО ОФОРМЛЕНИЯ ЗАКАЗА ИЗ КОРЗИНЫ */}
      {isCheckoutOpen && (
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
          onClick={() => setIsCheckoutOpen(false)}
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
              onClick={() => setIsCheckoutOpen(false)}
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
              <strong style={{ color: "#d4af37" }}>{totalPrice} ₴</strong>
            </p>

            <form onSubmit={handleCheckoutSubmit}>
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
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
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
                  value={checkoutPhone}
                  onChange={(e) => setCheckoutPhone(e.target.value)}
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
                  value={checkoutCity}
                  onChange={(e) => setCheckoutCity(e.target.value)}
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

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route
            path="/catalog"
            element={<CatalogPage addToCart={addToCart} />}
          />
          <Route path="/sale" element={<SalePage addToCart={addToCart} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <footer
        style={{
          padding: "30px 20px",
          textAlign: "center",
          background: "#080808",
          borderTop: "1px solid #222",
          color: "#777",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          Папакіца Вікторія Станіславівна | Ювелірний інтернет-магазин GoldenLux
          © 2026
        </p>
      </footer>
    </Router>
  );
}

export default App;
