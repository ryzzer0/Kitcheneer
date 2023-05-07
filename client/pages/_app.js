import "../styles/globals.css";
import SearchBar from "../components/SearchBar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <SearchBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;