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
        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNeflixOriginals}
        />
        <Row title="Now Playing" fetchUrl={requests.fetchNowPlaying} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      </div>

      <Footer />
    </>
  );
}
