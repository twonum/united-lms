/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";
import { useLoadUserQuery } from "@/features/api/authApi";

const CourseProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Queries and Mutations
  const { data: userData, isLoading: isUserLoading } = useLoadUserQuery();
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse] = useCompleteCourseMutation();
  const [inCompleteCourse] = useInCompleteCourseMutation();

  // Local State
  const [currentLecture, setCurrentLecture] = useState(null);
  const user = userData?.user;

  const handleGetCertificate = () => {
    navigate(`/get-certificate/${courseId}`);
  };

  // Effects for Success Messages
  useEffect(() => {
    if (completeCourse.isSuccess || inCompleteCourse.isSuccess) {
      refetch();
      toast.success(
        completeCourse.isSuccess
          ? completeCourse.data.message
          : inCompleteCourse.data.message
      );
    }
  }, [completeCourse.isSuccess, inCompleteCourse.isSuccess]);

  // Loading/Error States
  if (isLoading || isUserLoading)
    return <p className="text-white text-center">Loading...</p>;
  if (isError)
    return (
      <p className="text-red-500 text-center">Failed to load course details</p>
    );

  // Data Extraction
  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  const initialLecture = currentLecture || courseDetails.lectures?.[0];

  // Helper Functions
  const isLectureCompleted = (lectureId) =>
    progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCourseCompletion = async () => {
    if (completed) await inCompleteCourse(courseId);
    else await completeCourse(courseId);
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Course Header */}
        <div className="flex justify-between items-center mb-6 bg-black/60 backdrop-blur-md rounded-lg p-4 shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {courseTitle}
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={handleCourseCompletion}
              className="border-2 border-transparent text-white hover:border-white hover:bg-pink-600 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.6)] transition-shadow duration-300 disabled:opacity-50"
            >
              {completed ? (
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Completed</span>
                </div>
              ) : (
                "Mark as Completed"
              )}
            </Button>
            {completed && (
              <Button
                onClick={handleGetCertificate}
                className="bg-emerald-600 text-white hover:bg-teal-700"
              >
                Get Certificate
              </Button>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Video Section */}
          <div className="flex-1 bg-black/60 backdrop-blur-md rounded-lg shadow-lg p-6">
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
            <h3 className="text-lg font-semibold text-white mt-4">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              }: ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>

          {/* Lecture Sidebar */}
          <div className="flex flex-col w-full md:w-2/5 bg-black/60 backdrop-blur-md rounded-lg shadow-lg p-6">
            <h2 className="font-bold text-xl text-white mb-4">
              Course Lectures
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[60vh]">
              {courseDetails?.lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`mb-3 cursor-pointer transition-transform ${
                    lecture._id === currentLecture?._id
                      ? "bg-teal-950 shadow-lg"
                      : "hover:bg-emerald-200/40 hover:scale-89"
                  }`}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2
                          size={24}
                          className="text-green-400 mr-3"
                        />
                      ) : (
                        <CirclePlay size={24} className="text-gray-400 mr-3" />
                      )}
                      <CardTitle className="text-lg font-medium text-white">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant="outline"
                        className="bg-green-200/80 text-green-800"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
