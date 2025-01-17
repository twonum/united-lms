import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-lg font-medium text-white">Loading...</h1>
      </div>
    );

  return (
    <div className="relative p-4 md:p-8 bg-opacity-80 bg-transparent backdrop-blur-xl rounded-lg">
      {/* Persistent Create Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => navigate("create")}
          className="text-white bg-black hover:bg-purple-700 border border-gray-300 hover:border-gray-500 transition duration-300"
          aria-label="Create a new course"
        >
          Create a New Course
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 text-white">
        <h1 className="text-xl font-semibold">My Courses</h1>
      </div>

      {/* Content */}
      {!data?.courses || data.courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg font-medium text-white">
            No courses available yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-full bg-opacity-50 bg-white rounded-lg shadow-lg">
            <TableCaption className="text-gray-800 font-semibold">
              A list of your recent courses.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-white">Price</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-right text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.courses.map((course) => (
                <TableRow
                  key={course._id}
                  className="hover:bg-emerald-900 text-white transition-colors"
                >
                  <TableCell className="font-medium text-white">
                    {course?.coursePrice || "NA"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={course.isPublished ? "success" : "secondary"}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.courseTitle}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`${course._id}`)}
                      className="text-white hover:border-emerald-500 hover:border-2 transition duration-300"
                      aria-label={`Edit ${course.courseTitle}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CourseTable;
