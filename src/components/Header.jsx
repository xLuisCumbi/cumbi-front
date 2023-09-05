import React, { useEffect, useRef, useState } from "react";

export default function Header() {
  const [user, setUser] = useState({ username: "no user" });

  const handleSidebarToggle = () => {

    document.body.classList.toggle("toggle-sidebar");

  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user)
  }, [])

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center text-decoration-none">
            <img src="/images/logo.png" alt="" />
          </a>
        </div>

        <nav className="header-nav ms-auto px-5">
          <ul className="d-flex align-items-center">
            <li>
              {user.username.substring(0, 10).toUpperCase()} 
              <span > ({user.role})</span>
            </li>
            <li className="nav-item d-block">
              <i onClick={handleSidebarToggle} className="bi bi-list toggle-sidebar-btn"></i>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
