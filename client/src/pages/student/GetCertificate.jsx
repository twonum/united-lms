// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

const GetCertificate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    certificateType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true); // To control the resubmission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateCertificate = () => {
    const doc = new jsPDF();

    // Set up document style
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("Certificate of Completion", 105, 50, { align: "center" });

    doc.setFontSize(16);
    doc.text("This certifies that", 105, 70, { align: "center" });

    doc.setFontSize(24);
    doc.text(formData.name, 105, 90, { align: "center" });

    doc.setFontSize(16);
    doc.text(
      `has successfully completed the ${formData.certificateType} program.`,
      105,
      110,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.text(`Issued to: ${formData.name}`, 105, 130, { align: "center" });
    doc.text(`Email: ${formData.email}`, 105, 140, { align: "center" });
    doc.text(`Certificate Type: ${formData.certificateType}`, 105, 150, {
      align: "center",
    });

    doc.text("Date: " + new Date().toLocaleDateString(), 105, 160, {
      align: "center",
    });

    // Add a border around the certificate (for a more professional look)
    doc.setLineWidth(0.5);
    doc.rect(10, 20, 180, 260);

    // Optionally, add a logo or signature (if available)
    // doc.addImage("logo_url", "PNG", 10, 10, 20, 20); // Example for adding an image/logo

    // Download the generated certificate as a PDF
    doc.save(`${formData.name}_Certificate.pdf`);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) {
      Swal.fire({
        title: "You can only request a certificate once every 10 minutes.",
        text: "Please wait before trying again.",
        icon: "warning",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    setIsSubmitting(true); // Start the submission process
    setCanSubmit(false); // Disable further submissions for 10 minutes

    // Simulate certificate generation process
    setTimeout(() => {
      Swal.fire({
        title: "Certificate Generated",
        text: "Your certificate has been successfully generated. You can now download it.",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      // Generate the certificate after successful submission
      generateCertificate();
      setFormData({ name: "", email: "", certificateType: "" }); // Reset form after generation

      // Re-enable the form submission after 10 minutes
      setTimeout(() => setCanSubmit(true), 600000); // 10 minutes in milliseconds
      setIsSubmitting(false); // Reset the submitting state
    }, 2000); // Simulate a delay of 2 seconds for "processing"
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="flex justify-center items-center min-h-screen px-6 md:px-8">
        <Card className="bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg bg-transparent w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl font-bold">
              Get Your Certificate
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
                  htmlFor="certificateType"
                  className="block text-sm font-medium text-gray-300"
                >
                  Certificate Type
                </label>
                <input
                  type="text"
                  id="certificateType"
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 bg-transparent border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 hover:border-white"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !canSubmit}
                className="w-full py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105"
              >
                {isSubmitting ? "Generating..." : "Get Certificate"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetCertificate;
