'use client';
import Navbar from "@/components/home/Navbar";
import ChatBar from "@/components/home/ChatBar";
import SideBar from "@/components/home/SideBar";
import Hero from "@/components/home/Hero";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fix for mobile viewport height issue
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh', 
        `${window.innerHeight * 0.01}px`
      );
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navbar/>

      <div className="flex pt-16"> {/* Add padding-top equal to navbar height */}
        <SideBar/>
        
        <main className="flex-1 lg:ml-64">
          <div className="flex">
            <div className="flex-1 p-4 md:p-6">
              <Hero />
            </div>
            
            <ChatBar/>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}