/* eslint-disable no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import StarryBackground from "@/components/StarryBackground"; // Import the StarryBackground

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError)
    return (
      <h1 className="text-white text-3xl text-center">
        Some error occurred while fetching courses.
      </h1>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Dynamic Starry Background */}
      <StarryBackground />
      <div className="absolute inset-0 z-10 bg-transparent">
        {/* Content Area */}
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="font-bold text-4xl md:text-5xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#7B00FF] to-[#3A00A3] animate__animated animate__fadeIn animate__delay-1s transform scale-105 animate__pulse">
            Our Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))
              : data?.courses &&
                data.courses.map((course, index) => (
                  <Course key={index} course={course} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

// Enhanced Course Skeleton Loader
const CourseSkeleton = () => {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 rounded-lg overflow-hidden backdrop-blur-md p-2">
      <Skeleton className="w-full h-36 rounded-lg" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
