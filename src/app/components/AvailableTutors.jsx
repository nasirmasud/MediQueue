import TutorCard from "../components/TutorCard";

const AvailableTutors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`, {
    cache: "no-store"
  });
  const tutors = await res.json();

  return (
    <div className="w-full bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 transition-colors duration-200">

      {/* Top Hero Heading Section */}
      <div className="py-12 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-[#1e1b4b] dark:text-zinc-100">
          Find Your Perfect Expert Tutor
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Book expert tutors, attend live sessions, and achieve your academic goals with MediQueue.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pb-16 space-y-10">



        {/* Tutors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tutors?.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>




      </div>
    </div>
  );
};

export default AvailableTutors;