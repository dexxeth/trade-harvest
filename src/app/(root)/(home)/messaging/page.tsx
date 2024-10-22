"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Conversation {
	id: number;
	user: string;
	avatar: string;
	lastMessage: string;
	time: string;
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
		},
		{
			id: 2,
			user: "Bob",
			avatar: "/placeholder.svg?height=32&width=32",
			lastMessage: "Did you see the game last night?",
			time: "1h",
		},
		{
			id: 3,
			user: "Charlie",
			avatar: "/placeholder.svg?height=32&width=32",
			lastMessage: "Let's meet up this weekend!",
			time: "3h",
		},
	]);
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		if (newMessage.trim() === "") return;
		const newMsg: Message = {
			id: messages.length + 1,
			sender: "You",
			content: newMessage,
			time: "Just now",
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
				{view === "chat" && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setView("list")}
						className="mr-2">
						<ArrowLeft className="h-6 w-6" />
					</Button>
				)}
				<h1 className="text-xl font-bold flex-grow text-center">
					{view === "list" ? "Chats" : activeConversation?.user}
				</h1>
			</header>

			<main className="flex-grow overflow-y-auto">
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
								<Avatar>
									<AvatarImage
										src={conv.avatar}
										alt={conv.user}
									/>
									<AvatarFallback>
										{conv.user[0]}
									</AvatarFallback>
								</Avatar>
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
								className={`max-w-[75%] p-3 rounded-lg ${
									msg.sender === "You"
										? "bg-blue-500 text-white self-end"
										: "bg-gray-300 self-start"
								}`}>
								<p>{msg.content}</p>
								<span className="text-xs opacity-75 mt-1 block">
									{msg.time}
								</span>
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
							placeholder="Type a message..."
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							className="flex-grow"
						/>
						<Button size="icon" onClick={handleSendMessage}>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</footer>
			)}
		</div>
	);
}
