import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Hero />
      <SearchBar />
      <Stats />
      <FeaturedProperties />
      <Footer />
    </div>
  );
}

export default Home;