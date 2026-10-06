import { Button, Card } from '@heroui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiBookOpen, FiBriefcase, FiCalendar, FiClock, FiHeart, FiLayers, FiMapPin } from 'react-icons/fi'

const TutorCard = ({ tutor }) => {
  const { _id, image, tutorName, teachingMode, institution, subject, availability, totalSlot, startDate, address, district, hourlyFee } = tutor

  return (
    <Card
      className="p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
    >
      <div>
        {/* Upper row: Avatar & Basic Title */}
        <div className="flex items-start gap-4">
          <Image
            src={image || "https://via.placeholder.com/150"}
            alt={tutorName}
            height={100}
            width={100}
            className="rounded-full object-cover border-2 border-indigo-100 dark:border-zinc-700"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900 dark:text-zinc-100 truncate">
                {tutorName}
              </h3>
              <button className="text-gray-400 hover:text-red-500 transition p-1">
                <FiHeart className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
              {teachingMode} Mode
            </p>
          </div>
        </div>

        {/* Institution Section */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800/60">
          <p className="text-sm font-medium text-gray-700 dark:text-zinc-300 flex items-center gap-2">
            <FiBriefcase className="text-indigo-500 flex-shrink-0" />
            <span className="truncate">{institution}</span>
          </p>
        </div>

        {/* Details Meta Data Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 text-xs text-gray-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <FiBookOpen className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <span className="truncate"><strong>Subject:</strong> {subject}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <span className="truncate"><strong>Time:</strong> {availability}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiLayers className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <span><strong>Slots:</strong> {totalSlot} Left</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <span><strong>Starts:</strong> {startDate}</span>
          </div>
        </div>

        {/* Location / Address badge */}
        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800/50 p-2 rounded-xl">
          <FiMapPin className="text-green-700 flex-shrink-0 text-xl" />
          <span className="truncate">{address}, {district}</span>
        </div>
      </div>

      {/* Bottom Row: Price & Booking Action */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Hourly Fee</p>
          <p className="text-lg font-black text-gray-900 dark:text-zinc-100 flex items-center">
            ৳{hourlyFee} <span className="text-xs font-normal text-gray-500 ml-0.5">/hr</span>
          </p>
        </div>

        <Link href={`/tutors/${_id}`}>
          <Button
            className="bg-[#4f46e5] hover:bg-[#4338ca] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold rounded-full px-5 h-10 text-sm transition-all shadow-sm flex items-center justify-center"
          >
            Book Session
          </Button></Link>
      </div>
    </Card>
  )
}

export default TutorCard
