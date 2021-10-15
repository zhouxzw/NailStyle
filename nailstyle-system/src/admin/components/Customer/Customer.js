import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Customer.css";

import { BsSearch } from "react-icons/bs";

const Customer = () => {
  const [customers, setCustomers] = useState();
  const [search, setSearch] = useState("");

  const [extend, setExtend] = useState(false);

  useEffect(() => {
    async function retrieveCustomers() {
      const response = await axios.get("/customers");
      console.log("data", response.data);

      const modData = response.data;
      modData.map((customer, i) => {
        let phone = customer.phone;
        //format phone number to add dashes
        phone = [phone.slice(0, 3), "-", phone.slice(3)].join("");
        phone = [phone.slice(0, 7), "-", phone.slice(7)].join("");
        customer.phone = phone;

        //calculate total spendings
        let totalSpent = 0;
        for (let i = 0; i < customer.visits.length; i++) {
          totalSpent += customer.visits[i].appointment.price;
          customer.total = totalSpent;
        }

        customer.toggle = false;
      });

      setCustomers(response.data);
    }
    retrieveCustomers();
  }, []);

  function showDetail(customer) {
    //setExtend(!extend);
    let toggler = !customer.toggle;
    let copy = customers;

    for (let i = 0; i < copy.length; i++) {
      if (copy[i].phone === customer.phone) {
        copy[i].toggle = toggler;
      }
    }
    setExtend(!extend);
  }

  return (
    <div className="customer-container">
      <div className="search-container">
        <BsSearch className="search-icon"></BsSearch>
        <input
          className="search-bar"
          placeholder="Search..."
          type="text"
          onChange={(event) => setSearch(event.target.value)}
        ></input>
      </div>
      {
        <div className="card-container">
          <div className="card-legend">
            <ul>
              <li>Name</li>
              <li>Phone</li>
              <li>Visits</li>
              <li>Total Spent</li>
            </ul>
          </div>
          {customers &&
            customers
              .filter((customer) => {
                if (search === "") {
                  return customer;
                } else if (
                  customer.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return customer;
                } else if (customer.phone.includes(search)) {
                  return customer;
                }
              })
              .map((customer, i) => (
                <div>
                  <div
                    className="customer-card"
                    key={i}
                    onClick={() => showDetail(customer)}
                  >
                    <ul>
                      <li>{customer.name}</li>
                      <li>{customer.phone}</li>
                      <li>{customer.visits.length}</li>
                      <li>${customer.total}</li>
                    </ul>
                  </div>
                  {customer.toggle ? (
                    <div className="extended-card">
                      {customer.visits.map((obj) => (
                        <ul>
                          <li>
                            <b>Date:</b> {obj.appointment.date}
                          </li>
                          <li>
                            <b>Service:</b> {obj.appointment.service}
                          </li>
                          <li>
                            <b>Tech:</b> {obj.appointment.technician}
                          </li>
                          <li>
                            <b>Price:</b> ${obj.appointment.price}
                          </li>
                        </ul>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
        </div>
      }
    </div>
  );
};

export default Customer;
