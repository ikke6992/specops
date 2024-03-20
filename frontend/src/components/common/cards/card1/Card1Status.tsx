import React, { useState } from "react";

interface Props {
  start: string;
  end: string;
}

const Card1Status = ({ start, end }: Props) => {
  const currentDate = Date.now();
  const startDate = Date.parse(start);
  const endDate = Date.parse(end);
  const timeFrame = endDate - startDate;
  const timeElapsed = currentDate - startDate;
  const progressPercentage = Math.floor((timeElapsed / timeFrame) * 100);
  const timeRemaining = endDate - currentDate;
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24) + 1);
  const timeUntill = startDate - currentDate;
  const daysUntill = Math.ceil(timeUntill / (1000 * 60 * 60 * 24));
  const timeOverdue = currentDate - endDate;
  const daysOverdue = Math.floor(timeOverdue / (1000 * 60 * 60 * 24));

  function formatProgress() {
    if (progressPercentage > 100) return "8%";
    return progressPercentage.toString() + "%";
  }

  if (
    startDate <= currentDate &&
    endDate + 1000 * 60 * 60 * 24 >= currentDate
  ) {
    return (
      <div className="grid bg-yellow-600 rounded-full border-4 border-yellow-600">
        <div
          className="col-start-1 row-start-1 bg-yellow-500 rounded-full p-3"
          style={{ width: formatProgress() }}
        ></div>
        <p className="grid col-start-1 row-start-1 text-sm justify-items-center content-center font-semibold">
          Days Left: {daysRemaining}
        </p>
      </div>
    );
  } else if (startDate > currentDate) {
    return (
      <div className="grid bg-green-600 rounded-full border-4 border-green-600">
        <div
          className="col-start-1 row-start-1 bg-green-500 rounded-full p-3"
          style={{ width: "100%" }}
        ></div>
        <p className="grid col-start-1 row-start-1 text-sm justify-items-center content-center font-semibold">
          Days Untill Task: {daysUntill}
        </p>
      </div>
    );
  } else if (endDate + 1000 * 60 * 60 * 24 < currentDate) {
    return (
      <div className="grid bg-red-600 rounded-full border-4 border-red-600">
        <div
          className="col-start-1 row-start-1 bg-red-400 rounded-full p-3"
          style={{ width: "100%" }}
        ></div>
        <p className="grid col-start-1 row-start-1 text-sm justify-items-center content-center font-semibold">
          Days Overdue: {daysOverdue}
        </p>
      </div>
    );
  } else {
    return "Something went wrong in card generation.";
  }
};

export default Card1Status;
