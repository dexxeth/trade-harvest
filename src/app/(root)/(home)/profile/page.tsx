"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

const Account = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div>
			<div className="flex flex- items-center justify-start h-32 bg-white rounded-md p-4 mx-4">
				{isClient && (
					<SignedIn>
						<UserButton showName />
					</SignedIn>
				)}
			</div>
		</div>
	);
};

export default Account;
