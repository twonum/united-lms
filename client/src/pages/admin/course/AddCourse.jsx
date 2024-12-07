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
import { Loader2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { categories } from "@/data/categories";

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

  // Display toast on success
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  // Memoized category items to avoid re-renders
  const categoryItems = useMemo(
    () =>
      categories.map((category) => (
        <SelectItem key={category} value={category}>
          {category}
        </SelectItem>
      )),
    []
  );

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
          <div>
            <Label htmlFor="course-title" className="block text-gray-700">
              Title
            </Label>
            <Input
              id="course-title"
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Enter course name"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
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
                  {categoryItems}
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
              className="w-full sm:w-auto border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
