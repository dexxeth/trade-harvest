import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="relative bg-[#101010]">
			<div>
				<Logo />
			</div>
			<div className="">
				<Navbar />
				<section className="min-h-screen bg-[#101010] text-white">
					<div className="w-full">{children}</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
