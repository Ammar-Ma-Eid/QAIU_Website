
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/#contact', label: 'Contact' },
];

import { useEffect } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50 shadow-lg' : 'bg-transparent shadow-none backdrop-blur-none border-b-0'}
      `}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
              prefetch={true}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <a href="https://qworld.net/" target="_blank" rel="noopener noreferrer">QWorld</a>
          </Button>
          <Button variant="default" asChild>
            <a href="https://qworld.net/qegypt/" target="_blank" rel="noopener noreferrer">QEgypt</a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-12 bg-background/80 backdrop-blur-lg border-r border-border/40 shadow-2xl">
              <nav className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-3 mb-4" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-4">
                <Button variant="outline" asChild>
                  <a href="https://qworld.net/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>QWorld</a>
                </Button>
                <Button variant="default" asChild>
                  <a href="https://qworld.net/qegypt/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>QEgypt</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
