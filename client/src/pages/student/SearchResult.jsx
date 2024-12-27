/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 bg-transparent">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto hover:shadow-lg hover:bg-opacity-90 transition-all duration-300"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-md shadow-md transition-all duration-300 hover:scale-105"
        />
        <div className="flex flex-col gap-2 px-4">
          <h1 className="font-bold text-lg md:text-xl text-white">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-300">{course.subTitle}</p>
          <p className="text-sm text-gray-400">
            Instructor:{" "}
            <span className="font-bold">{course.creator?.name}</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>

      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-white">
          $ {course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;
