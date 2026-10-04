"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowLeft,
} from "react-icons/fi";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { createJobs } from "@/lib/actions/jobs";

// Shared class strings and option lists (constants, not components)
const labelClass = "mb-1.5 text-sm font-medium text-zinc-300";
const inputClass =
  "w-full rounded-xl border border-zinc-800 bg-[#222225] text-white placeholder:text-zinc-500 hover:border-zinc-700 [color-scheme:dark]";
const iconClass =
  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500";
const triggerClass =
  "rounded-xl border border-zinc-800 bg-[#222225] text-white hover:border-zinc-700";
const popoverClass = "border border-zinc-800 bg-[#222225] text-white";
const hintClass = "mt-1 text-xs text-zinc-500";

const CATEGORIES = [
  { value: "technology", label: "Technology & Software" },
  { value: "design", label: "Design & Creative" },
  { value: "marketing", label: "Marketing & Sales" },
  { value: "product", label: "Product Management" },
  { value: "finance", label: "Finance & Operations" },
];

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD ($)" },
];

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isRemote, setIsRemote] = useState(false);

  // Mock company state. Load from your session/API in a real app.
  const [companyInfo] = useState({
    id: "company_123",
    name: "Acme Corp",
    isApproved: true,
  });

  const canPost = companyInfo.isApproved;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    // Read every named field from the form
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Cross-field check that a single field's validate() can't do
    if (Number(data.salaryMax) < Number(data.salaryMin)) {
      toast.danger("Invalid salary range", {
        description: "Max salary must be greater than or equal to min salary.",
      });
      return;
    }

    setLoading(true);

    const payload = {
      title: data.title,
      category: data.category,
      type: data.jobType,
      salary: {
        min: Number(data.salaryMin),
        max: Number(data.salaryMax),
        currency: data.currency,
      },
      isRemote,
      location: isRemote ? "Remote" : data.location,
      deadline: data.deadline,
      description: {
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        benefits: data.benefits,
      },
      companyId: companyInfo.id,
      company: companyInfo.name,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    try {
      // const res = await fetch("/api/jobs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("Failed to create job");

      const res = await createJobs(payload);

      if (res.insertedId) {
        toast.success("Job published", {
          description: "Your listing is now live on HireLoop.",
        });
        router.push("/dashboard/recruiter/jobs");
      }
    } catch (err) {
      toast.danger("Failed to publish job", {
        description: err.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center p-4 text-zinc-100 sm:p-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#161618] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-6 sm:p-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Post a New Job
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Create a job listing to find candidates for your team on HireLoop.
            </p>
          </div>
          <Button
            isIconOnly
            variant="ghost"
            aria-label="Go back"
            onPress={() => router.back()}
          >
            <FiArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Company status banner */}
        <div className="space-y-4 border-b border-zinc-800 bg-[#1a1a1d] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/80 p-3">
              <FiBriefcase className="h-6 w-6 text-zinc-200" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Posting as Company
              </p>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-white">
                  {companyInfo.name}
                </h3>
                {companyInfo.isApproved ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-800/40 bg-emerald-950/40 px-2 py-0.5 text-xs text-emerald-400">
                    <FiCheckCircle className="h-3 w-3" /> Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-800/40 bg-amber-950/40 px-2 py-0.5 text-xs text-amber-400">
                    <FiAlertTriangle className="h-3 w-3" /> Pending Approval
                  </span>
                )}
              </div>
            </div>
          </div>

          {!companyInfo.isApproved && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-sm text-amber-300">
              <FiInfo className="h-5 w-5 shrink-0" />
              <span>
                Your company profile is under review. Job postings will be
                enabled once approved.
              </span>
            </div>
          )}
        </div>

        {/* Main form: `inert` disables the whole form until the company is approved */}
        <Form
          onSubmit={handleSubmit}
          inert={!canPost}
          className={`space-y-10 p-6 sm:p-8 ${!canPost ? "opacity-50" : ""}`}
        >
          {/* SECTION 1: Job info */}
          <fieldset className="w-full space-y-6">
            <legend className="mb-2 text-lg font-medium text-white">
              Job Info
            </legend>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Job title */}
              <TextField
                isRequired
                name="title"
                validate={(value) =>
                  value.trim().length < 3
                    ? "Title must be at least 3 characters"
                    : null
                }
              >
                <Label className={labelClass}>Job Title</Label>
                <Input
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputClass}
                />
                <FieldError />
              </TextField>

              {/* Category */}
              <Select
                isRequired
                name="category"
                placeholder="Select a category"
              >
                <Label className={labelClass}>Job Category</Label>
                <Select.Trigger className={triggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={popoverClass}>
                  <ListBox>
                    {CATEGORIES.map((o) => (
                      <ListBox.Item
                        key={o.value}
                        id={o.value}
                        textValue={o.label}
                      >
                        {o.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError />
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Job type */}
              <Select isRequired name="jobType" defaultValue="full-time">
                <Label className={labelClass}>Job Type</Label>
                <Select.Trigger className={triggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={popoverClass}>
                  <ListBox>
                    {JOB_TYPES.map((o) => (
                      <ListBox.Item
                        key={o.value}
                        id={o.value}
                        textValue={o.label}
                      >
                        {o.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError />
              </Select>

              {/* Deadline */}
              <TextField
                isRequired
                name="deadline"
                type="date"
                validate={(value) =>
                  value < new Date().toISOString().slice(0, 10)
                    ? "Deadline can't be in the past"
                    : null
                }
              >
                <Label className={labelClass}>Application Deadline</Label>
                <div className="relative">
                  <FiCalendar className={iconClass} />
                  <Input className={`${inputClass} pl-9`} />
                </div>
                <Description className={hintClass}>
                  Last day candidates can apply.
                </Description>
                <FieldError />
              </TextField>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* Min salary */}
              <TextField
                isRequired
                name="salaryMin"
                type="number"
                validate={(value) =>
                  Number(value) <= 0 ? "Enter a positive amount" : null
                }
              >
                <Label className={labelClass}>Min Salary</Label>
                <div className="relative">
                  <FiDollarSign className={iconClass} />
                  <Input
                    placeholder="e.g. 80000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <FieldError />
              </TextField>

              {/* Max salary */}
              <TextField
                isRequired
                name="salaryMax"
                type="number"
                validate={(value) =>
                  Number(value) <= 0 ? "Enter a positive amount" : null
                }
              >
                <Label className={labelClass}>Max Salary</Label>
                <div className="relative">
                  <FiDollarSign className={iconClass} />
                  <Input
                    placeholder="e.g. 120000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
                <FieldError />
              </TextField>

              {/* Currency */}
              <Select isRequired name="currency" defaultValue="USD">
                <Label className={labelClass}>Currency</Label>
                <Select.Trigger className={triggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={popoverClass}>
                  <ListBox>
                    {CURRENCIES.map((o) => (
                      <ListBox.Item
                        key={o.value}
                        id={o.value}
                        textValue={o.label}
                      >
                        {o.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                <FieldError />
              </Select>
            </div>

            {/* Location + remote toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={labelClass}>Location</span>

                <Switch isSelected={isRemote} onChange={setIsRemote}>
                  <Switch.Content>
                    <Switch.Control>
                      <Switch.Thumb />
                    </Switch.Control>
                    <span className="text-xs font-medium text-zinc-400">
                      Remote Position
                    </span>
                  </Switch.Content>
                </Switch>
              </div>

              {!isRemote && (
                <TextField isRequired name="location" aria-label="Location">
                  <div className="relative">
                    <FiMapPin className={iconClass} />
                    <Input
                      placeholder="City, Country (e.g. San Francisco, USA)"
                      className={`${inputClass} pl-9`}
                    />
                  </div>
                  <FieldError />
                </TextField>
              )}
            </div>
          </fieldset>

          <hr className="w-full border-zinc-800" />

          {/* SECTION 2: Job description */}
          <fieldset className="w-full space-y-6">
            <legend className="mb-2 text-lg font-medium text-white">
              Job Description
            </legend>

            <TextField isRequired name="responsibilities">
              <Label className={labelClass}>Responsibilities</Label>
              <TextArea
                rows={4}
                placeholder="List core duties and day-to-day responsibilities..."
                className={inputClass}
              />
              <FieldError />
            </TextField>

            <TextField isRequired name="requirements">
              <Label className={labelClass}>Requirements</Label>
              <TextArea
                rows={4}
                placeholder="List required skills, experience level, and qualifications..."
                className={inputClass}
              />
              <FieldError />
            </TextField>

            <TextField name="benefits">
              <Label className={labelClass}>Benefits (Optional)</Label>
              <TextArea
                rows={3}
                placeholder="e.g. Health insurance, 401(k) matching, flexible hours, learning budget..."
                className={inputClass}
              />
            </TextField>
          </fieldset>

          {/* Footer actions */}
          <div className="flex w-full items-center justify-end gap-3 border-t border-zinc-800 pt-6">
            <Button
              type="button"
              variant="danger-soft"
              onPress={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" isPending={loading}>
              Publish Job Posting
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
