import SignUp from "./SignUp";
import { Link } from "react-router-dom";

function Landing() {
  console.log("Landing is rendering");
  return (
    <div className="bg-[#F9F5F0] text-[#6F8F72] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#F9F5F0] shadow-lg py-2">
        <div className="container mx-auto flex justify-between items-center px-6">
          <img src="https://p7.hiclipart.com/preview/701/708/834/computer-icons-receipt-icon-design-cartoon-line.jpg" alt="Logo" className="h-10" />
          <div className="flex space-x-6">
            <a href="#about" className="text-lg text-[#6F8F72] pt-1.5">
              About Us
            </a>
            <a href="#about" className="text-lg text-[#6F8F72] pt-1.5">
              About Us
            </a>
            <a href="#what-we-do" className="text-lg text-[#6F8F72] pt-1.5">
              What We Do
            </a>
            <button
              onClick={() => alert("Sign In Clicked!")}
              className="px-4 py-2 bg-[#215E61] text-[#6F8F72] rounded-lg hover:bg-[#e28f45] transition"
            >
              Sign In
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

      {/* Content Page with Cards */}
      <div className="bg-[#E8E2D8] py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <div className="bg-[#F9F5F0] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#6F8F72]">Card 1 Title</h3>
            <p className="text-[#6F8F72] mb-4">This is a description for card 1. It provides some important details.</p>
            <button className="px-6 py-2 bg-[#6F8F72] text-[#E8E2D8] rounded-lg hover:bg-[#5c7c60] transition">
              Learn More
            </button>
          </div>

          <div className="bg-[#F9F5F0] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#6F8F72]">Card 2 Title</h3>
            <p className="text-[#6F8F72] mb-4">This is a description for card 2. It provides some important details.</p>
            <button className="px-6 py-2 bg-[#6F8F72] text-[#E8E2D8] rounded-lg hover:bg-[#5c7c60] transition">
              Learn More
            </button>
          </div>

          <div className="bg-[#F9F5F0] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#6F8F72]">Card 3 Title</h3>
            <p className="text-[#6F8F72] mb-4">This is a description for card 3. It provides some important details.</p>
            <button className="px-6 py-2 bg-[#6F8F72] text-[#E8E2D8] rounded-lg hover:bg-[#5c7c60] transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#6F8F72] text-[#E8E2D8] py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2026 Your Company. All Rights Reserved.</p>
        </div>
      </footer>
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