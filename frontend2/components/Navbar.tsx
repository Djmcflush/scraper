import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <nav className="container mx-auto flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Proposal Generator
          </Link>
        </div>
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="text-primary-foreground border-primary-foreground">
                <svg
                  className="h-[1.2rem] w-[1.2rem]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-primary-foreground hover:text-secondary-foreground transition-colors">
                  Home
                </Link>
                <Link href="/proposals" className="text-primary-foreground hover:text-secondary-foreground transition-colors">
                  Proposals
                </Link>
                <Link href="/about" className="text-primary-foreground hover:text-secondary-foreground transition-colors">
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow space-x-4">
            <Link href="/" className="text-primary-foreground hover:text-secondary-foreground transition-colors">
              Home
            </Link>
            <Link href="/proposals" className="text-primary-foreground hover:text-secondary-foreground transition-colors">
              Proposals
            </Link>
            <Link href="/about" className="text-primary-foreground hover:text-secondary-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
