import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytic.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytic = () => {
  const [month, setMonth] = useState(() => {
    let date = new Date();
    return (
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getFullYear()
    );
  });
  const [data, setData] = useState();

  //credits to Quynh Nhu To Tuan, function from
  //https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
  function getWeek() {
    let today = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = today.getDate() - today.getDay() + i;
      let day = new Date(today.setDate(first))
        .toLocaleDateString("en-us")
        .replaceAll("/", "-")
        .slice(0, 10);
      week.push(day);
    }
    return week;
  }

  function filterData(data) {
    let currentWeek = getWeek();
    let tempSet = [];

    let filterData = data.filter((customer) => {
      for (let i = 0; i < customer.visits.length; i++) {
        if (currentWeek.includes(customer.visits[i].appointment.date)) {
          let dataPoint = {
            date: customer.visits[i].appointment.date,
            price: customer.visits[i].appointment.price,
          };
          tempSet.push(dataPoint);
          return customer;
        }
      }
    });

    //sum the price for each day
    sumPrice(tempSet, currentWeek);
  }

  function sumPrice(dataSet, currentWeek) {
    //.log(dataSet);
    //console.log(currentWeek);

    let data = [];

    for (let i = 0; i < currentWeek.length; i++) {
      let totalPrice = 0;
      for (let k = 0; k < dataSet.length; k++) {
        if (currentWeek[i] === dataSet[k].date) {
          totalPrice += dataSet[k].price;
        }
      }
      let dataPoint = { date: currentWeek[i], sales: totalPrice };
      data.push(dataPoint);
    }

    setData(data);
  }

  useEffect(() => {
    async function retrieveData() {
      const response = await axios.get(
        "https://nailstyle-server.herokuapp.com/customers"
      );
      filterData(response.data);
    }
    retrieveData();
  }, []);

  return (
    <div className="chart-container">
      <div className="line-chart">
        <h3>Weekly Sales - {String(month)}</h3>
        <ResponsiveContainer width="90%" height="90%">
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" tickSize={10} tick={{ fontSize: 17 }} />
            <YAxis
              tickSize={10}
              tick={{ fontSize: 19 }}
              label={{
                value: "Money",
                angle: -90,
                dx: -30,
                fontSize: 22,
              }}
            />
            <Legend />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="hsla(336, 59%, 39%, 0.637)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytic;
