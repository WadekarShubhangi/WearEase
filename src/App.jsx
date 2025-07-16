import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryCard from "./components/CategoryCard";
import HeroComponent from "./components/HeroComponent";
import NewArrival from "./components/NewArrival";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="container-md">
        <CategoryCard />
        <HeroComponent />
        <section className="collection">
          <div className="row">
            <div className="col-md-6 col-12">
              <NewArrival image="https://images.unsplash.com/photo-1727107047534-99afc152baf7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>

            <div className="col-md-6 col-12">
              <NewArrival image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
