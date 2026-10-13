"use client";

import React, { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
  TextArea,
  toast,
} from "@heroui/react";
import {
  FaPaperPlane,
  FaBriefcase,
  FaUser,
  FaLink,
  FaFileAlt,
} from "react-icons/fa";
import { submitApplication } from "@/lib/actions/applications";
import { useRouter } from "next/navigation";

const JobApply = ({ applicant, job }) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      jobId: job?._id,
      jobTitle: job?.title,
      companyName: job?.company,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
      applicantId: applicant?.id,
      ...formData,
    };
    console.log("Submitting application:", submissionData);
    setSubmitted(true);

    const res = await submitApplication(submissionData);
    if (res.insertedId) {
      toast.success("Application submitted successfully!");
      setFormData({ resumeLink: "", portfolioLink: "", additionalNotes: "" });
      router.push("/jobs");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Job & Applicant Header */}
      <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <FaBriefcase className="text-primary" /> Apply for {job?.title}
        </h2>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
          <FaUser className="text-zinc-400" />
          <span>
            Applying as: <strong>{applicant?.name || "Applicant"}</strong> (
            {applicant?.email || "No email provided"})
          </span>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Resume Link Field (Required) */}
        <TextField name="resumeLink" isRequired>
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <FaFileAlt className="text-zinc-400" /> Resume Link
          </Label>
          <Input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://example.com/my-resume.pdf"
            className="mt-1"
          />
          <Description className="text-xs text-zinc-500 mt-1">
            Provide a public link to your resume (Google Drive, Dropbox,
            LinkedIn, etc.)
          </Description>
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* Optional Information: Portfolio / Website */}
        <TextField name="portfolioLink">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <FaLink className="text-zinc-400" /> Portfolio / Website{" "}
            <span className="text-zinc-400 font-normal">(Optional)</span>
          </Label>
          <Input
            type="url"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
            placeholder="https://myportfolio.com"
            className="mt-1"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* Optional Information: Additional Notes using TextArea */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Additional Notes{" "}
            <span className="text-zinc-400 font-normal">(Optional)</span>
          </Label>
          <TextArea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            aria-label="Additional Notes"
            placeholder="Brief message or comments for the hiring manager..."
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Button
            type="submit"
            color="primary"
            className="flex items-center gap-2"
          >
            <FaPaperPlane /> Apply Now
          </Button>
          <Button
            type="reset"
            variant="flat"
            color="default"
            onClick={() =>
              setFormData({
                resumeLink: "",
                portfolioLink: "",
                additionalNotes: "",
              })
            }
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobApply;
