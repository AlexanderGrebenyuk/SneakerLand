import React from 'react';
import './Footer.css';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>Санкт-Петербург, 192007, Лиговский проспект, 140</p>
          <p>Бизнес-центр "Eco Standart", SneakerLand</p>
        </div>
        <div className="footer-section">
          <p>sneaker_land@gmail.com</p>
          <p>+7 (800) 555-35-55</p>
        </div>
      </div>
      {/* <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SneakerLand. Все права защищены.</p>
      </div> */}
    </footer>
  );
}

export default Footer;