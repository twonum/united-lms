// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StarryBackground from "@/components/StarryBackground";

const ApplyForAid = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your email-sending logic (e.g., SendGrid or Nodemailer)
    console.log("Form submitted:", formData);
    alert("Your application has been submitted!");
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Starry Background */}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
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
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Email Input */}
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
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Reason Input */}
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
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                ></textarea>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105"
              >
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyForAid;
