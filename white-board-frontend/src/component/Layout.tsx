import  { type ReactNode } from "react";
import { Link } from "react-router-dom";
import "../styles/Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header>
        <h2>Whiteboard</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2026 Whiteboard</p>
      </footer>
    </div>
  );
}
