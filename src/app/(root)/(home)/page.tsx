import { Graph } from "@/components/graph";
import Trending from "@/components/trending";

const Home = () => {
  return (
    <main className="flex flex-col justify-center px-2 sm:px-2 md:px-4">
      <h1 className="text-xl font-bold m-4 overflow-hidden">
        Government Schemes
      </h1>
      <div className="p-2 sm:px-2 md:px-4">
        <Trending />
      </div>
      <h1 className="text-xl font-bold m-4 overflow-hidden">Crops</h1>
      <div className="p-2 sm:px-2 md:px-4">
        <Graph />
      </div>
      <h1 className="text-xl font-bold m-4 overflow-hidden">Fruits</h1>
      <div className="p-2 sm:px-2 md:px-4">
        <Graph />
      </div>
      <h1 className="text-xl font-bold m-4 overflow-hidden">Spices</h1>
      <div className="p-2 sm:px-2 md:px-4">
        <Graph />
      </div>
    </main>
  );
};

export default Home;
