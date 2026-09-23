import { useState, useEffect, useRef } from "react";
import { Bars3Icon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "@/app/_redux/app-slice";
import Button from './../../_components/button'
import SearchTicketSection from "./search-ticket-section";
import { FcAddDatabase, FcCustomerSupport } from "react-icons/fc";

export default function TopbarSection() {
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    const path = window.location.pathname.split('/')[3];
    const dispatch = useDispatch();

    function open_sidebar(params) {
        dispatch(setSidebarOpen());
    }

    const navigation = [
        { name: "Dashboard", link: "/accounts/administrator/dashboard", active: path == 'dashboard' },
        { name: "Analytics", link: "/accounts/administrator/analytics", active: path == 'analytics' },
        { name: "Users", link: "/accounts/administrator/users", active: path == 'users' },
        { name: "Emails", link: "/accounts/administrator/emails", active: path == 'emails' },
        { name: "Productivity", link: "/accounts/administrator/productivity", active: path == 'productivity' },
        { name: "Registered Products", link: "/accounts/administrator/registered_products", active: path == 'registered_products' },
        { name: "ASC", id: "Asc", link: "/accounts/administrator/asc", active: path == 'asc' },
    ];

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

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full bg-white">
            <nav
                className={`mx-auto transition-all duration-500 px-3 sm:px-5 py-2.5 sm:py-3
                ${scrolled
                        ? "mt-2 sm:mt-4  sm:max-w-2xl md:max-w-3xl lg:max-w-[100rem] rounded-full border shadow-2xl backdrop-blur-md"
                        : " border-b border-transparent"
                    }
                ${isDark
                        ? "bg-blue-600 border-white/10 text-white"
                        : "bg-white/40 border-black/5 text-slate-900"
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* LOGO */}
                    <div className="flex gap-3">
                        {/* <a className="group flex items-center gap-2 ">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="h-12 sm:h-12 transition-transform group-hover:scale-105"
                            />
                        </a> */}
                        <Button
                            variant="secondary"
                            className="transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                            onClick={() => router.visit('/accounts/administrator/ticket_creation')}
                        >
                            <div className="text-blue-500 font-black flex gap-1">
                                <FcAddDatabase className='text-xl' />  CREATE TICKET
                            </div>
                        </Button>
                        <SearchTicketSection />
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center gap-x-2">
                        {/* {navigation.map((item, i) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className={`relative px-4 py-2 text-sm ${item.active ? "bg-white text-blue-600" : "hover:shadow hover:text-white"} rounded-md font-black transition-opacity `}
                            >
                                {item.name}
                            </Link>
                        ))} */}
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* PROFILE DROPDOWN */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen((prev) => !prev)}
                                className="hidden xs:inline-flex lg:inline-flex items-center gap-2 text-blue-600 bg-white hover:bg-gray-100 px-3 sm:px-4 py-2 sm:py-4 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                                <FcCustomerSupport className="text-xl" />
                                <span>Profile</span>
                                <ChevronDownIcon
                                    className={`h-4 w-4 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* DROPDOWN MENU */}
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-gray-100 py-1.5 z-50 overflow-hidden text-slate-800"
                                    >
                                        <Link
                                            method="post"
                                            href={route("logout")}
                                            as="button"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                        >
                                            Logout
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* MOBILE TOGGLE */}
                        <button
                            onClick={() => open_sidebar(true)}
                            className={`lg:hidden p-1.5 rounded-lg transition ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
                            aria-label="Open menu"
                        >
                            <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}