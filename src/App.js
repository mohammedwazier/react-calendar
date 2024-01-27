// import logo from './logo.svg';
import { v4 as uuid } from "uuid";
import "./App.css";
import moment from "moment";
import React from "react";

const dayDisabled = [0, 6];

const dayList = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

function App() {
  const lengthData = 7 * 6;
  const currentDate = moment();
  const currentDay = currentDate.day();
  const startDate = moment().add(currentDay * -1, "days");

  const handleClicked = ({ date, state, id }) => {
    if (!state) {
      if (!dayDisabled.includes(date.day())) {
        const boxElement = document.getElementsByClassName("selectedBox");
        for (let index = 0; index < boxElement.length; index++) {
          boxElement[index].classList.remove("bg-green-500");
        }
        console.log({ boxElement });
        const elementData = document.getElementById(id);
        elementData.classList.add("bg-green-500");

        // Return Response.
      }
    }
    return false;
  };

  return (
    <div className="App max-w-screen-sm p-5">
      <div className="grid grid-cols-7 border p-5 rounded-lg shadow-sm">
        {dayList.map((day) => (
          <div
            className="p-3 text-gray-700 text-lg font-semibold"
            onSelect={() => {
              return false;
            }}
            key={uuid()}
          >
            {day}
          </div>
        ))}
        {[...Array(lengthData)].map((_, index) => {
          const currBoxDate = moment(startDate).add(index, "days");
          const dayPosition = currBoxDate.day();
          const disabled = dayDisabled.includes(dayPosition);
          const isCurrentDay =
            currBoxDate.format("Y-M-D") === currentDate.format("Y-M-D");
          const dateBefore = currBoxDate.isBefore(currentDate);
          const id = uuid();
          return (
            <div
              key={uuid()}
              id={id}
              className={`p-3 ${disabled && "bg-red-300"} ${
                isCurrentDay
                  ? disabled
                    ? "cursor-not-allowed"
                    : "bg-green-300"
                  : ""
              } ${
                dateBefore
                  ? "bg-gray-500 text-gray-600 cursor-not-allowed"
                  : !disabled && "cursor-pointer selectedBox"
              }`}
              onClick={() =>
                handleClicked({
                  date: currBoxDate,
                  state: dateBefore,
                  id,
                })
              }
            >
              <div
                className={`p-2 ${
                  isCurrentDay ? "rounded-full bg-red-600" : ""
                } text-2xl`}
              >
                {currBoxDate.format("D")}
              </div>
              <div className="text-sm text-gray-400 float-end">
                {currBoxDate.format("MMM", "ID")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
