import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Row from "@/components/Row";
import requests from "./api/requests";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />

      <div className="my-4">
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      </div>

      <Footer />
    </>
  );
}
