import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Importing CSS for Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        MyLogo
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li> {/* Home page link */}
        <li><Link to="/botpage">Bot</Link></li> {/* About page link */}
        <li><Link to="/contact">Contact</Link></li> {/* Contact page link */}
      </ul>
    </nav>
  );
}

export default Navbar;
