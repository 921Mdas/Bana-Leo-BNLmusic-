// External Imports
import React from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaFacebookF,
} from "react-icons/fa";
import { SiFsecure } from "react-icons/si";

function Footer() {
  return (
    <div className="footer">
      <div className="footerLinks">
        <div className="general">
          <h3>GENERAL</h3>
          <ul>
            <li>Home</li>
            <li>Royalty-free Music</li>
            <li>Music Genres</li>
          </ul>
        </div>
        <div className="general">
          <h3>COLLECTIONS</h3>
          <ul>
            <li>Most popular</li>
            <li>Jazz style</li>
            <li>Most Poetic</li>
          </ul>
        </div>
        <div className="general">
          <h3>INFO</h3>
          <ul>
            <li>About us</li>
            <li>Memories</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="general">
          <h3>COMPOSERS</h3>
          <ul>
            <li>Submit Music</li>
            <li>Greatest composers</li>
          </ul>
        </div>
        <div className="general">
          <h3>SUPPORT</h3>
          <ul>
            <li>Contact us</li>
            <li>FAQ</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
      <div className="social_links">
        <div className="social">
          <BsTwitter className="socialIcons" />
          <FaFacebookF className="socialIcons" />
          <BsYoutube className="socialIcons" />
          <AiFillInstagram className="socialIcons" />
        </div>
        <div className="sponsors">
          <SiFsecure className="sponsorIcons" />
          <FaPaypal className="sponsorIcons" />
          <FaCcVisa className="sponsorIcons" />
          <FaCcMastercard className="sponsorIcons" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
