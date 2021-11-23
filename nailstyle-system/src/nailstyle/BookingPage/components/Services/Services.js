import { useState, useEffect } from "react";
import axios from "axios";
import "./Services.css";
import {
  picListServices,
  listOfServices,
} from "../../../components/Services/Services";

function Services(props) {
  const [servicesState, setService] = useState(() => {
    return listOfServices;
  });
  const [technicians, setTechnicians] = useState([]);

  const [update, setUpdate] = useState(false);

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
    //update state
    setTechnicians(techCopyList);
  }

  useEffect(() => {
    async function retrieveEmployees() {
      const response = await axios.get("/employees");

      setTechnicians(response.data);
    }

    retrieveEmployees();
  }, []);

  return (
    <div className="service-selection-container">
      <div className="service-nav-container nav">
        <h5>Select Services and Technician</h5>
        <h4>SERVICES</h4>
      </div>
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
      <div className="technician-container">
        <h3>AVAILABLE TECHNICIANS</h3>
        <ul class="technician-options">
          {technicians &&
            technicians.map((tech, i) => (
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
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Services;
