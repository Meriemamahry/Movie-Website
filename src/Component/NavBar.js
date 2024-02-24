import { Outlet, NavLink} from "react-router-dom";
import '../style/NavBar.css';
export default function NavBar() {
  return (
    <div>
      <header  className="navBar"> 
        <nav>
          <div className="logo">
          </div>
          
          <NavLink to="/">Home</NavLink>
          <NavLink to="about/:id" end activeClassName="active-about">About</NavLink>
          <NavLink to="categories">Categories</NavLink>
          <NavLink to="favorite">Favorite</NavLink>
          
        </nav>
      </header>
   
      <main>
        <Outlet />
      </main>
    </div>
  )
}
