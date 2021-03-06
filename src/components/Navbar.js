import React from 'react';
import { Link } from 'react-router-dom';
import Quotes from '../pages/Quotes';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Characters</Link> | <Link to="/quotes">Quotes</Link>
    </nav>
  );
};

export default Navbar;
