import React from "react";

export default function Service(props) {
  const name = props.service.name;
  const description = props.service.description;
  const serviceList = props.service.serviceList;

  return (
    <>
      <div className="srvc-display-title">{name}</div>

      <div className="srvc-display-list">
        <ul className="srvc-type">
          {serviceList.map((item) => (
            <li className={item.id === 0 ? "first-srvc" : null}>{item.desc}</li>
          ))}
        </ul>
        <ul className="srvc-price">
          {serviceList.map((item) => (
            <li className={item.id === 0 ? "first-srvc" : null}>
              ${item.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="srvc-display-desc">
        <p>{description}</p>
      </div>
    </>
  );
}
