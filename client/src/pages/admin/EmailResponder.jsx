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

const EmailResponder = () => {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
  });
  const [aiValue, setAiValue] = useState(""); // For AI-generated message
  const [input, setInput] = useState({ content: "" }); // For RichTextEditor
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Generate a professional and engaging email message for the recipient named "${formData.recipientName}" regarding financial aid approval.`;
      const generatedMessage = await getGenerativeAIResponse(prompt);

      // Clean the response
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

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Starry Background */}
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      <div className="flex justify-center items-center min-h-screen px-6 md:px-8">
        <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl bg-transparent w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-white text-center text-3xl font-extrabold tracking-wide">
              AI-Powered Email Responder
            </CardTitle>
          </CardHeader>
          <Separator className="my-4 border-gray-500" />
          <CardContent>
            <form className="space-y-6">
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

              {/* AI-Generated Message Preview */}
              {aiValue && (
                <div className="w-full h-96 max-h-96 rounded-md bg-white overflow-y-scroll p-3 relative mt-4 text-muted-foreground">
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

              {/* Generate Button */}
              <Button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="w-full py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105"
              >
                {isGenerating ? "Generating..." : "Generate AI Message"}
              </Button>

              {/* Rich Text Editor */}
              <RichTextEditor input={input} setInput={setInput} />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailResponder;
