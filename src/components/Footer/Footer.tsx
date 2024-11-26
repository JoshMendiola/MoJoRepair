import React from 'react';
import '../../../css/Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <p>&copy; {new Date().getFullYear()} MoJo Repairs. All rights reserved.</p>
    </footer>
  );
};

export default Footer;