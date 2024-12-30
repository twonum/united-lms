/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StarryBackground from "@/components/StarryBackground";
import RichTextEditor from "@/components/RichTextEditor";
import Swal from "sweetalert2";
import getGenerativeAIResponse from "../../../scripts/aistudio";
import { Copy } from "lucide-react";

const ApplyForAid = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [aiValue, setAiValue] = useState("");
  const [input, setInput] = useState({ content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Generate a compelling application for financial aid for an applicant named "${formData.name}".`;
      const generatedMessage = await getGenerativeAIResponse(prompt);

      let cleanedText = generatedMessage
        .replace(/^'|'$/g, "")
        // eslint-disable-next-line no-useless-escape
        .replace(/[\*\#]/g, "");
      setAiValue(cleanedText);
    } catch (error) {
      Swal.fire({
        title: "Error Generating Message",
        text: error.message.includes("quota")
          ? "Quota exceeded. Please try again later."
          : "Failed to generate message.",
        icon: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aiValue);
      Swal.fire({
        title: "Copied to Clipboard!",
        text: "The AI-generated message has been successfully copied.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Copy Failed",
        text: "An error occurred while copying the text. Please try again.",
        icon: "error",
      });
    }
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
      return;
    }

    setIsSubmitting(true);
    setCanSubmit(false);

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "d5e71c26-c571-44c9-a647-d1d7307f3567");
      formPayload.append("email", formData.email);
      formPayload.append("subject", "Financial Aid Application");
      formPayload.append("message", input.content || aiValue);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Application Submitted",
          text: "Your financial aid application has been successfully submitted!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        setFormData({ name: "", email: "" });
        setInput({ content: "" });
        setTimeout(() => setCanSubmit(true), 10 * 60 * 1000);
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Something went wrong. Please try again.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting your application. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      <div className="flex justify-center items-center min-h-screen px-6 md:px-8">
        <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg bg-transparent w-full max-w-3xl">
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

              {aiValue && (
                <div className="w-full h-96 max-h-96 rounded-md bg-transparent overflow-y-scroll p-3 relative mt-4 text-muted-foreground">
                  {aiValue}
                  <Button
                    className="absolute top-3 right-3 z-10"
                    variant={"outline"}
                    size={"icon"}
                    onClick={handleCopyToClipboard}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <Button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="w-full py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105"
              >
                {isGenerating ? "Generating..." : "Generate AI Message"}
              </Button>

              <RichTextEditor input={input} setInput={setInput} />

              <Button
                type="submit"
                disabled={isSubmitting || !canSubmit}
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
