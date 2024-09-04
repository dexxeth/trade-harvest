import { Graph } from "@/components/graph";
import Trending from "@/components/trending";

const Home = () => {
	return (
		<main className="flex flex-col justify-center px-2 sm:px-2 md:px-4">
			<div className="p-2 sm:px-2 md:px-4">
				<Trending />
			</div>
			<div className="p-2 sm:px-2 md:px-4">
				<Graph />

				hello ayush!
			</div>
		</main>
	);
};

export default Home;
