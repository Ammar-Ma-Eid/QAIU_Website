import Logo from './logo';
import { Facebook, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
  </svg>
);


const Footer = () => {
  return (
    <footer className="bg-secondary/80 border-t border-border/40 backdrop-blur-lg supports-[backdrop-filter]:bg-secondary/60 shadow-lg">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center flex-col">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Logo />
          </Link>
          <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
            Exploring the frontiers of Quantum Computing. A student-led initiative at Alamein International University.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="YouTube">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="TikTok">
              <span className="sr-only">TikTok</span>
              <TiktokIcon className="h-6 w-6" />
            </a>
            <a href="mailto:info@qaiu.edu" className="text-muted-foreground hover:text-primary" aria-label="Email">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} QAIU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
