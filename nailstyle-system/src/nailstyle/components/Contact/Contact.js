import "./Contact.css";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-parent-ctn" id="contact">
      <div className="contact-child-ctn">
        <div className="contact-header-ctn">
          <span className="header">CONTACT US</span>
          <p className="header-paragraph">
            Get in touch at our convenient location along Peace River.
          </p>
        </div>

        <div className="contact-map-ctn"></div>

        <div className="contact-info-parent">
          <div className="contact-info-ctn">
            <div className="contact-hrs-location">
              <span>LOCATION & HOURS</span>
            </div>
            <div className="contact-address">
              <p>#30102 8 Ave, T8B 9K8</p>
              <p>Somewhere AB, Canada</p>
            </div>
            <div className="contact-hours">
              <ul className="contact-day">
                <li>Mon - Wed:</li>
                <li>Thu - Fri:</li>
                <li>Sat:</li>
                <li>Sun:</li>
              </ul>
              <ul className="contact-time">
                <li>11:00am - 7:00pm</li>
                <li>11:00am - 9:00pm</li>
                <li>11:00am - 6:00pm</li>
                <li>Closed</li>
              </ul>
            </div>
          </div>
          <div className="contact-intouch-ctn">
            <span>GET IN TOUCH</span>
            <div className="contact-phone-email">
              <p>Telephone: (123) 456-7890</p>
              <p>Email: nsnails@nsnails.com</p>
            </div>
          </div>
          <div className="contact-social-ctn">
            <span>FOLLOW US</span>
            <div className="contact-social-media">
              <a href="">
                <FaFacebookSquare
                  className="social"
                  style={{ color: "#303030" }}
                ></FaFacebookSquare>
              </a>
              <a href="">
                <FaInstagram
                  className="social"
                  style={{ color: "#303030" }}
                ></FaInstagram>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
