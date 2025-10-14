import Image from "next/image";
import Banner from "./components/Banner"
import WhyChoose from "./components/WhyChoose"
import JobOpenings from "./components/JobOpenings"
import RecruitmentProcess from "./components/RecruitmentProcess"
// import RecruitmentTimeline from "./components/RecruitmentTimeline"
// import StickyFooter from "./components/StickyFooter"

export default function Home() {
  return (
    <>
    <Banner/>
    <RecruitmentProcess />
    {/* <RecruitmentTimeline /> */}
    <JobOpenings />
    <WhyChoose />
     {/* <StickyFooter /> */}
    </>
  );
}
