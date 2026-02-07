
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"


export default function AboutUs() {
    const navigate = useNavigate();

    return (
        // 1. MAIN BACKGROUND (White)
        <div className="bg-[white/80] text-[#6F8F72] min-h-screen flex flex-col">
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
                    <button className="px-6 py-2.5 text-[#6F8F72] font-medium hover:bg-gray-100 rounded-full transition-all">
                    Login
                    </button>
                    <button className="px-6 py-2.5 bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    Sign Up
                    </button>
                </div>
                </div>
            </nav>

            <div className="bg-white/80 py-16">
                {/* Heading with typewriter animation */}
                <motion.h1
                    className="text-6xl font-extrabold text-center text-[#6F8F72] drop-shadow-lg"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                >
                    {"About Us".split("").map((char, index) => (
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
            </div>

            <div className="relative overflow-hidden">
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#6F8F72]/10 rounded-full blur-3xl translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#BFC6C4]/20 rounded-full blur-3xl -translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-8 py-24 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column - About Me Summary, 4 sections with clean transitions*/}
                        <motion.div 
                            className="bg-white/60 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-gray-200/50"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <motion.h2 
                                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6F8F72] to-[#5c7c60] mb-10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                About Parsely Receipts
                            </motion.h2>
                            
                            <div className="space-y-6">
                                <motion.p 
                                    className="text-lg text-gray-700 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </motion.p>
                                
                                <motion.p 
                                    className="text-lg text-gray-700 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                                    anim id est laborum.
                                </motion.p>
                                
                                <motion.p 
                                    className="text-lg text-gray-700 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                >
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
                                    dicta sunt explicabo.
                                </motion.p>
                                
                                <motion.p 
                                    className="text-lg text-gray-700 leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
                                    magni dolores eos qui ratione voluptatem sequi nesciunt.
                                </motion.p>
                            </div>

                        </motion.div>

                        {/* Right Column - Images Placeholders, NOT FINISHED */}
                        <div className="flex flex-col gap-8">
                            {/* Top Image */}
                            <motion.div 
                                className="relative bg-gradient-to-br from-[#BFC6C4]/30 to-[#6F8F72]/20 rounded-3xl shadow-xl overflow-hidden h-80 group"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#6F8F72]/10"></div>
                                
                                <div className="relative h-full flex items-center justify-center">
                                    <div className="text-center group-hover:scale-110 transition-transform duration-500">
                                        <div className="text-7xl mb-4 filter drop-shadow-lg">🖼️</div>
                                        <p className="text-[#6F8F72] text-2xl font-bold mb-2">Team Photo</p>
                                        <p className="text-gray-600 text-sm">Coming Soon</p>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full"></div>
                            </motion.div>

                            {/* Bottom Image Placeholder, NOT FINISHED */}
                            <motion.div 
                                className="relative bg-gradient-to-br from-[#6F8F72]/20 to-[#BFC6C4]/30 rounded-3xl shadow-xl overflow-hidden h-80 group"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#6F8F72]/10"></div>
                                
                                <div className="relative h-full flex items-center justify-center">
                                    <div className="text-center group-hover:scale-110 transition-transform duration-500">
                                        <div className="text-7xl mb-4 filter drop-shadow-lg">🖼️</div>
                                        <p className="text-[#6F8F72] text-2xl font-bold mb-2">Office Space</p>
                                        <p className="text-gray-600 text-sm">Coming Soon</p>
                                    </div>
                                </div>

                                {/* corner accent */}
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-white/40 to-transparent rounded-tr-full"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

        {/* Footer */}
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
    );
}
    