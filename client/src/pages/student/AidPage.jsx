/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StarryBackground from "@/components/StarryBackground";
import Swal from "sweetalert2";

const ApplyForAid = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true); // Controls whether form can be submitted
  const [timeoutId, setTimeoutId] = useState(null); // To clear the timeout if needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      Swal.fire({
        title: "You can only apply once every 10 minutes.",
        text: "Please wait before trying again.",
        icon: "warning",
        timer: 4000,
        showConfirmButton: false,
      });
      return; // Prevent submission if it's within 10 minutes
    }

    setIsSubmitting(true); // Set submitting state to true
    setCanSubmit(false); // Disable form submission temporarily

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "d5e71c26-c571-44c9-a647-d1d7307f3567");
      formPayload.append("email", formData.email);
      formPayload.append("subject", "Financial Aid Application");
      formPayload.append(
        "message",
        `Applicant Name: ${formData.name}\nReason: ${formData.reason}`
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        Swal.fire({
          title: "Application Submitted",
          text: "Your financial aid application has been successfully submitted!",
          icon: "success",
          timer: 3000, // 3 seconds for Swal to stay open
          showConfirmButton: false,
        });

        // Clear form after submission
        setFormData({ name: "", email: "", reason: "" });

        // Lock form submission for 10 minutes
        setTimeout(() => {
          setCanSubmit(true); // Allow submission again after 10 minutes
        }, 10 * 60 * 1000); // 10 minutes in milliseconds
      } else {
        // Error message if the API returns an error
        Swal.fire({
          title: "Error",
          text: data.message || "Something went wrong. Please try again.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      // Catch any network or other errors
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting your application. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      <div className="flex justify-center items-center min-h-screen px-6 md:px-8">
        <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg bg-transparent w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl font-bold">
              Apply for Financial Aid
            </CardTitle>
          </CardHeader>
          <Separator className="my-4 border-gray-500" />
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:border-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:border-white"
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-300"
                >
                  Why do you need financial aid?
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:border-white"
                ></textarea>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !canSubmit} // Disable button while submitting or when resubmission is not allowed
                className="w-full py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyForAid;
