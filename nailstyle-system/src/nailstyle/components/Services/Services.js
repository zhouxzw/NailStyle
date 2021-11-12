import "./Services.css";
import pic1 from "./pics/1.jpg";
import pic2 from "./pics/2.jpg";
import pic3 from "./pics/3.jpg";
import pic4 from "./pics/4.jpg";
import pic5 from "./pics/5.jpg";
import React, { useState, useEffect } from "react";
import ServiceDisplay from "./ServiceDisplay";

const picListServices = [pic1, pic2, pic3, pic4, pic5];

const listOfServices = [
  {
    id: 0,
    name: "MANICURE",
    toggled: true,
    serviceList: [
      { id: 0, desc: "Regular Manicure", price: 60 },
      { id: 1, desc: "Naked Manicure", price: 70 },
      { id: 2, desc: "Gel Manicure", price: 60 },
      { id: 3, desc: "Signature Manicure", price: 85 },
    ],
    description:
      "A clean up of the natural finger nails which includes, cutting and shaping, cuticle trim, polish, finished with a hand massage and hotel towel. ",
  },
  {
    id: 1,
    name: "PEDICURE",
    toggled: false,
    serviceList: [
      { id: 0, desc: "Regular Pedicure", price: 60 },
      { id: 1, desc: "Deluxe Pedicure", price: 70 },
      { id: 2, desc: "Gel Pedicure", price: 75 },
      { id: 3, desc: "Deluxe Gel Pedicure", price: 90 },
    ],
    description:
      "A clean up of toe nails along which include cutting and shaping, cuticle trim, callus treatment, exfoliating sugar scrub, leg massage and hotel towel. Finished with your choice of polish. ",
  },
  {
    id: 2,
    name: "EYELASHES",
    toggled: false,
    serviceList: [
      { id: 0, desc: "Classic Lash Set", price: 100 },
      { id: 1, desc: "Classic Lash Fill", price: 65 },
      { id: 2, desc: "Hybrid Lash Set", price: 130 },
      { id: 3, desc: "Hybrid Lash Fill", price: 80 },
      { id: 4, desc: "Mega Volume Lash Set", price: 180 },
      { id: 5, desc: "Mega Volume Lash Fill", price: 105 },
      { id: 6, desc: "Lash Removal", price: 20 },
    ],
    description:
      "Individual strands of faux eyelashes glued onto your natural eyelashes.",
  },
  {
    id: 3,
    name: "NAIL EXT.",
    toggled: false,
    serviceList: [
      { id: 0, desc: "Solar Full Set", price: 55 },
      { id: 1, desc: "Solar Refill", price: 45 },
      { id: 2, desc: "UV Gel Full Set", price: 60 },
      { id: 3, desc: "Nail Repair", price: 50 },
      { id: 4, desc: "Remove Nails", price: 20 },
    ],
    description:
      "An extension of your natural nail where acrylic or UV gel is added on top of the natural nail bed and extended nail tip. Finished with your choice of polish or design.",
  },
  {
    id: 4,
    name: "WAXING",
    toggled: false,
    serviceList: [
      { id: 0, desc: "Eyebrows", price: 10 },
      { id: 1, desc: "Lip & Chin", price: 15 },
      { id: 2, desc: "Full Face", price: 20 },
      { id: 3, desc: "Arms", price: 25 },
      { id: 4, desc: "Legs", price: 40 },
    ],
    description:
      "Removal of unwanted hair from the root of the follicle. Hot wax is applied to the area of concern and removed with a peeling strip.",
  },
];

function Services() {
  const [servicesState, setService] = useState(() => {
    return listOfServices;
  });
  const style = { background: null };

  //https://stackoverflow.com/questions/62918710/how-to-update-state-with-usestate-in-an-array-of-objects
  function toggleServices(i) {
    let newList = servicesState.map((src) => {
      src.toggled = false;
      if (src.id === i) {
        return { ...src, toggled: !src.toggled };
      }
      return src;
    });

    setService(newList);
  }

  return (
    <>
      <div className="srvc-parent-ctn4" id="services">
        <div className="srvc-header-ctn">
          <span className="header">SERVICES</span>

          <p class="header-paragraph">
            Our premium manicure and pedicure nail care services will leave you
            feeling refreshed and confident once more.
          </p>
        </div>

        <div className="srvc-panel-ctn">
          <div className="srvc-nav">
            {picListServices.map((src, i) => (
              <>
                <div
                  onClick={() => toggleServices(i)}
                  className="srvc-ctgs"
                  style={
                    servicesState[i].toggled
                      ? { backgroundColor: "rgb(222, 126, 152, 1)" }
                      : { backgroundImage: `url(${src})` }
                  }
                >
                  <div className="service-title">{servicesState[i].name}</div>
                </div>
              </>
            ))}
          </div>

          <hr className="line2"></hr>

          <div className="srvc-display-ctn">
            <div className="srvc-display">
              <ServiceDisplay servicesState={servicesState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
