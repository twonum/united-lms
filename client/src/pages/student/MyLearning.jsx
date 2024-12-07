/* eslint-disable no-unused-vars */
import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import StarryBackground from "@/components/StarryBackground"; // Optional, if you want to add the dynamic background

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />

      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl font-bold text-center md:text-left mb-8 text-white">
          My Learning
        </h1>

        <div className="my-5">
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearning.length === 0 ? (
            <p className="text-center text-gray-500">
              You are not enrolled in any courses.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {myLearning.map((course, index) => (
                <Course key={index} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse shadow-md"
      ></div>
    ))}
  </div>
);
