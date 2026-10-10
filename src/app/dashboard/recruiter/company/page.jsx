"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Button,
  FieldError,
  toast,
} from "@heroui/react";
import {
  FaBuilding,
  FaLocationDot,
  FaGlobe,
  FaCloudArrowUp,
  FaPenToSquare,
  FaCircleCheck,
  FaClock,
  FaCircleXmark,
  FaCirclePlus,
} from "react-icons/fa6";
import Image from "next/image";
import { createCompany } from "@/lib/actions/companies";

// File size limit in bytes (5 MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// --- ImgBB API Helper Function ---
async function uploadToImgBB(file) {
  if (!file) return null;

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_UPLOAD_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_IMGBB_UPLOAD_API_KEY in environment variables.",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.success) {
    return data.data.url; // Permanent hosted ImgBB URL
  } else {
    throw new Error(data.error?.message || "Failed to upload logo to ImgBB");
  }
}

// --- Style Utility Classes ---
const labelClass = "block text-sm font-medium text-zinc-200 mb-1.5";
const inputClass =
  "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-600 transition-colors text-sm";
const triggerClass =
  "w-full bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 text-sm flex items-center justify-between";
const popoverClass =
  "bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden text-zinc-100 mt-1";

// --- Constants ---
const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance & Banking" },
  { value: "healthcare", label: "Healthcare & Life Sciences" },
  { value: "design", label: "Design & Creative" },
  { value: "marketing", label: "Marketing & Sales" },
  { value: "education", label: "Education" },
];

const EMPLOYEE_RANGES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

export default function CompanyProfile({
  initialCompany = null,
  onSaveCompany,
}) {
  const [company, setCompany] = useState(initialCompany);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // File upload, validation, and preview state
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(initialCompany?.logoUrl || "");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate File Size (Must be 5MB or smaller)
    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 5MB limit.");
      setSelectedFile(null);
      return;
    }

    setFileError("");
    setSelectedFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileError) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      let logoUrl = company?.logoUrl || "";

      // 1. Upload to ImgBB API if user selected a new file
      if (selectedFile) {
        logoUrl = await uploadToImgBB(selectedFile);
      }

      // 2. Prepare payload
      const newCompanyData = {
        name: formData.get("name"),
        industry: formData.get("industry"),
        website: formData.get("website"),
        location: formData.get("location"),
        employeeCount: formData.get("employeeCount"),
        description: formData.get("description"),
        logoUrl: logoUrl,
        status: company?.status || "Pending",
      };

        console.log(newCompanyData);
        
        
        // 3. Persist through callback
        if (onSaveCompany) {
            await onSaveCompany(newCompanyData);
        }
        const payload = await createCompany(newCompanyData);
        if (payload.insertedId) {
            toast.success("Company profile created successfully!")
        }

      setCompany(newCompanyData);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save company details:", err);
      alert(err.message || "Failed to save company details");
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FaCircleCheck className="text-sm" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <FaCircleXmark className="text-sm" /> Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FaClock className="text-sm" /> Pending Approval
          </span>
        );
    }
  };

  // -------------------------------------------------------------
  // STATE 1: NO COMPANY REGISTERED YET
  // -------------------------------------------------------------
  if (!company && !showForm) {
    return (
      <div className="w-full max-w-4xl mx-auto p-10 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-6">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-zinc-400">
          <FaBuilding className="text-3xl" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">
            No company registered yet
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Please register your company details to enable job postings and
            manage applicant submissions.
          </p>
        </div>
        <Button
          className="bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors inline-flex items-center gap-2"
          onPress={() => setShowForm(true)}
        >
          <FaCirclePlus className="text-base" /> Register Company
        </Button>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STATE 2: DISPLAY REGISTERED COMPANY DETAILS
  // -------------------------------------------------------------
  if (company && !showForm) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
        <div className="flex items-start justify-between border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            {company.logoUrl ? (
              <div className="relative w-16 h-16 rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400">
                <FaBuilding className="text-2xl" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  {company.name}
                </h2>
                {renderStatusBadge(company.status)}
              </div>
              <p className="text-sm text-zinc-400 capitalize">
                {company.industry}
              </p>
            </div>
          </div>
          <Button
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
            onPress={() => setShowForm(true)}
          >
            <FaPenToSquare /> Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <span className="text-zinc-500 text-xs block mb-1">Location</span>
            <span className="text-zinc-200 flex items-center gap-2">
              <FaLocationDot className="text-zinc-400" />{" "}
              {company.location || "N/A"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <span className="text-zinc-500 text-xs block mb-1">Employees</span>
            <span className="text-zinc-200 flex items-center gap-2">
              <FaBuilding className="text-zinc-400" />{" "}
              {company.employeeCount || "N/A"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <span className="text-zinc-500 text-xs block mb-1">Website</span>
            {company.website ? (
              <a
                href={
                  company.website.startsWith("http")
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-2 truncate"
              >
                <FaGlobe /> {company.website}
              </a>
            ) : (
              <span className="text-zinc-400">N/A</span>
            )}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium text-zinc-300">
            About the Company
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">
            {company.description || "No description provided."}
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STATE 3: FORM VIEW (REGISTER / EDIT MODE)
  // -------------------------------------------------------------
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {company ? "Edit Company Information" : "Register Company"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Fill in your company details and upload your logo.
          </p>
        </div>
        {company?.status && renderStatusBadge(company.status)}
      </div>

      <Form onSubmit={handleSubmit} className="space-y-6">
        {/* ROW 1: Company Name & Industry */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField isRequired name="name" defaultValue={company?.name || ""}>
            <Label className={labelClass}>Company Name</Label>
            <Input placeholder="e.g. Acme Corp" className={inputClass} />
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>

          <Select
            isRequired
            name="industry"
            defaultValue={company?.industry || "technology"}
            placeholder="Select industry"
          >
            <Label className={labelClass}>Industry / Category</Label>
            <Select.Trigger className={triggerClass}>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className={popoverClass}>
              <ListBox className="p-1">
                {INDUSTRIES.map((ind) => (
                  <ListBox.Item
                    key={ind.value}
                    id={ind.value}
                    textValue={ind.label}
                    className="px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg cursor-pointer"
                  >
                    {ind.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </Select>
        </div>

        {/* ROW 2: Website URL & Location */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField name="website" defaultValue={company?.website || ""}>
            <Label className={labelClass}>Website URL</Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs text-zinc-500 border-r border-zinc-800 pr-2">
                https://
              </span>
              <Input
                placeholder="www.company.com"
                className={`${inputClass} pl-20`}
              />
            </div>
          </TextField>

          <TextField
            isRequired
            name="location"
            defaultValue={company?.location || ""}
          >
            <Label className={labelClass}>Location</Label>
            <div className="relative flex items-center">
              <FaLocationDot className="absolute left-3.5 text-zinc-500" />
              <Input
                placeholder="City, Country"
                className={`${inputClass} pl-10`}
              />
            </div>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </TextField>
        </div>

        {/* ROW 3: Employee Count Range & Logo Upload */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Select
            isRequired
            name="employeeCount"
            defaultValue={company?.employeeCount || "1-10"}
          >
            <Label className={labelClass}>Employee Count Range</Label>
            <Select.Trigger className={triggerClass}>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className={popoverClass}>
              <ListBox className="p-1">
                {EMPLOYEE_RANGES.map((range) => (
                  <ListBox.Item
                    key={range.value}
                    id={range.value}
                    textValue={range.label}
                    className="px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800 rounded-lg cursor-pointer"
                  >
                    {range.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
            <FieldError className="text-xs text-rose-500 mt-1" />
          </Select>

          <div>
            <Label className={labelClass}>Company Logo</Label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer flex items-center gap-3 border border-dashed border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 rounded-xl p-3 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                  <FaCloudArrowUp className="text-xl" />
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-200 block">
                    Upload image
                  </span>
                  <span className="text-[11px] text-zinc-500 block">
                    PNG, JPG up to 5MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {logoPreview && !fileError && (
                <div className="relative w-14 h-14 shrink-0 rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900">
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    fill
                    className="object-cover"
                    unoptimized={logoPreview.startsWith("blob:")}
                  />
                </div>
              )}
            </div>
            {fileError && (
              <p className="text-xs text-rose-500 mt-1.5">{fileError}</p>
            )}
          </div>
        </div>

        {/* ROW 4: Brief Description */}
        <TextField name="description" defaultValue={company?.description || ""}>
          <Label className={labelClass}>Brief Description</Label>
          <TextArea
            rows={4}
            placeholder="Tell us about your company's mission and culture..."
            className={inputClass}
          />
        </TextField>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          {company && (
            <Button
              type="button"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              onPress={() => setShowForm(false)}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            isPending={loading}
            className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {company ? "Save Changes" : "Submit Registration"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
