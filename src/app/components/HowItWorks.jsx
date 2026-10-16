"use client";

import { Calendar, Search, Video } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
            How MediQueue Works
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-zinc-400 font-normal">
            Your journey to academic medical excellence is just three simple steps away.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Step 1 */}
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-900 text-center transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6 shadow-sm">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              1. Find Your Specialist
            </h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-normal leading-relaxed">
              Browse through our pool of verified medical mentors. Filter easily by specific subjects or medical colleges.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-900 text-center transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6 shadow-sm">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              2. Select Date & Book
            </h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-normal leading-relaxed">
              Check the tutor&apos;s real-time availability start date, fill in your information, and securely request a custom session.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center p-6 bg-gray-50 dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-900 text-center transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6 shadow-sm">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              3. Start Live Learning
            </h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-normal leading-relaxed">
              Access your personalized dashboard to track routes, connect instantly on schedule, and unlock medical mastery.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}