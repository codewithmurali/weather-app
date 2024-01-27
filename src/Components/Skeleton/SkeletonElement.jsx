import React from "react";
import Skeleton from "./Skeleton";
import Shimmer from "./Shimmer";

const SkeletonElement = ({ theme }) => {
  const themeClass = theme || "light";

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-weather-data">
        <Skeleton type="avator" />
        <div className="text-container">
          <Skeleton type="title" />
          <Skeleton type="text" />
        </div>
      </div>

      <div className="skeleton-additional-data">
        <div className="skeleton-weather-data">
          <Skeleton type="avator" />
          <div className="text-container">
            <Skeleton type="title" />
            <Skeleton type="text" />
          </div>
        </div>
        <div className="skeleton-weather-data">
          <Skeleton type="avator" />
          <div className="text-container">
            <Skeleton type="title" />
            <Skeleton type="text" />
          </div>
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonElement;
