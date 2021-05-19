import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container footer mt-3" style={{ color: '#fff' }}>
      <div className="float-left">
        <p>
          © Rekteria.net.
          <span style={{ opacity: '0.5' }}>
            <br />
            Engine: <a href="credits.php">Znote AAC</a>
          </span>
        </p>
      </div>
      <div
        className="float-right"
        style={{ textAlign: 'right', opacity: '0.5' }}
      >
        Server date and clock is: 17 May 2021 (09:51)
        <br />
        Page generated in 0.0026 seconds. Q: 2
      </div>
      <div className="float-left" style={{ width: '100%' }}></div>
    </footer>
  );
};

export default Footer;
