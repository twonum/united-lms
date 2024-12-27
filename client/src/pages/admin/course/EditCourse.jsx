import { Button } from "@/components/ui/button";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 p-6 bg-transparent text-white">
      <div className="flex items-center justify-between mb-6 p-6 rounded-lg shadow-2xl backdrop-blur-md bg-transparent">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight text-shadow-lg">
          Add Detailed Information Regarding the Course
        </h1>
        <Link to="lecture">
          <Button className="text-white bg-transparent border-2 border-white/30 hover:underline transition-all duration-300 rounded-md shadow-lg hover:bg-white/10">
            Go to Lectures Page
          </Button>
        </Link>
      </div>

      {/* CourseTab Component with Enhanced Styling */}
      <div className="mt-6 p-6 rounded-xl shadow-2xl backdrop-blur-sm bg-transparent border border-white/20 hover:border-white/50">
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
