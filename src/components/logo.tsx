import Link from "next/link";
import Image from "next/image";
import { Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold text-primary">
              Trade Harvest
            </span>{" "}
            {}
          </Link>

          {}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Messages">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
