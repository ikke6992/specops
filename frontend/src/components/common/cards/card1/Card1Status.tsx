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
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  const timeOverdue = currentDate - endDate;
  const daysOverdue = Math.floor(timeOverdue / (1000 * 60 * 60 * 24));

  function formatProgress() {
    return progressPercentage.toString() + "%";
  }

  if (startDate <= currentDate && endDate >= currentDate) {
    return (
      <div className="grid bg-yellow-600 rounded-full border-2 border-yellow-600">
        <div
          className="col-start-1 row-start-1 h-4 bg-yellow-500 rounded-full"
          style={{ width: formatProgress() }}
        ></div>
        <p className="grid col-start-1 row-start-1 text-xs justify-items-center">
          Days Left: {daysRemaining}
        </p>
      </div>
    );
  } else if (startDate > currentDate) {
    return (
      <div className="grid bg-green-600 rounded-full border-2 border-green-600">
        <div
          className="col-start-1 row-start-1 h-4 bg-green-500 rounded-full"
          style={{ width: "100%" }}
        ></div>
        <p className="grid col-start-1 row-start-1 text-xs justify-items-center">
          Days Untill Task: {daysRemaining}
        </p>
      </div>
    );
  } else if (endDate < currentDate) {
    return (
      <div className="grid bg-red-600 rounded-full border-2 border-red-600">
        <div
          className="col-start-1 row-start-1 h-4 bg-red-400 rounded-full"
          style={{ width: "100%" }}
        ></div>
        <p className="grid col-start-1 row-start-1 text-xs justify-items-center">
          Days Overdue: {daysOverdue}
        </p>
      </div>
    );
  } else {
    return "Something went wrong in card generation.";
  }
};

export default Card1Status;
