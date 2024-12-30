/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 bg-transparent text-white p-6 rounded-lg shadow-lg backdrop-blur-md">
      <div className="mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-shadow-md">
          Let&apos;s add lectures! Add basic details for your new lecture.
        </h1>
        <p className="text-sm md:text-base text-opacity-75">
          Add your lectures and organize your course effectively. Keep it
          concise and clear.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg text-white">Lecture Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter lecture title"
            className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-[#00F798] placeholder:text-white/60"
          />
        </div>
        <div className="flex items-center gap-4 justify-between">
          <Button
            variant="outline"
            onClick={() => {
              navigate(`/admin/course/${courseId}`);
              window.location.reload(); // Reloads the page after navigation
            }}
            className="text-white border-white/30 hover:border-white/50 transition-all rounded-lg"
          >
            Back to Course
          </Button>

          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="bg-lime-600 text-white hover:bg-lime-800 disabled:bg-gray-600 rounded-lg transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        <div className="mt-10 space-y-4">
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-400">Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p className="text-yellow-400">No lectures available.</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
