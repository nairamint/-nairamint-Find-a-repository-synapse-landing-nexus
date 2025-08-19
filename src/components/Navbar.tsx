
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ExternalFormDialog from "./ExternalFormDialog";
import InviteDialog from "./InviteDialog";
import JoinWaitlistDialog from "./JoinWaitlistDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 64);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openFormDialog = () => {
    setShowFormDialog(true);
  };
  
  const openInviteDialog = () => {
    setShowInviteDialog(true);
  };
  
  const openWaitlistDialog = () => {
    setShowWaitlistDialog(true);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"} transition-all duration-200`}>
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-3xl font-bold text-blue-700 flex items-center gap-2">
              Synapses
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-blue-700 hover:text-blue-800 transition-colors font-bold">Home</Link>
              <Link to="/webapp" className="text-blue-700 hover:text-blue-800 transition-colors font-bold">Try WebApp</Link>
              <Link to="/partners" className="text-blue-700 hover:text-blue-800 transition-colors font-bold">Become a Partner</Link>
              <Link to="/resources/faq" className="text-blue-700 hover:text-blue-800 transition-colors font-bold">FAQ</Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div onClick={openInviteDialog} className="cursor-pointer">
              <Button variant="outline" className="border-2 border-black text-black bg-transparent hover:bg-black hover:text-white transition-colors font-bold">Invite</Button>
            </div>
            
            {/* Waitlist button that appears on scroll */}
            <div onClick={openWaitlistDialog} className={`cursor-pointer transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
              <Button className="flex items-center gap-2">
                Join Waitlist <ArrowRight size={16} />
              </Button>
            </div>
            
            <div onClick={openFormDialog} className="cursor-pointer">
              <Button>Get Early Access</Button>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b shadow-lg"
          >
            <nav className="container mx-auto p-4 flex flex-col gap-4">
              <Link to="/" className="text-blue-700 hover:text-blue-800 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 font-bold">Home</Link>
              <Link to="/webapp" className="text-blue-700 hover:text-blue-800 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 font-bold">Try WebApp</Link>
              <Link to="/partners" className="text-blue-700 hover:text-blue-800 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 font-bold">Become a Partner</Link>
              <Link to="/resources/faq" className="text-blue-700 hover:text-blue-800 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 font-bold">FAQ</Link>
              <div onClick={openInviteDialog} className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer">
                <Button variant="outline" className="border-2 border-black text-black bg-transparent hover:bg-black hover:text-white transition-colors font-bold w-full">Invite</Button>
              </div>
              <div onClick={openWaitlistDialog} className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer">
                <Button className="mt-2 w-full flex items-center justify-center gap-2">
                  Join Waitlist <ArrowRight size={16} />
                </Button>
              </div>
              <div onClick={openFormDialog} className="text-gray-700 hover:text-blue-700 transition-colors py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer">
                <Button className="mt-2 w-full">Get Early Access</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>
      
      <ExternalFormDialog 
        open={showFormDialog} 
        onOpenChange={setShowFormDialog} 
        title="Get Early Access"
      />
      
      <InviteDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
      />
      
      <JoinWaitlistDialog
        open={showWaitlistDialog}
        onOpenChange={setShowWaitlistDialog}
      />
    </>
  );
};

export default Navbar;
