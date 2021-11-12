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
        </div>

        <div className="contact-map-ctn"></div>

        <div className="contact-info-parent">
          <div className="contact-info-ctn">
            <div className="contact-hrs-location">
              <span>HOURS & LOCATION</span>
            </div>
            <div className="contact-address">
              <p>#10003 102 Ave, T8S 1S3</p>
              <p>Peace River AB, Canada</p>
            </div>
            <div className="contact-hours">
              <ul className="contact-day">
                <li>Mon - Wed:</li>
                <li>Thu - Fri:</li>
                <li>Sat:</li>
                <li>Sun:</li>
              </ul>
              <ul className="contact-time">
                <li>10:00am - 6:00pm</li>
                <li>10:00am - 9:00pm</li>
                <li>10:00am - 5:00pm</li>
                <li>Closed</li>
              </ul>
            </div>
          </div>
          <div className="contact-intouch-ctn">
            <span>GET IN TOUCH</span>
            <div className="contact-phone-email">
              <p>Telephone: (780) 624-8886</p>
              <p>Email: nailstylepeaceriver@email.ca</p>
            </div>
          </div>
          <div className="contact-social-ctn">
            <span>FOLLOW US</span>
            <div className="contact-social-media">
              <a href="#">
                <FaFacebookSquare className="social"></FaFacebookSquare>
              </a>
              <a href="#">
                <FaInstagram className="social"></FaInstagram>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
