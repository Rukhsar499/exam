import Image from "next/image";
import Banner from "./components/Banner"
import WhyChoose from "./components/WhyChoose"
import JobOpenings from "./components/JobOpenings"
import RecruitmentProcess from "./components/RecruitmentProcess"


export default function Home() {
  return (
    <>
    <Banner/>
    <RecruitmentProcess />
    <JobOpenings />
    <WhyChoose />
    
    </>
  );
}
