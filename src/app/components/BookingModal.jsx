"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DatePicker } from "@/components/ui/DatePicker";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/components/ui/cn";
import { authClient } from "@/lib/auth-client";
import { toBookingDateISO } from "@/lib/booking-date";
import { fetchTutorBookings } from "@/lib/tutor-bookings-api.client";
import { Calendar, CircleDollarSign, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_API_URL;

const decreaseSlot = (tutorId) =>
  fetch(`${API}/tutors/${tutorId}/decrease-slot`, { method: "PATCH" });

const BookingModal = ({ tutorData }) => {
  const {
    _id: tutorId,
    image,
    tutorName,
    hourlyFee,
    availability,
    startDate: tutorStartDate,
  } = tutorData;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const defaultDateString = tutorStartDate || "2026-05-25";
  const [selectedDate, setSelectedDate] = useState(defaultDateString);

  const handleConfirmBooking = async () => {
    if (!selectedDate) return toast.error("Select a valid date for booking.");
    if (!user) return toast.error("Please log in first to book an appointment.");

    const bookingDate = toBookingDateISO(selectedDate);
    if (!bookingDate) {
      return toast.error("Select a valid date for booking.");
    }

    const bookingData = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      tutorId,
      image,
      tutorName,
      fee: hourlyFee,
      bookingDate,
    };

    setIsLoading(true);
    try {
      const res = await fetchTutorBookings("", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err?.message || "Booking failed, please try again.");
        return;
      }

      const slotRes = await decreaseSlot(tutorId);
      if (!slotRes.ok) {
        const err = await slotRes.json();
        console.error("Slot error:", err.message);
      }

      toast.success("Your appointment booking was successful!");
      setIsOpen(false);
    } catch (error) {
      console.error("Booking Error:", error);
      if (error.message === "Unauthorized") {
        toast.error("Please log in first to book an appointment.");
        return;
      }
      toast.error("Failed to connect to the server!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="primary"
        size="lg"
        shape="pill"
        block
        className="h-14 text-label-lg"
      >
        Book Appointment Now
      </Button>

      <Sheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Your Appointment"
        description="Review the details and pick your preferred date."
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              disabled={isLoading}
              className="min-w-[9.5rem]"
            >
              {isLoading ? "Confirming..." : "Confirm Booking"}
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <Card tone="surface" shadow="none" padding="md">
            <div className="space-y-3 text-body-md">
              <InfoRow label="Tutor Name" value={tutorName} bold />
              <InfoRow label="Availability" value={availability} icon={<Clock />} />
              <InfoRow
                label="Hourly Fee"
                value={`৳${hourlyFee}/hr`}
                icon={<CircleDollarSign />}
                valueClass="text-primary tabular font-bold"
              />
            </div>
          </Card>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="booking-date"
              className="flex items-center gap-1.5 text-label-md text-on-surface"
            >
              <Calendar aria-hidden="true" className="size-4 text-primary" />
              Session Start Date
            </label>
            <DatePicker
              id="booking-date"
              name="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </div>
        </div>
      </Sheet>
    </>
  );
};

const InfoRow = ({ label, value, icon, bold, valueClass = "" }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="flex items-center gap-1.5 text-on-surface-variant [&>svg]:size-4 [&>svg]:shrink-0">
      {icon}
      {label}:
    </span>
    <span
      className={cn(
        "text-right font-medium text-on-surface",
        bold && "font-bold",
        valueClass
      )}
    >
      {value}
    </span>
  </div>
);

export default BookingModal;
