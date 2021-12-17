import Menu from "./Menu";
import TopBar from "./TopBar";

const Header = () => {
  return (
    <div className="header">
      <TopBar />
      <Menu />
    </div>
  );
};

export default Header;
