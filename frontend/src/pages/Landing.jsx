import SignUp from "./SignUp";
import { Link } from "react-router-dom";
import { motion } from "motion/react"

function Landing() {
  console.log("Landing is rendering");
  return (
    <div className="bg-[#F9F5F0] text-[#6F8F72] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#E8E2D8] shadow-lg py-2">
        <div className="container mx-auto flex justify-between items-center px-6">
          <img src="https://cdn.discordapp.com/attachments/1465402222278869096/1467728379162787850/3a30211634add9ca0ee192b38fad5790-color-stroke-bundle-of-parsley.png?ex=69880792&is=6986b612&hm=a83433f8d81e8fe0498673a9c8362dc0240b487d85a1ce697aeb74005f37cbb4&" alt="Logo" className="h-10" />
          <div className="flex space-x-6">
            <a href="#about" className="text-lg text-[#6F8F72] pt-1.5">
              About Us
            </a>
            <a href="#what-we-do" className="text-lg text-[#6F8F72] pt-1.5">
              What We Do
            </a>
            <button
              onClick={() => alert("Sign Up Clicked!")}
              className="px-4 py-2 bg-[#6F8F72] text-[#F9F5F0] rounded-lg transition cursor-pointer hover:opacity-90"
            >
              Sign UP
            </button>
            <button
              onClick={() => alert("Sign In Clicked!")}
              className="px-4 py-2 bg-[#6F8F72] text-[#F9F5F0] rounded-lg transition cursor-pointer hover:opacity-90"
            >
              Sign IN
            </button>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center bg-[#F9F5F0] min-h-screen flex-col">
        {/* Heading with typewriter animation */}
        <motion.h1
          className="text-7xl font-extrabold text-center text-[#6F8F72] drop-shadow-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {"Welcome to Parsely Receipts!!".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05, delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Paragraph with typewriter animation */}
        <motion.p
          className="text-2xl text-center text-[#6F8F72] mt-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {"Your one-stop solution for managing and analyzing your receipts with ease.".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.05, 
                delay: 1.5 + (index * 0.03) // Starts after heading finishes
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
      </div>

      {/* Video Section */}
      <div className="bg-[#F9F5F0] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#6F8F72] mb-8">
            See Parsely in Action!!
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#6F8F72] rounded-lg overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-[#F9F5F0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-[#F9F5F0] text-xl">Video Coming Soon</p>
                </div>
              </div>
              {/* Replace with actual video when ready:
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="YOUR_VIDEO_URL"
                title="Product Demo"
                allowFullScreen
              ></iframe>
              */}
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Moving Ribbon Testimonials */}
      <div className="bg-[#6F8F72] py-6 overflow-hidden">
        <motion.div
          className="flex space-x-2"
          animate={{ x: ["-80%", "100%"] }}
          transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
          }}
        >
          <span className="text-[#F9F5F0] text-lg">* Amazing service! </span>
          <span className="text-[#F9F5F0] text-lg">* Really easy to use! </span>
          <span className="text-[#F9F5F0] text-lg">* Best receipt tool ever! </span>
          <span className="text-[#F9F5F0] text-lg">* Highly recommend! </span>
          <span className="text-[#F9F5F0] text-lg">* Easier to track returns! </span>
          {/* Duplicate for seamless loop */}
          <span className="text-[#F9F5F0] text-lg">* I love it! </span>
          <span className="text-[#F9F5F0] text-lg">* So easy to use! </span>
          <span className="text-[#F9F5F0] text-lg">* I love this app! </span>
          <span className="text-[#F9F5F0] text-lg">* For all those moms! </span>
          <span className="text-[#F9F5F0] text-lg">* Now I can track my warranties! </span>
        </motion.div>
      </div>

      {/* Content Page with Cards */}
      <div className="bg-[#F9F5F0] py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-[#E8E2D8] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#6F8F72]">Card 1 Title</h3>
            <p className="text-[#6F8F72] mb-4">This is a description for card 1. It provides some important details.</p>
            <button className="px-6 py-2 bg-[#6F8F72] text-[#F9F5F0] rounded-lg transition cursor-pointer hover:opacity-90">
              Learn More
            </button>
          </div>

          <div className="bg-[#E8E2D8] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#6F8F72]">Card 2 Title</h3>
            <p className="text-[#6F8F72] mb-4">This is a description for card 2. It provides some important details.</p>
            <button className="px-6 py-2 bg-[#6F8F72] text-[#F9F5F0] rounded-lg transition cursor-pointer hover:opacity-90">
              Learn More
            </button>
          </div>

          <div className="bg-[#E8E2D8] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#6F8F72]">Card 3 Title</h3>
            <p className="text-[#6F8F72] mb-4">This is a description for card 3. It provides some important details.</p>
            <button className="px-6 py-2 bg-[#6F8F72] text-[#F9F5F0] rounded-lg transition cursor-pointer hover:opacity-90">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#6F8F72] text-[#E8E2D8] py-12 mt-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h4 className="text-xl font-bold mb-4">Parsely Receipts</h4>
              <p className="text-sm">We make it easier to track your returns and warranties while keeping track of your expenses.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-[#F9F5F0] transition">About Us</a></li>
                <li><a href="#features" className="hover:text-[#F9F5F0] transition">Our App</a></li>
                <li><a href="#pricing" className="hover:text-[#F9F5F0] transition">Pricing</a></li>
                <li><a href="#contact" className="hover:text-[#F9F5F0] transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#help" className="hover:text-[#F9F5F0] transition">Help Desk</a></li>
                <li><a href="#privacy" className="hover:text-[#F9F5F0] transition">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-[#F9F5F0] transition">Terms of Service</a></li>
                <li><a href="#faq" className="hover:text-[#F9F5F0] transition">FAQ</a></li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9F5F0] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9F5F0] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9F5F0] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9F5F0] transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
    
          {/* Bottom Bar */}
          <div className="border-t border-[#E8E2D8] pt-6 text-center">
            <p className="text-sm">&copy; 2026 Parsely Receipts. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      {/* <footer className="bg-[#6F8F72] text-[#E8E2D8] py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2026 Parsely Receipts. All Rights Reserved.</p>
        </div>
      </footer> */}
    </div>


    // <div>
    //   <h1>Welcome to the Landing Page!</h1>
    //   <p>This is the landing page content</p>
    //   <Link to="/SignUp">
    //     <button>Click this to go to the login page!</button>
    //   </Link>
    // </div>
  )
}

export default Landing