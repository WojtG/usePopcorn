import Logo from "./Logo";
import NumberResults from "./NumberResults";
import Search from "./Search";

function Nav() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumberResults />
    </nav>
  );
}

export default Nav;
