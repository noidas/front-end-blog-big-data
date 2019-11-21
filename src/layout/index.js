import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import "./index.scss";

export default ({ children, ...props }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("autenticacao")));
    console.log(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    localStorage.removeItem("autenticacao");
  }

  return (
    <Layout className="blog-template">
      <header className="blog-nav">
        <div className="blog-width">
          <div className="blog-nav-container">
            <Link
              className="blog-current"
              to={props.id ? `/blog/${props.id}` : "/"}
            >
              <div className="blog-title">{props.title}</div>
            </Link>
            <nav className="blog-navigation-menu" role="navigation">
              <Link to="/" className="blog-navigation-link">
                Listar Blogs
              </Link>
              {!auth ? (
                <Link to="/login" className="blog-navigation-link">
                  Login
                </Link>
              ) : (
                <div className="blog-text">
                  {auth.name} (
                  <Link
                    onClick={logout}
                    to="/login"
                    className="blog-navigation-link"
                  >
                    Sair
                  </Link>
                  )
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
      <section className="blog-content">
        <div className="blog-width">{children}</div>
      </section>
    </Layout>
  );
};
