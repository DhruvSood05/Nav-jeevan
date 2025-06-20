"use client"

import Link from "next/link"
import { AlertTriangle, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-sm font-medium hover:text-red-600 transition-colors">
                  Home
                </Link>
                <Link
                  href="/request-help"
                  className="text-sm font-medium hover:text-red-600 transition-colors flex items-center"
                >
                  <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                  Emergency Help
                </Link>
                <Link href="/volunteer" className="text-sm font-medium hover:text-red-600 transition-colors">
                  Volunteer Dashboard
                </Link>
                <Link href="/map" className="text-sm font-medium hover:text-red-600 transition-colors">
                  Live Relief Map
                </Link>
                <Link href="/donate" className="text-sm font-medium hover:text-red-600 transition-colors">
                  Donate & Support
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              ReliefConnect
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link
            href="/request-help"
            className="text-sm font-medium hover:text-red-600 transition-colors flex items-center"
          >
            <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
            Emergency
          </Link>
          <Link href="/volunteer" className="text-sm font-medium hover:text-red-600 transition-colors">
            Volunteer
          </Link>
          <Link href="/map" className="text-sm font-medium hover:text-red-600 transition-colors">
            Live Map
          </Link>
          <Link href="/donate" className="text-sm font-medium hover:text-red-600 transition-colors">
            Donate
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Emergency Button */}
          <Link href="/request-help" className="hidden sm:block">
            <Button
              size="sm"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
