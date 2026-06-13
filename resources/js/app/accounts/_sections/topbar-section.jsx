import { useState, useEffect } from "react";
import { Bars3Icon, LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";


export default function TopbarSection() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const path = window.location.pathname.split('/')[3]

    const navigation = [
        { name: "Dashboard", link: "/accounts/administrator/dashboard", active: path == 'dashboard' },
        { name: "Users", link: "/accounts/administrator/users", active: path == 'users' },
        { name: "Productivity", link: "/accounts/administrator/productivity", active: path == 'productivity' },
        { name: "Registered Products", link: "/accounts/administrator/registered_products", active: path == 'registered_products' },
        { name: "ASC", id: "Asc", link: "/accounts/administrator/asc", active: path == 'asc' },
    ];

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const bg = window.getComputedStyle(
                            entry.target,
                        ).backgroundColor;
                        // Improved dark detection
                        const isDarkBg =
                            bg.includes("rgb(0") ||
                            bg.includes("10, 10") ||
                            entry.target.id === "home";
                        setIsDark(isDarkBg);
                    }
                });
            },
            { threshold: 0.4 },
        );

        document
            .querySelectorAll("section[id]")
            .forEach((sec) => observer.observe(sec));
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 mt-1 sm:mt-2">
            <nav
                className={`mx-auto transition-all duration-500 px-3 sm:px-5 py-2.5 sm:py-3
                ${scrolled
                        ? "mt-2 sm:mt-4 max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-5xl rounded-full border shadow-2xl backdrop-blur-md"
                        : "max-w-[95vw] sm:max-w-7xl border-b border-transparent"
                    }
                ${isDark
                        ? "bg-blue-600 border-white/10 text-white"
                        : "bg-white/40 border-black/5 text-slate-900"
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* LOGO */}
                    <div className="flex-shrink-0 bg-white rounded-md">
                        <a className="group flex items-center gap-2 ">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="h-12 sm:h-12 transition-transform group-hover:scale-105"
                            />
                        </a>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center gap-x-2">
                        {navigation.map((item, i) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className={`relative px-4 py-2 text-sm ${item.active ? "bg-white text-blue-600" : "hover:shadow hover:text-white"}  rounded-md font-black transition-opacity `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            method="post" href={route("logout")} as="button"
                            className="hidden xs:inline-flex lg:inline-flex text-blue-600 bg-white hover:bg-gray-100 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                            Logout
                        </Link>

                        {/* MOBILE TOGGLE */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className={`lg:hidden p-1.5 rounded-lg transition ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                            aria-label="Open menu"
                        >
                            <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 250 }}
                        // Changed mobile menu background to deep navy blue
                        className="fixed inset-0 z-[60] bg-[#0f172a] flex flex-col overflow-y-auto"
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
                            <img
                                src="/images/eologo.png"
                                alt="Logo"
                                className="h-7"
                            />
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                                aria-label="Close menu"
                            >
                                <XMarkIcon className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col px-5 pt-8 gap-1">
                            {navigation.map((item, i) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.3 }}
                                    onClick={() => scrollTo(item.id)}
                                    className="text-left text-2xl sm:text-3xl font-bold text-white/90 hover:text-white tracking-tight py-3 px-4 rounded-xl hover:bg-white/5 transition"
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="mx-5 mt-8 border-t border-white/10" />

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-3 px-5 mt-6">
                            <Link
                                href="/resolution"
                                className="w-full py-3.5 text-center font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-400 transition text-sm shadow-lg shadow-blue-500/20"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Warranty Resolution
                            </Link>
                        </div>

                        {/* Footer note */}
                        <p className="text-center text-white/30 text-xs mt-auto pb-8 pt-6 px-5">
                            © {new Date().getFullYear()} EmpireOne. All rights reserved.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}