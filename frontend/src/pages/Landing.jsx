import SignUp from "./SignUp";
import { Link } from "react-router-dom";
import { motion } from "motion/react"

function Landing() {
  console.log("Landing is rendering");
  return (
    <div className="bg-gradient-to-br from-[#F9F5F0] via-white to-[#E8E2D8] text-[#6F8F72] min-h-screen">
      {/* Navigation bar - Semi-transparent with blur */}
        <nav className="bg-white/40 backdrop-blur-md shadow-sm !py-2 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
                <motion.img 
                  src="https://cdn.discordapp.com/attachments/1465402222278869096/1467728379162787850/3a30211634add9ca0ee192b38fad5790-color-stroke-bundle-of-parsley.png?ex=69880792&is=6986b612&hm=a83433f8d81e8fe0498673a9c8362dc0240b487d85a1ce697aeb74005f37cbb4&" 
                  alt="Parsely Logo" 
                  className="h-14 cursor-pointer"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div className="flex items-center gap-8">
                  <a href="#dashboard" className="text-lg font-medium text-gray-700 hover:text-[#6F8F72] transition-colors relative group">
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6F8F72] group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a href="#about" className="text-lg font-medium text-gray-700 hover:text-[#6F8F72] transition-colors relative group">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6F8F72] group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <Link to="/login" className="px-6 py-2.5 text-[#6F8F72] font-medium hover:bg-gray-100 rounded-full transition-all">
                    Login
                  </Link>

                  <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    Sign Up
                  </Link>
            </div>
          </div>
        </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#6F8F72]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BFC6C4]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32 text-center">
          {/* Application Heading with typewriter animation */}
          <motion.h1
            className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] mb-6 leading-tight"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {"Welcome to Parsley Receipts".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.05, delay: index * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Paragraph with typewriter animation */}
          <motion.p
            className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {"Making managing and analyzing your receipts with easier.".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.03, 
                  delay: 1.2 + (index * 0.02)
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.6 }}
          >
            <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] text-white text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all">
              Get Started Free
            </Link>
            <button className="px-8 py-4 bg-white/80 backdrop-blur text-[#6F8F72] text-lg font-semibold rounded-2xl border-2 border-[#6F8F72]/20 hover:border-[#6F8F72] transition-all">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </div>

      {/* Video Section - Full Width with Wave Divider, NOT COMPLETE */}
      <div className="relative bg-gradient-to-b from-transparent to-white">
        {/* Wave SVG Divider */}
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C360,100 720,20 1440,64 L1440,0 L0,0 Z" fill="white" fillOpacity="0.3"/>
        </svg>
        {/* Video Headers */}
        <div className="max-w-6xl mx-auto px-8 py-24">
          <motion.h2 
            className="text-5xl font-bold text-center text-[#6F8F72] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            See Parsley in Action
          </motion.h2>
          <motion.p
            className="text-xl text-gray-500 text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Watch how easy it is to transform your receipt management
          </motion.p>
          {/* Vide placeholder elements */}
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ paddingBottom: '56.25%' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6F8F72] to-[#5c7c60] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-white text-2xl font-medium">Video Coming Soon</p>
                <p className="text-white/70 text-sm mt-2">We're crafting something special</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Ribbon, Infinite Loop */}
      <div className="bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] py-8 overflow-hidden shadow-inner">
        <motion.div
          className="flex gap-16"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[
            " Amazing service! Life-changing for my business",
            " Really easy to use! My grandma figured it out",
            " Best receipt tool ever! Worth every penny",
            " Highly recommend! 5 stars from me",
            " Easier to track returns! No more lost receipts",
            " I love it! Game changer for my finances",
            " So intuitive! Set up in under 5 minutes",
            " Perfect for moms! Organizing has never been easier",
            " Track warranties easily! Never miss a claim again"
          ].map((testimonial, index) => (
            <span key={index} className="text-white/90 text-xl font-medium whitespace-nowrap">
              {testimonial}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        <motion.h2 
          className="text-5xl font-bold text-center text-[#6F8F72] mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose Parsley?
        </motion.h2>
        <motion.p
          className="text-xl text-gray-500 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Everything you need to manage receipts, warranties, and returns in one convenient place
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Smart Scanning",
              description: "Instantly digitize receipts with AI-powered parsing technology. No manual entry required.",
              icon: "📸",
              gradient: "from-blue-500/10 to-purple-500/10"
            },
            {
              title: "Auto-Organization",
              description: "Receipts automatically categorized by date, merchant, and category for easy retrieval.",
              icon: "🗂️",
              gradient: "from-green-500/10 to-teal-500/10"
            },
            {
              title: "Warranty Tracking",
              description: "Never miss a warranty claim again. Get alerts before your coverage expires.",
              icon: "🔔",
              gradient: "from-orange-500/10 to-red-500/10"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              <button className="text-[#6F8F72] font-semibold flex items-center gap-3 transition-all">
                Learn More 
                <span className="text-xl">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer with Social Links */}
      <footer className="bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] text-white py-16 mt-24">
            <div className="max-w-7xl mx-auto px-8">
            {/* Social & Copyright */}
            <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-white/60 text-sm">
                &copy; 2026 Parsely Receipts. All Rights Reserved.
                </p>
                <div className="flex gap-6">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                    <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                    </a>
                ))}
                </div>
            </div>
            </div>
        </footer>
    </div>
  )
}

export default Landing