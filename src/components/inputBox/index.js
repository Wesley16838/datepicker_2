import React from "react";
import { getDates } from "./../../util";

const InputBox = (props) => {
  const { onFocus, onBlur, onFinish, data, show } = props;
  const [date, setDate] = React.useState({
    year: `${data.year}`,
    month: `${data.month + 1}`,
    date: `${data.date}`,
  });

  React.useEffect(() => {
    if(data.year !== parseInt(date.year) || data.month+1 !== parseInt(date.month) || data.date !== parseInt(date.date)){
      setDate({
        year: `${data.year}`,
        month: `${data.month + 1}`,
        date: `${data.date}`,
      })
    }
  }, [data, setDate])

  const handleOnFocus = () => {
    if (onFocus) onFocus();
  };

  const handleOnBlur = (e) => {
    if(date.year !== "" && date.month !== "" && date.date !== "") {
      if(onFinish) onFinish(date)
    }
  }

  const handleOnChange = (e) => {
    const key = e.target.name;
    let val = e.target.value;
    if (Number.isInteger(parseInt(e.target.value))) {
      switch (key) {
        case "year":
          let dayYear = parseInt(date.date);
          if (dayYear > getDates(parseInt(date.month), parseInt(date.year))) {
            dayYear = getDates(parseInt(date.month), parseInt(date.year))
          }
          setDate({
            ...date,
            [key]: val,
            date: dayYear.toString(),
          });
          break;
        case "month":
          let day = parseInt(date.date);
          if (parseInt(val) > 12) val = "12";
          if (parseInt(val) < 0) val = "1";
          
          if (parseInt(date.date) > getDates(parseInt(val), parseInt(date.year))) {
              day = getDates(parseInt(val), parseInt(date.year))
          }
          setDate({
            ...date,
            [key]: val,
            date: day.toString(),
          });
          break;
        case "date":
          if (
            date.month.length !== 0 &&
            parseInt(val) > getDates(parseInt(date.month), parseInt(date.year))
          ) {
            val = getDates(parseInt(date.month), parseInt(date.year));
          } else if (parseInt(val) < 0) {
            val = 1;
          }
          setDate({
            ...date,
            [key]: val.toString(),
          });
          break;
      }
     
    } else if (e.target.value.length === 0) {
      setDate({
        ...date,
        [key]: "",
      });
    }
  };
  return (
    <div className="inputbox">
      <button onClick={()=> {
        if (!show) handleOnFocus();
      }}>☰</button>
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
        onBlur={() => {
          handleOnBlur()
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
        onBlur={() => {
          handleOnBlur()
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
        onBlur={() => {
          handleOnBlur()
        }}
      />
    </div>
  );
};

export default InputBox;
