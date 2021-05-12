import React from "react";
import { getFebDays } from "./../../util";
const DateTable = (props) => {
  const { data, tmpData, onClick } = props;
  const handleOnClick = (arg1, arg2, arg3) => {
    if (onClick) onClick(arg1, arg2, arg3);
  };

  const renderCalendar = (month, year) => {
    const datelist = [];
    const days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    weekdays.forEach((item) =>
      datelist.push(<div className="weekdays">{item}</div>)
    );
    const currDate = new Date();
    const first_day = new Date(year, month, 1);

    for (let i = 0; i < 42; i++) {
      let classname = "";

      // Current date
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        classname = classname + "current ";
      }

      // Selected Date
      if (
        data.date === i - first_day.getDay() + 1 &&
        data.month === month &&
        data.year === year
      ) {
        classname = classname + "selected ";
      }

      //The days outside the current month
      if (
        i - first_day.getDay() + 1 > days_of_month[month] ||
        i - first_day.getDay() + 1 <= 0
      ) {
        classname = classname + "not_calendar_day";
        const current =
          i - first_day.getDay() + 1 > days_of_month[month]
            ? i - first_day.getDay() + 1 - days_of_month[month]
            : days_of_month[month - 1 < 0 ? month + 11 : month - 1] +
              i -
              first_day.getDay() +
              1;
        let tmpMonth = tmpData.month;
        let tmpYear = tmpData.year;

        if (
          tmpData.month === 11 &&
          i - first_day.getDay() + 1 > days_of_month[tmpData.month]
        ) {
          tmpMonth = 0;
          tmpYear++;
        } else if (
          tmpData.month < 11 &&
          i - first_day.getDay() + 1 > days_of_month[tmpData.month]
        ) {
          tmpMonth = tmpMonth + 1;
        }
        if (
          tmpData.month === 0 &&
          !(i - first_day.getDay() + 1 > days_of_month[tmpData.month])
        ) {
          tmpMonth = 11;
          tmpYear--;
        } else if (
          tmpData.month > 0 &&
          !(i - first_day.getDay() + 1 > days_of_month[tmpData.month])
        ) {
          tmpMonth = tmpMonth - 1;
        }

        datelist.push(
          <div
            className={classname}
            onClick={() => handleOnClick(current, tmpMonth, tmpYear)}
          >
            {current}
          </div>
        );
      } else {
        if (i >= first_day.getDay()) {
          classname = classname + "calendar_day";
          datelist.push(
            <div
              className={classname}
              onClick={() => handleOnClick(i - first_day.getDay() + 1)}
            >
              {i - first_day.getDay() + 1}
            </div>
          );
        }
      }
    }
    return datelist;
  };
  const calendar = renderCalendar(tmpData.month, tmpData.year);
  return <div className="calendar_date_body">{calendar}</div>;
};

export default DateTable;
