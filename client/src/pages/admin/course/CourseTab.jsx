/* eslint-disable no-unused-vars */
import { Banner } from "@/components/banner";
import getGenerativeAIResponse from "../../../../scripts/aistudio"; // AI script for course description and subtitle generation
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
import { categories } from "@/data/categories";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useDeleteCourseMutation,
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
  const [isGenerating, setIsGenerating] = useState(false); // Loading state for AI generation
  const [isGeneratingSubtitle, setIsGeneratingSubtitle] = useState(false); // Loading state for subtitle generation
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const [publishCourse] = usePublishCourseMutation();
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const handleDeleteCourse = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await deleteCourse(courseId).unwrap();
      toast.success("Course deleted successfully!");

      // Navigate to the course page (adjust the URL as needed)
      navigate(`/courses/${courseId}`); // Redirect to the course page with the deleted courseId
    } catch (error) {
      toast.error("Failed to delete the course. Please try again.");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const savedData = JSON.parse(
        localStorage.getItem(`courseData-${courseId}`)
      );

      if (savedData) {
        setInput(savedData);
      } else {
        const { data: refetchedData } = await refetch();
        if (refetchedData?.course) {
          const course = refetchedData.course;
          const newData = {
            courseTitle: course.courseTitle,
            subTitle: course.subTitle || "",
            description: course.description || "",
            category: course.category || "",
            courseLevel: course.courseLevel || "",
            coursePrice: course.coursePrice || "",
            courseThumbnail: "",
          };
          setInput(newData);
          localStorage.setItem(
            `courseData-${courseId}`,
            JSON.stringify(newData)
          );
        }
      }
    };

    initializeData();
  }, [courseId, refetch]);

  useEffect(() => {
    // Save form data to local storage whenever input changes
    localStorage.setItem(`courseData-${courseId}`, JSON.stringify(input));
  }, [input]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      localStorage.setItem(`courseData-${courseId}`, JSON.stringify(input));
    }, 300); // Debounce by 300ms

    return () => clearTimeout(debounceTimeout);
  }, [input, courseId]);

  useEffect(() => {
    const syncDataAcrossTabs = (e) => {
      if (e.key === `courseData-${courseId}`) {
        setInput(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", syncDataAcrossTabs);
    return () => window.removeEventListener("storage", syncDataAcrossTabs);
  }, [courseId]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const isFormValid = () => {
    return (
      input.courseTitle &&
      input.subTitle &&
      input.description &&
      input.category &&
      input.courseLevel &&
      input.coursePrice &&
      input.courseThumbnail
    );
  };
  const handleUpdateCourse = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await editCourse({ formData, courseId });
      refetch();
      //toast.success("Changes saved successfully!");
    } catch {
      toast.error("Failed to update course.");
    }
  };
  const toggleTitleVisibility = () => {
    setIsTitleVisible((prev) => !prev);
  };

  const handleGenerateDescription = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Generate a concise and engaging course description for the course titled: "${input.courseTitle}".`;
      const generatedDescription = await getGenerativeAIResponse(prompt);
      setInput({ ...input, description: generatedDescription });
      toast.success("Course description generated successfully!");
    } catch (error) {
      if (error.message.includes("quota")) {
        toast.error("Quota exceeded. Please try again later.");
      } else {
        toast.error("Failed to generate course description.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateSubtitle = async () => {
    try {
      setIsGeneratingSubtitle(true);

      const prompt = `Create a compelling subtitle for the course titled "${input.courseTitle}". The subtitle should be clear, engaging, and give a strong sense of what the course is about, without including unnecessary explanations or introductory phrases.`;

      const data = await getGenerativeAIResponse(prompt);

      // Log the raw response for debugging
      console.log("AI Response:", data);

      // Clean the response
      let cleanedText = data
        .replace(/^'|'$/g, "") // Remove enclosing quotes
        // eslint-disable-next-line no-useless-escape
        .replace(/[*#>\-\[\]]/g, "") // Remove symbols like *, #, >, -, [, ]
        .replace(/^\s+|\s+$/g, ""); // Trim whitespace from start and end

      // Extract meaningful line
      const lines = cleanedText.split("\n").map((line) => line.trim());
      const meaningfulLine = lines.find(
        (line) => line && !line.startsWith("Here are") && !line.includes(":")
      );

      if (meaningfulLine) {
        setInput({ ...input, subTitle: meaningfulLine });
        toast.success("Subtitle generated successfully!");
      } else {
        toast.error(
          "Failed to extract a meaningful subtitle. Please try again."
        );
      }
    } catch (error) {
      console.error("Error generating subtitle:", error);
      toast.error("Failed to generate subtitle. Please try again.");
    } finally {
      setIsGeneratingSubtitle(false);
    }
  };

  const handlePublishStatus = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
        if (action === "true") {
          localStorage.removeItem(`courseData-${courseId}`);
        }
      }
    } catch {
      toast.error("Failed to publish or unpublish course.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successfully.");
      //window.location.reload();
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course.");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card className="p-4 md:p-6 bg-black shadow-lg border border-red-500/50 backdrop-blur-sm">
      <CardHeader className="flex flex-col md:flex-row md:justify-between text-white">
        <div>
          <CardTitle className="text-lg md:text-xl text-shadow-md font-bold">
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
            className={`transition-all bg-transparent text-white border-red-500 hover:bg-white hover:text-black hover:shadow-[0_0_10px_red]`}
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button
            onClick={handleDeleteCourse}
            className="bg-red-600 hover:bg-white hover:text-black text-white transition-all hover:shadow-[0_0_10px_red]"
          >
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Notification Bar */}
        {!courseByIdData?.course.isPublished && (
          <Banner
            variant={"warning"}
            label="Your changes have been saved, but the course is not yet published."
            className="text-sm md:text-base py-2 md:py-3"
          />
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5">
          {/* Toggle Button and Title Section */}
          <div className="col-span-1 md:col-span-2">
            <button
              onClick={toggleTitleVisibility}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all hover:shadow-[0_0_10px_red]"
            >
              {isTitleVisible ? "Hide Title" : "Update Title"}
            </button>
            {isTitleVisible && (
              <div className="mt-4">
                <h2 className="text-lg font-bold text-white">Course Title</h2>
                <Input
                  type="text"
                  name="courseTitle"
                  value={input.courseTitle}
                  onChange={changeEventHandler}
                  placeholder="Enter course title"
                  className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-red-500 mt-2"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-white">Subtitle</Label>
            <Button
              onClick={handleGenerateSubtitle}
              disabled={isGeneratingSubtitle}
              className="bg-red-600 hover:bg-white hover:text-black text-white transition-all hover:shadow-[0_0_10px_red]"
            >
              {isGeneratingSubtitle ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                "Generate Subtitle"
              )}
            </Button>
          </div>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack Developer"
            className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-red-500"
          />
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Label className="text-white">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
            <div className="mt-2 flex items-center gap-2">
              <Button
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="bg-red-600 hover:bg-white hover:text-black text-white transition-all hover:shadow-[0_0_10px_red]"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  "Generate Description"
                )}
              </Button>
            </div>
          </div>
          <div>
            <Label className="text-white">Category</Label>
            <Select
              defaultValue={input.category}
              onValueChange={selectCategory}
              className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-red-500"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((cat, index) => (
                    <SelectItem key={index} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white">Course Level</Label>
            <Select
              defaultValue={input.courseLevel}
              onValueChange={selectCourseLevel}
              className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-red-500"
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
              onChange={changeEventHandler}
              placeholder="Ex. 5000"
              className="text-white bg-transparent border-white/20 focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Label className="text-white">Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
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
          className="hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] text-white bg-transparent border border-white/40 transition-all hover:bg-white hover:text-black hover:border-red-500"
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
