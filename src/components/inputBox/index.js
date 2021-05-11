import React from "react";
import { getDates } from "./../../util";

const InputBox = (props) => {
  const { onFocus, onBlur, onFinish, data, show } = props;
  const [date, setDate] = React.useState({
    year: "",
    month: "",
    date: "",
  });

  const handleOnFocus = () => {
    console.log("onfocus");
    if (onFocus) onFocus();
  };

  const handleOnChange = (e) => {
    const key = e.target.name;
    let val = e.target.value;
    if (Number.isInteger(parseInt(e.target.value))) {
      switch (key) {
        case "month":
          if (parseInt(val) > 12) val = "12";
          if (parseInt(val) < 0) val = "1";
          break;
        case "date":
          if (
            date.month.length !== 0 &&
            parseInt(val) > getDates(parseInt(date.month))
          )
            val = getDates(parseInt(date.month));
          if (parseInt(val) < 0) val = 1;
      }
      setDate({
        ...date,
        [key]: val,
      });
    } else if (e.target.value.length === 0) {
      setDate({
        ...date,
        [key]: "",
      });
    }
  };
  return (
    <div className="inputbox">
      <button>☰</button>
      <label for="year">Year</label>
      <input
        id="year"
        name="year"
        value={date.year}
        type="text"
        className="year"
        placeholder="YYYY"
        maxLength={4}
        onChange={(e) => {
          handleOnChange(e);
        }}
        onFocus={() => {
          if (!show) handleOnFocus();
        }}
      />
      <p>-</p>
      <label for="month">Month</label>
      <input
        id="month"
        name="month"
        value={date.month}
        type="text"
        className="month"
        placeholder="MM"
        maxLength={2}
        onChange={(e) => {
          handleOnChange(e);
        }}
        onFocus={() => {
          if (!show) handleOnFocus();
        }}
      />
      <p>-</p>
      <label for="date">Date</label>
      <input
        id="date"
        name="date"
        value={date.date}
        type="text"
        className="date"
        placeholder="DD"
        maxLength={2}
        onChange={(e) => {
          handleOnChange(e);
        }}
        onFocus={() => {
          if (!show) handleOnFocus();
        }}
      />
    </div>
  );
};

export default InputBox;
