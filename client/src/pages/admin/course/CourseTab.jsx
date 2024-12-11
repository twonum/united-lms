/* eslint-disable no-unused-vars */
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();
  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const {
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
      } = courseByIdData.course;
      setInput({
        courseTitle,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const handleUpdateCourse = async () => {
    if (
      !input.courseTitle ||
      !input.subTitle ||
      !input.description ||
      !input.category ||
      !input.courseLevel ||
      !input.coursePrice
    ) {
      return toast.error("All fields are required!");
    }

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      formData.append(key, input[key]);
    });

    try {
      await editCourse({ formData, courseId });
      toast.success("Course updated successfully.");
      refetch();
    } catch (err) {
      toast.error("Failed to update course.");
    }
  };

  const handlePublishStatus = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response?.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch {
      toast.error("Failed to publish or unpublish course.");
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success("Course updated successfully.");
    if (error) toast.error("Failed to update course.");
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card className="p-4 md:p-6 bg-transparent shadow-lg border border-white/10 backdrop-blur-sm">
      <CardHeader className="flex flex-col md:flex-row md:justify-between text-white">
        <div>
          <CardTitle className="text-lg md:text-xl text-shadow-md">
            Basic Course Information
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-opacity-75">
            Make changes to your courses here. Click save when you&apos;re done.
          </CardDescription>
        </div>
        <div className="mt-4 space-x-2 flex flex-wrap md:mt-0">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              handlePublishStatus(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
            className="hover:bg-white/20 transition-all"
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="hover:bg-white/20 transition-all">
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
          <div>
            <Label className="text-white">Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={handleInputChange}
              placeholder="Ex. Fullstack Developer"
              className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <Label className="text-white">Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={handleInputChange}
              placeholder="Ex. Become a Fullstack Developer"
              className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Label className="text-white">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div>
            <Label className="text-white">Category</Label>
            <Select
              defaultValue={input.category}
              onValueChange={(value) => handleSelectChange("category", value)}
              className="text-white bg-transparent border-white/20"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
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
          <div>
            <Label className="text-white">Course Level</Label>
            <Select
              defaultValue={input.courseLevel}
              onValueChange={(value) =>
                handleSelectChange("courseLevel", value)
              }
              className="text-white bg-transparent border-white/20"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white">Price (PKR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={handleInputChange}
              placeholder="Ex. 5000"
              className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Label className="text-white">Course Thumbnail</Label>
            <Input
              type="file"
              onChange={handleThumbnailChange}
              accept="image/*"
              className="bg-transparent border-white/20"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="mt-4 w-full max-w-md object-cover rounded-md border-2 border-white/30"
                alt="Course Thumbnail"
              />
            )}
          </div>
        </div>
      </CardContent>
      <div className="flex justify-end gap-4 p-4">
        <Button
          disabled={isLoading}
          onClick={handleUpdateCourse}
          className="hover:bg-pink-600 text-white bg-black disabled:bg-blue-700"
        >
          {isLoading ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default CourseTab;
