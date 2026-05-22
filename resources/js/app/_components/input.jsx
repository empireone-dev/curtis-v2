import React, { useState, forwardRef } from "react";

const Input = forwardRef(({ label, id, type = "text", error, icon, required, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine if we should show the actual characters or dots for passwords
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className="w-full">
            <div className="relative">
                {/* Optional Left Icon */}
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        {icon}
                    </div>
                )}

                <input
                    ref={ref} // CRUCIAL FIX: Attach the forwarded ref here
                    id={id}
                    type={inputType}
                    placeholder=" " // Crucial: must be a blank space for peer-placeholder-shown to work
                    className={`
                        border-blue-500
                        peer w-full h-12 rounded-lg border-2 bg-transparent px-4 text-gray-900 outline-none transition-all duration-200
                        ${icon ? "pl-11" : ""} 
                        ${type === "password" ? "pr-11" : ""}
                        ${error
                            ? "border-red-500 focus:border-red-500"
                            : "border-blue-400 focus:border-blue-600 hover:border-blue-500"
                        }
                    `}
                    {...props}
                />

                {/* Floating Label */}
                <label
                    htmlFor={id}
                    className={`
                        absolute bg-white px-1 pointer-events-none transition-all duration-200
                        ${icon ? "left-10" : "left-3"}
                        
                        /* 1. Base/Filled State (Sitting on the top border, masking the line) */
                        -top-2.5 translate-y-0 text-xs font-medium
                        ${error ? "text-red-500" : "text-blue-500"}
                        
                        /* 2. Inactive/Empty State (Centered inside the input) */
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
                        
                        peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium
                        ${error ? "peer-focus:text-red-500" : "peer-focus:text-blue-600"}
                    `}
                >
                    <div className="flex gap-0.5">
                        {label}
                        {required && <span className="text-red-500 font-medium">*</span>}
                    </div>
                </label>

                {/* Password Visibility Toggle */}
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
});

// Setting displayName is highly recommended when using forwardRef to ensure debugging in React DevTools remains easy.
Input.displayName = "Input";

export default Input;