import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="relative">
			<div>
				<Logo />
			</div>
			<div className="">
				<Navbar />
				<section className="min-h-screen">
					<div className="w-full">{children}</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
