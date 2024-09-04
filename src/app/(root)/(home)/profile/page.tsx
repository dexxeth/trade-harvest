"use client";
import { Card } from "@/components/ui/card";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const Account = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div>
			<Card className="flex items-center justify-start h-32 bg-white shadow-md p-4 m-4">
				{isClient && (
					<SignedIn>
						<UserButton showName />
					</SignedIn>
				)}
			</Card>
		</div>
	);
};

export default Account;
