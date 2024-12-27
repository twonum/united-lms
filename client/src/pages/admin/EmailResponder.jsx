// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StarryBackground from "@/components/StarryBackground";

const EmailResponder = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.recipientEmail,
          subject: "Aid Application Status",
          body: `Dear ${formData.recipientName},\n\n${formData.message}\n\nBest regards,\nYour Support Team`,
        }),
      });

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error sending email:", errorData.error);
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email.");
    }
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
              Email Responder
            </CardTitle>
          </CardHeader>
          <Separator className="my-4 border-gray-500" />
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipient Name Input */}
              <div>
                <label
                  htmlFor="recipientName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Recipient Email Input */}
              <div>
                <label
                  htmlFor="recipientEmail"
                  className="block text-sm font-medium text-gray-300"
                >
                  Recipient Email
                </label>
                <input
                  type="email"
                  id="recipientEmail"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
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
                Send Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailResponder;
