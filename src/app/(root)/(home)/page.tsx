import { Graph } from "@/components/graph";
import Trending from "@/components/trending";

const Home = () => {
	return (
		<main className="flex flex-col justify-center px-4 mb-16">
			<h1 className="text-xl font-bold my-2">
				Government Schemes
			</h1>
			<Trending />
			<h1 className="text-xl font-bold my-2">Crops</h1>
			<Graph />
			<h1 className="text-xl font-bold my-2">Fruits</h1>
			<Graph />
			<h1 className="text-xl font-bold my-2">Spices</h1>
			<Graph />
		</main>
	);
};

export default Home;
