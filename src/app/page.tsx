import Image from "next/image";
import Banner from "./components/Banner"
import WhyChoose from "./components/WhyChoose"
import JobOpenings from "./components/JobOpenings"


export default function Home() {
  return (
    <>
    <Banner/>
    <JobOpenings />
    <WhyChoose />
    
    </>
  );
}
