import { createPageMetadata, PAGE_TITLES } from "@/lib/site-metadata";
import AvailableTutors from "./components/AvailableTutors";
import CollegeRail from "./components/CollegeRail";
import Faq from "./components/Faq";
import FilterBar from "./components/FilterBar";
import FinalCta from "./components/FinalCta";
import HowItWorks from "./components/HowItWorks";
import LiveClassroom from "./components/LiveClassroom";
import ProfTracks from "./components/ProfTracks";
import Slider from "./components/Slider";
import SubjectTracks from "./components/SubjectTracks";
import Testimonials from "./components/Testimonials";
import Toolkits from "./components/Toolkits";
import TrustMetrics from "./components/TrustMetrics";
import TutorRecruit from "./components/TutorRecruit";
import { TutorFilterProvider } from "./components/TutorFilterContext";
import WhyChooseUs from "./components/WhyChooseUs";

export const metadata = createPageMetadata(PAGE_TITLES.home);

export default function Home() {
  return (
    <TutorFilterProvider>
      <Slider />
      <FilterBar />
      <TrustMetrics />
      <SubjectTracks />
      <AvailableTutors />
      <HowItWorks />
      <LiveClassroom />
      <CollegeRail />
      <ProfTracks />
      <Testimonials />
      <WhyChooseUs />
      <Toolkits />
      <Faq />
      <TutorRecruit />
      <FinalCta />
    </TutorFilterProvider>
  );
}
