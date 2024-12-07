/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();

  // Navigate to update lecture page
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex items-center justify-between bg-transparent text-white px-4 py-3 rounded-lg my-4 shadow-md backdrop-blur-sm hover:bg-white/10 transition-all ease-in-out duration-300">
      <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-shadow-md">
        Lecture - {index + 1}: {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={goToUpdateLecture}
        size={22}
        className="cursor-pointer text-white/80 hover:text-[#00F798] transition-all duration-200 ease-in-out hover:scale-105"
      />
    </div>
  );
};

export default Lecture;
