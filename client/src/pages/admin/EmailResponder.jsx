/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StarryBackground from "@/components/StarryBackground";
import Swal from "sweetalert2";

const EmailResponder = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [canSubmit, setCanSubmit] = useState(true); // Prevent resubmission for 10 minutes

  const defaultMessage = `Congratulations {recipientName},

Your financial aid application has been approved! We are delighted to support you in your journey. Please let us know if you have any questions or require further assistance.

Best regards,
[Your Organization Name]`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      Swal.fire({
        title: "You can only send one email every 10 minutes.",
        text: "Please wait before trying again.",
        icon: "warning",
        timer: 4000,
        showConfirmButton: false,
      });
      return; // Prevent submission if within 10 minutes
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const personalizedMessage = defaultMessage.replace(
      "{recipientName}",
      formData.recipientName
    );

    const formPayload = new FormData();
    formPayload.append("access_key", "d5e71c26-c571-44c9-a647-d1d7307f3567");
    formPayload.append("email", formData.recipientEmail);
    formPayload.append("subject", "Financial Aid Application Approved");
    formPayload.append("message", personalizedMessage);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Email Sent!",
          text: "The approval email has been sent successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        setSuccess("Email sent successfully!");
        setFormData({ recipientName: "", recipientEmail: "" });

        // Lock form submission for 10 minutes
        setCanSubmit(false);
        setTimeout(() => {
          setCanSubmit(true); // Allow resubmission after 10 minutes
        }, 10 * 60 * 1000); // 10 minutes in milliseconds

        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Starry Background */}
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      <div className="flex justify-center items-center min-h-screen px-6 md:px-8">
        <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl bg-transparent w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-white text-center text-3xl font-extrabold tracking-wide">
              Financial Aid Approval Email
            </CardTitle>
          </CardHeader>
          <Separator className="my-4 border-gray-500" />
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
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

              {/* Success/Error Message */}
              {success && (
                <p className="text-green-500 text-center font-semibold">
                  {success}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center font-semibold">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !canSubmit} // Disable button when loading or resubmission is locked
                className="w-full py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105"
              >
                {loading ? "Sending..." : "Send Approval Email"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailResponder;
