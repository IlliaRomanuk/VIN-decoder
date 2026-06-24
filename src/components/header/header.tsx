import { Link } from 'react-router-dom';
import './header.css';
function Header() {
  return (
    <header>
      <h1>VIN Decoder</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/variables">Variables</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header