"use client";
import { useState } from "react";
import { ArrowLeft, Info, Phone, Send, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Navbar from "./navbar";

interface Conversation {
	id: number;
	user: string;
	avatar: string;
	lastMessage: string;
	time: string;
	isOnline: boolean;
}

interface Message {
	id: number;
	sender: string;
	content: string;
	time: string;
}

export default function Component() {
	const [view, setView] = useState<"list" | "chat">("list");
	const [activeConversation, setActiveConversation] =
		useState<Conversation | null>(null);
	const [conversations, setConversations] = useState<Conversation[]>([
		{
			id: 1,
			user: "Alice",
			avatar: "/placeholder.svg?height=32&width=32",
			lastMessage: "Hey, how are you?",
			time: "2m",
			isOnline: true,
		},
		{
			id: 2,
			user: "Bob",
			avatar: "/placeholder.svg?height=32&width=32",
			lastMessage: "Did you see the game last night?",
			time: "1h",
			isOnline: false,
		},
		{
			id: 3,
			user: "Charlie",
			avatar: "/placeholder.svg?height=32&width=32",
			lastMessage: "Let's meet up this weekend!",
			time: "3h",
			isOnline: true,
		},
	]);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 1,
			sender: "Alice",
			content: "Hey, how's it going?",
			time: "10:00 AM",
		},
		{
			id: 2,
			sender: "You",
			content: "Hi Alice! I'm doing well, thanks. How about you?",
			time: "10:05 AM",
		},
		{
			id: 3,
			sender: "Alice",
			content: "I'm great! Just finished a big project at work.",
			time: "10:10 AM",
		},
		{
			id: 4,
			sender: "You",
			content: "That's awesome! We should celebrate sometime.",
			time: "10:15 AM",
		},
	]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		if (newMessage.trim() === "") return;
		const newMsg: Message = {
			id: messages.length + 1,
			sender: "You",
			content: newMessage,
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};
		setMessages([...messages, newMsg]);
		setNewMessage("");
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div className="bg-gray-100 h-screen flex flex-col max-w-md mx-auto">
			<header className="bg-white shadow-sm py-4 px-4 flex items-center">
				{view === "chat" && activeConversation ? (
					<>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setView("list")}
							className="mr-2">
							<ArrowLeft className="h-6 w-6" />
						</Button>
						<Avatar className="h-8 w-8 mr-3">
							<AvatarImage
								src={activeConversation.avatar}
								alt={activeConversation.user}
							/>
							<AvatarFallback>
								{activeConversation.user[0]}
							</AvatarFallback>
						</Avatar>
						<div className="flex-grow">
							<h1 className="text-lg font-semibold">
								{activeConversation.user}
							</h1>
							<p className="text-xs text-gray-500">
								{activeConversation.isOnline
									? "Active now"
									: "Active 2h ago"}
							</p>
						</div>

						<Button variant="ghost" size="icon">
							<Info className="h-5 w-5" />
						</Button>
					</>
				) : (
					<>
						{/* / */}
						<h1 className="text-xl font-bold flex-grow flex justify-center">
							Chats
						</h1>
					</>
				)}
			</header>

			<main className="flex-grow overflow-y-auto bg-white">
				{view === "list" ? (
					<div className="divide-y">
						{conversations.map((conv) => (
							<div
								key={conv.id}
								className="flex items-center space-x-4 p-4 hover:bg-gray-50 cursor-pointer"
								onClick={() => {
									setActiveConversation(conv);
									setView("chat");
								}}>
								<div className="relative">
									<Avatar>
										<AvatarImage
											src={conv.avatar}
											alt={conv.user}
										/>
										<AvatarFallback>
											{conv.user[0]}
										</AvatarFallback>
									</Avatar>
									{conv.isOnline && (
										<span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
									)}
								</div>
								<div className="flex-grow">
									<h2 className="font-semibold">
										{conv.user}
									</h2>
									<p className="text-sm text-gray-500 truncate">
										{conv.lastMessage}
									</p>
								</div>
								<span className="text-xs text-gray-400">
									{conv.time}
								</span>
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-col p-4 space-y-4">
						{messages.map((msg) => (
							<div
								key={msg.id}
								className={`flex ${
									msg.sender === "You"
										? "justify-end"
										: "justify-start"
								}`}>
								<div
									className={`max-w-[75%] p-3 rounded-3xl ${
										msg.sender === "You"
											? "bg-blue-500 text-white rounded-br-md"
											: "bg-gray-200 rounded-bl-md"
									}`}>
									<p>{msg.content}</p>
									<span className="text-xs opacity-75 mt-1 block">
										{msg.time}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</main>

			{view === "chat" && (
				<footer className="bg-white border-t p-4">
					<div className="flex items-center space-x-2">
						<Input
							type="text"
							placeholder="Message..."
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							className="flex-grow rounded-full bg-gray-100 border-none"
						/>
						<Button
							size="icon"
							className="rounded-full"
							onClick={handleSendMessage}>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</footer>
			)}
			<div><Navbar></Navbar></div>
		</div>
	);
}
