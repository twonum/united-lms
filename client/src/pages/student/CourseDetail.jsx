/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import StarryBackground from "@/components/StarryBackground"; // Add the StarryBackground component

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Starry Background */}
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      {/* Hero Section */}
      <div className="relative bg-none text-white backdrop-blur-md bg-opacity-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("/path-to-your-starry-background.jpg")', // Ensure to update path
          }}
        ></div>
        <div className="max-w-7xl mx-auto py-12 px-6 md:px-8 relative z-10 text-center">
          <h1 className="font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
            {course?.courseTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-4">
            Course Sub-title
          </p>
          <p className="text-gray-300">
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-400 mt-4">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
            <p>Students enrolled: {course?.enrolledStudents.length}</p>
          </div>
        </div>
      </div>

      {/* Course Description and Content Section */}
      <div className="max-w-7xl mx-auto my-10 px-6 md:px-8 flex flex-col lg:flex-row justify-between gap-12">
        <div className="w-full lg:w-2/3 space-y-8">
          <h1 className="font-bold text-2xl text-white mb-6">Description</h1>
          <p
            className="text-sm text-gray-300 mb-8"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg bg-transparent">
            <CardHeader>
              <CardTitle className="text-white">Course Content</CardTitle>
              <CardDescription className="text-gray-400">
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.lectures.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-gray-400"
                >
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Video and Pricing Section */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg bg-transparent">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-6">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1 className="text-white text-xl font-semibold mb-2">
                {course.lectures[0].lectureTitle}
              </h1>
              <Separator className="my-3 border-gray-300" />
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Course Price: ${course.price}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-black border-2 border-white text-white hover:border-white focus:ring-2 focus:ring-white rounded-md transition-all duration-300 ease-in-out hover:scale-105"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
