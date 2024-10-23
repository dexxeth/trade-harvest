"use client";
import Settings from "@/components/settings";
import { Card } from "@/components/ui/card";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const Account = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<main>
			<header className="shadow-sm py-4 px-4 sticky top-0 z-10">
				<h1 className="text-xl font-bold text-center">Settings</h1>
			</header>
			<div>
				<Card className="flex items-center justify-start h-32 bg-white shadow-md p-4 m-4">
					{isClient && (
						<SignedIn>
							<UserButton showName />
						</SignedIn>
					)}
				</Card>
			</div>
			<div>
			<Settings/>
			</div>
		</main>
	);
};

export default Account;
