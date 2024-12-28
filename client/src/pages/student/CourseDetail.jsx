// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
  if (isError || !data?.course)
    return (
      <h1 className="text-center text-red-600">
        Failed to load course details
      </h1>
    );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    navigate(`/course-progress/${courseId}`);
  };

  const handleApplyForAid = () => {
    navigate(`/apply-for-aid/${courseId}`);
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      {/* Course Header */}
      <div className="relative text-white bg-none backdrop-blur-md bg-opacity-60">
        <div className="max-w-7xl mx-auto py-12 px-6 text-center">
          <h1 className="font-extrabold text-4xl md:text-5xl">
            {course?.courseTitle || "Course Title"}
          </h1>
          <p className="text-lg text-gray-200 mt-2">Course Sub-title</p>
          <p className="text-gray-300 mt-4">
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name || "Unknown Creator"}
            </span>
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-400 mt-4">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0] || "N/A"}</p>
            <p>Students enrolled: {course?.enrolledStudents.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto my-10 px-6 flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-8">
          <h1 className="font-bold text-2xl text-white">Description</h1>
          <p
            className="text-sm text-gray-300"
            dangerouslySetInnerHTML={{
              __html: course.description || "No description available.",
            }}
          />

          <Card className="bg-opacity-80 backdrop-blur-md border border-white rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Course Content</CardTitle>
              <CardDescription className="text-gray-400">
                {course.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.lectures?.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {purchased ? <PlayCircle size={14} /> : <Lock size={14} />}
                    <p>{lecture.lectureTitle}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No lectures available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="bg-opacity-80 backdrop-blur-md border border-white rounded-xl shadow-lg">
            <CardContent>
              <div className="w-full aspect-video mb-6">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures?.[0]?.videoUrl || ""}
                  controls
                  className="rounded-md"
                />
              </div>
              <h1 className="text-xl text-white font-semibold">
                {course.lectures?.[0]?.lectureTitle || "No Lecture Available"}
              </h1>
              <Separator className="my-3 border-gray-300" />
              <h1 className="text-lg font-semibold">
                Course Price:{" "}
                <span className="text-[#FFC107]">
                  Rs. {course.coursePrice || "Free"}
                </span>
              </h1>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all"
                >
                  Continue Course
                </Button>
              ) : (
                <>
                  <BuyCourseButton courseId={courseId} />
                  <Button
                    onClick={handleApplyForAid}
                    className="ml-2 w-full bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all"
                  >
                    Apply for Aid
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
