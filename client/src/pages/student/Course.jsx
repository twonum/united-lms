/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <div className="relative min-h-screen bg-transparent">
      <Link to={`/course-detail/${course._id}`}>
        <Card className="overflow-hidden rounded-lg bg-transparent border border-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out backdrop-blur-md bg-opacity-60">
          {/* 3D card background effect */}
          <div className="relative group">
            <img
              src={course.courseThumbnail}
              alt="course"
              className="w-full h-36 object-cover rounded-t-lg transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3d"
            />
          </div>
          <CardContent className="px-5 py-4 space-y-3">
            <h1 className="font-semibold text-lg truncate transition-all duration-300 ease-in-out text-white">
              {course.courseTitle}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-[#00F798] transform transition-all duration-300 ease-in-out hover:scale-110">
                  <AvatarImage
                    src={
                      course.creator?.photoUrl ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm text-gray-300">
                  {course.creator?.name}
                </h1>
              </div>
              <Badge className="bg-emerald-900 text-white px-3 py-1 text-xs rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110">
                {course.courseLevel}
              </Badge>
            </div>
            <div className="text-xl font-semibold text-white">
              <span>Rs. {course.coursePrice}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Course;
