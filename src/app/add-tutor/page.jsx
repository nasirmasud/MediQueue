"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DatePicker } from "@/components/ui/DatePicker";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SUBJECTS = [
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Pathology",
  "General Medicine",
];

const TEACHING_MODES = ["Online", "Offline", "Both"];

const FIELDS = [
  {
    name: "tutorName",
    label: "Tutor Full Name",
    placeholder: "Enter your full name",
    md: 2,
  },
  {
    name: "subject",
    kind: "select",
    label: "Subject / Category",
    placeholder: "Select subject",
    options: SUBJECTS,
  },
  {
    name: "image",
    label: "Profile Image URL",
    placeholder: "https://example.com/photo.jpg",
    type: "url",
    lg: 2,
  },
  {
    name: "availability",
    label: "Availability (Days & Time)",
    placeholder: "Sun - Thu, 5:00 PM",
  },
  {
    name: "hourlyFee",
    label: "Hourly Fee (BDT)",
    placeholder: "500",
    type: "number",
    min: "0",
  },
  {
    name: "totalSlot",
    label: "Total Slots",
    placeholder: "10",
    type: "number",
    min: "1",
  },
  { name: "startDate", kind: "date", label: "Session Start Date" },
  {
    name: "teachingMode",
    kind: "select",
    label: "Teaching Mode",
    placeholder: "Select mode",
    options: TEACHING_MODES,
  },
  { name: "district", label: "District / City", placeholder: "Your district or city" },
  {
    name: "address",
    label: "Specific Area / Address",
    placeholder: "Give a detailed address",
    md: 2,
  },
  {
    name: "institution",
    label: "Institution",
    placeholder: "Chittagong Medical College",
    md: 2,
  },
  {
    name: "experienceYears",
    label: "Experience (Years)",
    placeholder: "3",
    type: "number",
    min: "0",
  },
];

const spanClass = ({ md, lg }) =>
  [md === 2 && "md:col-span-2", lg === 2 && "lg:col-span-2"]
    .filter(Boolean)
    .join(" ");

function FieldControl({ field }) {
  if (field.kind === "select") {
    return (
      <Select
        id={field.name}
        name={field.name}
        required
        placeholder={field.placeholder}
      >
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    );
  }

  if (field.kind === "date") {
    return <DatePicker id={field.name} name={field.name} required />;
  }

  return (
    <Input
      id={field.name}
      name={field.name}
      type={field.type ?? "text"}
      min={field.min}
      required
      placeholder={field.placeholder}
    />
  );
}

const AddTutorPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tutorData = Object.fromEntries(formData.entries());

    tutorData.email = session?.user?.email;
    tutorData.addedBy = session?.user?.name;

    const toastId = toast.loading("Adding tutor...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tutorData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Something went wrong");

      toast.success("Tutor added successfully!", { id: toastId });
      router.push("/tutors");
    } catch (err) {
      toast.error(err.message || "Failed to add tutor", { id: toastId });
    }
  };

  return (
    <Section tone="surface" spacing="lg">
      <div className="mx-auto w-full max-w-5xl">
        <div className="max-w-2xl">
          <Eyebrow>Mentor Studio</Eyebrow>
          <h1 className="mt-3 text-headline-lg text-on-surface">
            Become a MediQueue Expert Tutor
          </h1>
          <p className="mt-2 text-body-md text-on-surface-variant">
            Fill out the information below to publish a tutor profile students can book.
          </p>
        </div>

        <Card padding="none" shadow="md" className="mt-8">
          <form onSubmit={onSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {FIELDS.map((field) => (
                <div key={field.name} className={spanClass(field)}>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-label-md text-on-surface"
                  >
                    {field.label}
                  </label>
                  <FieldControl field={field} />
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-outline-variant/30 pt-6">
              <Button type="submit" size="lg" shape="pill" block>
                Add Tutor
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
};

export default AddTutorPage;
