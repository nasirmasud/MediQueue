import {
  Armchair,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  Heart,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/components/ui/cn";

const META_ICON = "size-4 shrink-0";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    image,
    tutorName,
    teachingMode,
    institution,
    subject,
    availability,
    totalSlot,
    startDate,
    address,
    district,
    hourlyFee,
  } = tutor;

  const noSlots = Number(totalSlot) === 0;

  return (
    <Card
      tone='surface'
      shadow='md'
      padding='sm'
      className='flex flex-col justify-between group transition-all hover:bg-surface-container'
    >
      <div>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3.5 min-w-0'>
            <Avatar src={image} name={tutorName} alt='' size='md' status='tertiary' />
            <div className='min-w-0'>
              <h3 className='text-headline-sm text-on-surface flex items-center gap-1.5'>
                <span className='truncate'>{tutorName}</span>
                <BadgeCheck aria-hidden='true' className='size-[17px] shrink-0 text-tertiary' />
              </h3>
              <div className='flex items-center gap-1.5 mt-0.5'>
                <span className='w-2 h-2 shrink-0 rounded-full bg-tertiary' />
                <span className='text-label-sm text-tertiary'>{teachingMode} Mode</span>
              </div>
            </div>
          </div>
          <button
            type='button'
            aria-label='Favorite tutor'
            className='w-8 h-8 shrink-0 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors'
          >
            <Heart className='size-[18px]' />
          </button>
        </div>

        <div className='mt-4 pt-3 space-y-2'>
          <div className='flex items-center gap-2 text-primary text-label-md'>
            <Building2 className='size-[18px] shrink-0' />
            <span className='truncate'>{institution}</span>
          </div>
          <div className='grid grid-cols-2 gap-2 text-on-surface-variant text-body-sm'>
            <div className='flex items-center gap-1.5'>
              <BookOpen className={cn(META_ICON, "text-outline")} />
              <span className='truncate'>Subject: {subject}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock className={cn(META_ICON, "text-outline")} />
              <span className='truncate'>{availability}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Armchair className={cn(META_ICON, noSlots ? "text-error" : "text-outline")} />
              <span className={cn(noSlots ? "text-error font-medium" : "truncate")}>
                Slots: {totalSlot} Left
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
              <CalendarDays className={cn(META_ICON, "text-outline")} />
              <span className='truncate'>Starts: {startDate}</span>
            </div>
          </div>
          <div className='flex items-center gap-1.5 text-on-surface-variant text-body-sm pt-1'>
            <MapPin className={cn(META_ICON, "text-primary")} />
            <span className='truncate'>
              {address}, {district}
            </span>
          </div>
        </div>
      </div>

      <div className='mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-2'>
        <div className='min-w-0'>
          <span className='text-label-sm text-outline uppercase block'>Hourly Fee</span>
          <span className='text-headline-md text-on-surface tabular'>
            ৳{hourlyFee}{" "}
            <span className='text-label-md font-normal text-on-surface-variant'>/hr</span>
          </span>
        </div>
        <Button as={Link} href={`/tutors/${_id}`} variant='primary' size='md'>
          Book Session
        </Button>
      </div>
    </Card>
  );
};

export default TutorCard;
