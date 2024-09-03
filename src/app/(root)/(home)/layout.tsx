import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="relative bg-[#101010]">
			<div className="">
				<Logo />
			</div>
			<div className="flex">
				<Navbar />
				<section className="flex min-h-screen bg-[#101010] text-white flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
					<div className="w-full">{children}</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
