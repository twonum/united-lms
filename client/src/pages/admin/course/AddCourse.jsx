/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // Clipboard copy handler
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(courseTitle)
      .then(() => {
        toast.success("Title copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy title.");
      });
  };

  // Display toast on success
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center px-4 py-6 sm:px-6 lg:px-12 bg-transparent backdrop-blur-xl rounded-lg">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Add a New Course
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            Enter the basic details to create a new course.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 p-6 bg-white bg-opacity-60 rounded-lg shadow-md backdrop-blur-xl">
          {/* Title */}
          <div className="relative">
            <Label htmlFor="course-title" className="block text-gray-700">
              Title
            </Label>
            <Input
              id="course-title"
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter course name"
              className="mt-2 w-full p-3 pr-12 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Button
              className="absolute top-2 right-2 z-10"
              variant="outline"
              size="icon"
              onClick={handleCopyToClipboard}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="block text-gray-700">
              Category
            </Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="mt-2 w-full min-w-[180px] p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="Fullstack Development">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN Stack Development">
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6 space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/course")}
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-purple-600 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
