"use client"
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet'
import { useState } from 'react'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#recipes', label: 'Recipes' },
  { href: '#videos', label: 'Videos' },
  { href: '#community', label: 'Community' },
];

export function SiteHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Mrs. & Mr. Recipe Logo" width={40} height={40} className="rounded-full" />
          <span className="font-headline font-bold text-xl text-primary hidden sm:inline-block">
            Mrs. & Mr. Recipe
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <a href="https://www.youtube.com/@Mrs._and_Mr._recipe/" target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Mrs. & Mr. Recipe Logo" width={32} height={32} className="rounded-full" />
                    <span className="font-headline font-bold text-lg text-primary">Mrs. & Mr. Recipe</span>
                  </Link>
                  <SheetClose asChild>
                      <Button variant="ghost" size="icon"><X className="h-6 w-6" /></Button>
                  </SheetClose>
                </div>
                <div className="mt-8 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                     <SheetClose key={link.href} asChild>
                        <Link href={link.href} className="text-lg font-medium text-foreground hover:text-primary" onClick={() => setIsSheetOpen(false)}>
                            {link.label}
                        </Link>
                     </SheetClose>
                  ))}
                </div>
                <div className="mt-auto">
                    <SheetClose asChild>
                        <Button asChild className="w-full">
                            <a href="https://www.youtube.com/@Mrs._and_Mr._recipe/" target="_blank" rel="noopener noreferrer">
                                Watch on YouTube
                            </a>
                        </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
