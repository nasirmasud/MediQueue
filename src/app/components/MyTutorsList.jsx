"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/components/ui/cn";
import {
  Award,
  GraduationCap,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const FIELDS = [
  { label: "Tutor Name", key: "tutorName", half: true },
  { label: "Subject", key: "subject", half: true },
  { label: "Hourly Fee (BDT)", key: "hourlyFee", type: "number", half: true },
  { label: "Experience (Years)", key: "experienceYears", type: "number", half: true },
  { label: "Availability", key: "availability", half: true },
  { label: "Teaching Mode", key: "teachingMode", half: true },
  { label: "District / City", key: "district", half: true },
  { label: "Institution", key: "institution", half: true },
  { label: "Total Slots", key: "totalSlot", type: "number", half: true },
  { label: "Profile Image URL", key: "image" },
  { label: "Address", key: "address" },
];

const META_ICON = "size-4 shrink-0";

export default function MyTutorsList({ initialTutors }) {
  const [tutors, setTutors] = useState(initialTutors);
  const [editingTutor, setEditingTutor] = useState(null);
  const [deletingTutor, setDeletingTutor] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openEditModal = (tutor) => {
    setEditingTutor(tutor);
    setFormData({
      tutorName: tutor.tutorName,
      subject: tutor.subject,
      hourlyFee: tutor.hourlyFee,
      availability: tutor.availability,
      teachingMode: tutor.teachingMode,
      district: tutor.district,
      address: tutor.address,
      institution: tutor.institution,
      experienceYears: tutor.experienceYears,
      image: tutor.image,
      totalSlot: tutor.totalSlot,
    });
  };

  const handleUpdate = async () => {
    const toastId = toast.loading("Updating tutor...");
    setIsSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${editingTutor._id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (data.modifiedCount > 0) {
        setTutors((prev) =>
          prev.map((t) =>
            t._id === editingTutor._id ? { ...t, ...formData } : t
          )
        );
        setEditingTutor(null);
        toast.success("Tutor updated successfully!", { id: toastId });
      } else {
        toast.error("No changes were made.", { id: toastId });
      }
    } catch {
      toast.error("Failed to update tutor.", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting tutor...");
    setIsDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${deletingTutor._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        setTutors((prev) => prev.filter((t) => t._id !== deletingTutor._id));
        setDeletingTutor(null);
        toast.success("Tutor deleted successfully!", { id: toastId });
      } else {
        toast.error("Failed to delete tutor.", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {tutors.map((tutor) => (
          <Card
            key={tutor._id}
            padding="md"
            shadow="sm"
            className="card-lift flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 items-center gap-4">
              <Avatar
                src={tutor.image}
                name={tutor.tutorName}
                alt=""
                size="md"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <h3 className="truncate text-headline-sm text-on-surface">
                  {tutor.tutorName}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1 text-body-md text-primary">
                  <GraduationCap aria-hidden="true" className="size-3.5 shrink-0" />
                  {tutor.subject || "Medical Expert"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-body-md text-on-surface-variant sm:flex-row sm:items-center sm:gap-6">
              <span className="flex items-center gap-2">
                <Award className={cn(META_ICON, "text-outline")} />
                {tutor.experienceYears || 2}+ years
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className={cn(META_ICON, "text-outline")} />
                {tutor.teachingMode || "Online"} mode
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-outline-variant/30 pt-3 sm:border-t-0 sm:pt-0">
              <div>
                <span className="block text-label-sm uppercase text-outline">Hourly Fee</span>
                <span className="text-headline-md text-on-surface tabular">
                  ৳{tutor.hourlyFee}
                  <span className="text-label-md font-normal text-on-surface-variant">
                    /hr
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditModal(tutor)}>
                  <Pencil aria-hidden="true" className="size-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeletingTutor(tutor)}
                  className="border-error/40 text-error hover:bg-error/10"
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Sheet
        open={Boolean(editingTutor)}
        onClose={() => setEditingTutor(null)}
        title="Update Tutor Info"
        description="Changes go live on your public profile straight away."
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setEditingTutor(null)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIELDS.map(({ label, key, type = "text", half }) => (
            <div key={key} className={half ? "" : "sm:col-span-2"}>
              <label
                htmlFor={`tutor-${key}`}
                className="mb-1.5 block text-label-md text-on-surface"
              >
                {label}
              </label>
              <Input
                id={`tutor-${key}`}
                type={type}
                value={formData[key] ?? ""}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, [key]: event.target.value }))
                }
              />
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet
        open={Boolean(deletingTutor)}
        onClose={() => setDeletingTutor(null)}
        title="Delete this listing?"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeletingTutor(null)}
              disabled={isDeleting}
            >
              Keep listing
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Yes, delete"}
            </Button>
          </>
        }
      >
        <p className="text-body-md text-on-surface-variant">
          <span className="font-bold text-on-surface">
            {deletingTutor?.tutorName}
          </span>{" "}
          will be removed from MediQueue along with its bookings. This can&apos;t be
          undone.
        </p>
      </Sheet>
    </>
  );
}
