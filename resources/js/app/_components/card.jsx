import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Card({
    icon: Icon,
    title,
    count,
    href = "#",       // Added href for the actual URL
    linkText = "View", // Added linkText for the button label
    variant = "primary",
}) {
    // Mapped semantic variants to Tailwind color palettes
    const themeMap = {
        primary: {
            iconBg: "bg-blue-50",
            iconText: "text-blue-600",
            borderBottom: "border-blue-200", // Added explicit border color
            buttonBg: "from-blue-500 to-indigo-600 shadow-blue-200",
            borderHover: "hover:border-blue-200",
        },
        success: {
            iconBg: "bg-green-50",
            iconText: "text-green-600",
            borderBottom: "border-green-200", // Added explicit border color
            buttonBg: "from-green-500 to-emerald-600 shadow-green-200",
            borderHover: "hover:border-green-200",
        },
        secondary: {
            iconBg: "bg-gray-100",
            iconText: "text-gray-600",
            borderBottom: "border-gray-200", // Added explicit border color
            buttonBg: "from-gray-500 to-slate-600 shadow-gray-200",
            borderHover: "hover:border-gray-300",
        },
        danger: {
            iconBg: "bg-red-50",
            iconText: "text-red-600",
            borderBottom: "border-red-200", // Added explicit border color
            buttonBg: "from-red-500 to-rose-600 shadow-red-200",
            borderHover: "hover:border-red-200",
        },
        warning: {
            iconBg: "bg-amber-50",
            iconText: "text-amber-600",
            borderBottom: "border-amber-200", // Added explicit border color
            buttonBg: "from-amber-400 to-orange-500 shadow-amber-200",
            borderHover: "hover:border-amber-200",
        }
    };

    // Fallback to primary if an invalid variant is passed
    const theme = themeMap[variant] || themeMap.primary;

    return (
        // Wrapped the entire card in an anchor tag to make it fully clickable
        <Link
            href={href}
            className={`group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden max-w-sm w-full flex flex-col cursor-pointer ${theme.borderHover} active:scale-[0.98] outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme.iconText.split('-')[1]}-500`}
        >
            {/* Header */}
            {/* FIXED: Changed to backticks and used the new borderBottom theme property */}
            <div className={`flex items-center justify-between px-5 py-4 border-b ${theme.borderBottom} transition-colors duration-300`}>
                <div className="text-xl font-medium text-black">
                    Total
                </div>
                <span className={`text-xl font-bold ${theme.iconBg} ${theme.iconText} px-3 py-1 rounded-full transform transition-transform duration-300 group-hover:scale-110`}>
                    {count}
                </span>
            </div>

            {/* Body / Main Info */}
            <div className="flex items-center gap-4 p-5 my-2">
                {Icon && (
                    <div className={`w-12 h-12 rounded-xl ${theme.iconBg} flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md`}>
                        <Icon size={24} className={theme.iconText} />
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="font-extrabold text-xl text-gray-800 tracking-tight group-hover:text-gray-900 transition-colors">
                        {title}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto px-4 pb-4 text-center">
                <div className={`w-full py-3 rounded-xl bg-gradient-to-r ${theme.buttonBg} shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}>
                    {/* Subtle shine effect overlay */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-opacity" />

                    <span className="text-sm font-bold text-white tracking-wide relative z-10 flex items-center gap-1">
                        {linkText}
                        <ChevronRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    );
}