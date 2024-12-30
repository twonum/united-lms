/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import Course from "./Course";
import StarryBackground from "@/components/StarryBackground";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError)
    return (
      <h1 className="text-white text-3xl text-center">
        Some error occurred while fetching courses.
      </h1>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const renderCarousels = () => {
    if (isLoading) {
      return (
        <Slider {...settings}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="px-4">
              <CourseSkeleton />
            </div>
          ))}
        </Slider>
      );
    }

    return (
      <Slider {...settings}>
        {data?.courses?.map((course) => (
          <div key={course._id} className="px-4">
            <Course course={course} />
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <StarryBackground />
      <div className="absolute inset-0 z-10 bg-transparent">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Heading Section */}
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Explore Our Courses
          </h2>

          {renderCarousels()}

          {/* Call-to-Action Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h3>
            <button className="px-6 py-3 text-lg font-semibold rounded-md border border-white text-white hover:bg-white hover:text-black transition-all">
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CustomArrow = ({ direction, onClick }) => (
  <div
    className={`absolute z-10 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer shadow-lg p-3 rounded-md border border-white ${
      direction === "next" ? "right-4" : "left-4"
    }
    hover:bg-white hover:text-black transition-all`}
    onClick={onClick}
  >
    {direction === "next" ? "\u276F" : "\u276E"} {/* Unicode for arrows */}
  </div>
);

// Enhanced Course Skeleton Loader
const CourseSkeleton = () => {
  return (
    <div className="bg-transparent border border-white shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 rounded-lg overflow-hidden p-4 flex flex-col space-y-4">
      {/* Image Placeholder */}
      <Skeleton className="w-full h-40 rounded-lg" />

      {/* Title Placeholder */}
      <div className="px-4">
        <Skeleton className="h-6 w-3/4" />
      </div>

      {/* Details Section */}
      <div className="px-4 space-y-3">
        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="px-4 mt-auto">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};
