import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
    <div className="footerLinks">
					<Link to="/contact">Contact</Link>
					<Link to="/aboutUs">About</Link>
					<Link to="/signup">Follow Us</Link>
		</div>
    <div>
		  <br />
        &copy; 2023 Helping Hands. All rights reserved.
      </div>

  </footer>
);
