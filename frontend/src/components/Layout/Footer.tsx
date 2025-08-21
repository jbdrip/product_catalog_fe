import React from "react";
import "../../styles/Footer.css";

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>TechStore</h4>
        <p>Tu tienda de tecnología de confianza</p>
      </div>
      <div className="footer-section">
        <h5>Enlaces rápidos</h5>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Categorías</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Contacto</h5>
        <ul>
          <li>contacto@techstore.com</li>
          <li>+502 1234-5678</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 TechStore. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;