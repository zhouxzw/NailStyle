import React from "react";
import Service from "./Service";

export default function ServiceDisplay({ servicesState }) {
  return servicesState.map((service) => {
    if (service.toggled) return <Service service={service} />;
  });
}
