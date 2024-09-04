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
		<nav className="fixed bottom-0  w-full bg-[#262626] p-2 flex items-center justify-center z-50 ">
			<ul className="flex items-center justify-around w-full">
				<Link href="/">
					<li className="flex flex-col items-center">
						{pathname === "/" ? (
							<GoHomeFill size="24" color="white" />
						) : (
							<GoHome size="24" color="white" />
						)}
					</li>
				</Link>

				<Link href="/explore">
					<li className="flex flex-col items-center">
						{pathname === "/explore" ? (
							<MdExplore size="24" color="white" />
						) : (
							<MdOutlineExplore size="24" color="white" />
						)}
					</li>
				</Link>

				<Link href="/list">
					<li className="flex flex-col items-center">
						{pathname === "/list" ? (
							<IoAddCircle size="36" color="white" />
						) : (
							<IoAddCircleOutline size="36" color="white" />
						)}
					</li>
				</Link>

				<Link href="/shopping">
					<li className="flex flex-col items-center">
						{pathname === "/shopping" ? (
							<RiShoppingBag4Fill size="24" color="white" />
						) : (
							<RiShoppingBag4Line size="24" color="white" />
						)}
					</li>
				</Link>

				<Link href="/profile">
					<li className="flex flex-col items-center">
						{pathname === "/profile" ? (
							<RiAccountCircleFill size="24" color="white" />
						) : (
							<RiAccountCircleLine size="24" color="white" />
						)}
					</li>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
