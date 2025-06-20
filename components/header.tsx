"use client"

import Link from "next/link"
import { AlertTriangle, Menu, User, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm border-gray-200">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Nav Jeevan
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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

          {/* Right Side Actions */}
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
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-lg">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                href="/"
                className="text-lg font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/request-help"
                className="text-lg font-medium hover:text-red-600 transition-colors flex items-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Emergency Help
              </Link>
              <Link
                href="/volunteer"
                className="text-lg font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Volunteer Dashboard
              </Link>
              <Link
                href="/map"
                className="text-lg font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Live Relief Map
              </Link>
              <Link
                href="/donate"
                className="text-lg font-medium hover:text-red-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate & Support
              </Link>

              {/* Mobile Emergency Button */}
              <div className="pt-4 border-t">
                <Link href="/request-help" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Emergency Help
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
