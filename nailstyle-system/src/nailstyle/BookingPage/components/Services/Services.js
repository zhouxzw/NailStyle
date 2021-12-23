import { useState } from "react";

import "./Services.css";
import {
  picListServices,
  listOfServices,
} from "../../../components/Services/Services";

function Services(props) {
  const [servicesState, setService] = useState(() => {
    return listOfServices;
  });

  const technicians = props.allTechs;
  //const [technicians, setTechnicians] = useState(test);

  //https://stackoverflow.com/questions/62918710/how-to-update-state-with-usestate-in-an-array-of-objects
  function toggleServices(i) {
    let newList = servicesState.map((src) => {
      src.toggled = false;
      src.serviceList.map((options) => {
        return (options.toggle = false);
      });
      if (src.id === i) {
        return { ...src, toggled: !src.toggled };
      }
      return src;
    });

    setService(newList);
  }

  //function to toggle between the categories of services
  function toggleSelection(index) {
    let newList = servicesState.map((src) => {
      src.serviceList.map((options) => {
        return (options.toggle = false);
      });

      if (src.toggled === true) {
        src.serviceList[index].toggle = !src.serviceList[index].toggle;
      }
      return src;
    });
    setService(newList);
  }

  //function to toggle between the technicians
  function toggleTech(index) {
    //create a copy and set the toggle to false for all technicians
    let techCopyList = technicians.map((tech) => {
      tech.toggle = false;
      return tech;
    });
    //user click will generate the index of the technician and we set that toggle to true
    techCopyList[index].toggle = true;
  }

  return (
    <div className="service-parent-container">
      {/* SELECT */}
      <div className="service-nav-container nav">
        <h5>Select Services and Technician</h5>
      </div>
      {/* SERVICE */}
      <div className="service-container">
        <div className="service-desktop-formatter">
          <h4>SERVICES</h4>
          <div className="service-selection-container">
            <div className="service-tabs">
              {picListServices.map((src, i) => (
                <div
                  onClick={() => toggleServices(i)}
                  className="service-selection"
                  key={"srvc-sel" + i}
                  style={
                    servicesState[i].toggled
                      ? { backgroundColor: "rgb(175, 101, 120)" }
                      : { backgroundImage: `url(${src})` }
                  }
                >
                  <div className="service-title">{servicesState[i].name}</div>
                </div>
              ))}
            </div>
            <div className="service-options">
              <ul className="service-option-list">
                {servicesState
                  .filter((options, j) => {
                    if (options.toggled === true) {
                      return options;
                    }
                  })
                  .map((option) =>
                    option.serviceList.map(function (selection, i) {
                      return (
                        <div
                          key={"selection-key-" + i}
                          className="service-info"
                          id={"selection-id-" + i}
                          style={
                            option.serviceList[i].toggle
                              ? { backgroundColor: "#E1B0BD" }
                              : null
                          }
                          onClick={() => {
                            toggleSelection(i);
                            props.getService(selection.desc);
                            props.getPrice(selection.price);
                          }}
                        >
                          <li>{selection.desc}</li>
                          <li>{"$" + selection.price}</li>
                        </div>
                      );
                    })
                  )}
              </ul>
            </div>
          </div>
        </div>

        {/* TECH */}
        <div className="technician-container">
          <h4>AVAILABLE TECHNICIANS</h4>
          <ul className="technician-options">
            {technicians.map(function (tech, i) {
              return (
                <div
                  className="tech-names"
                  key={"tech-name-" + i}
                  onClick={() => {
                    toggleTech(i);
                    props.getTech(tech.name);
                  }}
                  style={
                    tech.toggle
                      ? { backgroundColor: "#E1B0BD" }
                      : { backgroundColor: null }
                  }
                >
                  <li>{tech.name}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Services;
