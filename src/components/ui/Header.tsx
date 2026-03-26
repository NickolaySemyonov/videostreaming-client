import { useLocation, Link, useNavigate } from "react-router-dom";
import { logoutRequest } from "../../api/requests";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: "/me", label: "Profile" },
    { path: "/feed", label: "Feed" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logoutRequest();
      console.log("Logout successful:", result);

      setTimeout(() => {
        navigate("/login");
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header>
      <nav
        style={{
          padding: "1rem",
          backgroundColor: "#333",
          color: "white",
          display: "flex",
          gap: "2rem",
        }}
      >
        <div style={{ fontWeight: "bold", marginRight: "auto" }}>MyApp</div>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: isActive(link.path) ? "#ff6b6b" : "white",
              textDecoration: "none",
              fontWeight: isActive(link.path) ? "bold" : "normal",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: isActive(link.path)
                ? "rgba(255, 107, 107, 0.1)"
                : "transparent",
            }}
          >
            {link.label}
          </Link>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
