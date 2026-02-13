import Image from "next/image";
import HomeHeroSection from "./component/HomeHeroSection";
import HomeFeaturedListings from "./component/HomeFeaturedListings";
import HomePopularAreas from "./component/HomePopularAreas";
import HomeTestimonials from "./component/HomeTestimonial";
import HomePartners from "./component/HomePartners";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeFeaturedListings />
      <HomePopularAreas />
      <HomeTestimonials />
      <HomePartners />
    </>
  );
}
