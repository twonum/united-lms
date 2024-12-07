/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="flex-1 mx-10 bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between mb-6 text-white">
        <div className="flex items-center gap-4">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-[#00F798] hover:border-[#00F798] transition-all"
            >
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-shadow-md">
            Update Your Lecture
          </h1>
        </div>
      </div>
      <div className="mt-6">
        <LectureTab />
      </div>
    </div>
  );
};

export default EditLecture;
