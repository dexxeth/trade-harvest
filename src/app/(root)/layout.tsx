import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return <main className="bg-[#f3f4f6]">{children}</main>;
};

export default RootLayout;
