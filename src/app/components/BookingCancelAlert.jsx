"use client";

import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { fetchTutorBookings } from "@/lib/tutor-bookings-api.client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function BookingCancelAlert({ bookingId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelBooking = async () => {
    setIsCancelling(true);
    const toastId = toast.loading("Cancelling booking...");

    try {
      const res = await fetchTutorBookings(`/${bookingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      window.location.reload();

      if (data.deletedCount > 0) {
        toast.success("Booking cancelled successfully!", { id: toastId });
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error("Failed to cancel booking.", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Trash2 aria-hidden="true" className="size-4" />
        Cancel
      </Button>

      <Sheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Cancel this booking?"
        description="The session slot is released and the tutor is notified."
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isCancelling}
            >
              Keep booking
            </Button>
            <Button
              variant="danger"
              onClick={handleCancelBooking}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Yes, cancel booking"}
            </Button>
          </>
        }
      >
        <p className="text-body-md text-on-surface-variant">
          This removes the session from your queue. You can book the tutor again later
          while slots remain.
        </p>
      </Sheet>
    </>
  );
}
