"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
	MdOutlineExplore,
	MdExplore,
	MdOutlineShoppingBag,
	MdShoppingBag,
} from "react-icons/md";
import { IoAddCircleOutline, IoAddCircle } from "react-icons/io5";
import {
	RiAccountCircleLine,
	RiAccountCircleFill,
	RiShoppingBag4Line,
	RiShoppingBag4Fill,
} from "react-icons/ri";

const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav className="fixed bottom-0 bg-white w-full border-t shadow-md p-2 flex items-center justify-center z-50 ">
			<ul className="flex items-center justify-around w-full">
				<Link href="/">
					<li className="flex flex-col items-center">
						{pathname === "/" ? (
							<GoHomeFill size="28" />
						) : (
							<GoHome size="28" />
						)}
					</li>
				</Link>

				<Link href="/explore">
					<li className="flex flex-col items-center">
						{pathname === "/explore" ? (
							<MdExplore size="28" />
						) : (
							<MdOutlineExplore size="28" />
						)}
					</li>
				</Link>

				<Link href="/upload">
					<li className="flex flex-col items-center">
						{pathname === "/upload" ? (
							<IoAddCircle size="32" />
						) : (
							<IoAddCircleOutline size="32" />
						)}
					</li>
				</Link>

				<Link href="/shopping">
					<li className="flex flex-col items-center">
						{pathname === "/shopping" ? (
							<RiShoppingBag4Fill size="28" />
						) : (
							<RiShoppingBag4Line size="28" />
						)}
					</li>
				</Link>

				<Link href="/profile">
					<li className="flex flex-col items-center">
						{pathname === "/profile" ? (
							<RiAccountCircleFill size="28" />
						) : (
							<RiAccountCircleLine size="28" />
						)}
					</li>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
