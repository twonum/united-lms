/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import StarryBackground from "@/components/StarryBackground";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated successfully.");
      setIsDialogOpen(false); // Close the dialog on success
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile.");
    }
  }, [isSuccess, isError, error, updateUserData]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    if (!name || !profilePhoto) {
      setErrorMessage("Please enter both name and profile photo.");
      return;
    }

    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);

    await updateUser(formData);
  };

  if (isLoading)
    return <h1 className="text-center text-white">Loading profile...</h1>;

  const user = data?.user;

  if (!user) {
    return <h1 className="text-center text-white">No user data found.</h1>;
  }

  return (
    <div className="relative min-h-screen">
      <StarryBackground />

      <div className="max-w-4xl mx-auto px-4 my-10 relative z-10">
        <h1 className="font-bold text-2xl text-center md:text-left text-white mb-8">
          Profile
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 border-4 border-white shadow-xl">
              <AvatarImage
                className="object-cover rounded-full"
                src={user.photoUrl || "https://github.com/shadcn.png"}
                alt={user.name || "Default Avatar"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-4 md:w-2/3 bg-transparent bg-opacity-70 backdrop-blur-md p-6 rounded-lg border border-white shadow-lg">
            <ProfileInfo label="Name" value={user.name || "Not available"} />
            <ProfileInfo label="Email" value={user.email || "Not available"} />
            <ProfileInfo
              label="Role"
              value={user.role?.toUpperCase() || "Not assigned"}
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="mt-2 bg-transparent border-2 border-white text-white hover:bg-lime-700 hover:text-black"
                >
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-transparent border-white rounded-lg shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Edit Profile</DialogTitle>
                  <DialogDescription className="text-white">
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-white">Name</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="col-span-3 bg-transparent border-2 border-white text-white focus:ring-0 focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-white">Profile Photo</Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3 bg-transparent border-2 border-white text-white"
                    />
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
                <DialogFooter>
                  <Button
                    disabled={updateUserIsLoading}
                    onClick={updateUserHandler}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {updateUserIsLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div>
          <h2 className="font-medium text-lg text-white">
            Courses You&apos;re Enrolled In
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
            {user.enrolledCourses?.length > 0 ? (
              user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))
            ) : (
              <h3 className="col-span-full text-center text-gray-500">
                You haven&apos;t enrolled in any courses yet.
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({ label, value }) => (
  <div className="mb-2">
    <h1 className="font-semibold text-gray-900 dark:text-gray-100">
      {label}:
      <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
        {value}
      </span>
    </h1>
  </div>
);

export default Profile;
