import Link from "next/link";

const Logo = () => {
	return (
		<Link href="/">
			<div className="top-0 shadow-white/20 shadow-sm bg-[#101010] w-full h-fit text-white text-lg p-2">
				Trade Harvest
			</div>
		</Link>
	);
};

export default Logo;
