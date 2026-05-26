import React, { forwardRef } from "react";

const Textarea = forwardRef(({ label, id, error, icon, required, rows = 4, ...props }, ref) => {
    return (
        <div className="w-full">
            <div className="relative">
                {/* Optional Left Icon */}
                {icon && (
                    <div className="absolute left-4 top-3.5 text-gray-400 pointer-events-none">
                        {icon}
                    </div>
                )}

                <textarea
                    ref={ref}
                    id={id}
                    rows={rows}
                    placeholder=" " // Crucial: must be a blank space for peer-placeholder-shown to work
                    className={`
                        border-blue-500
                        peer w-full rounded-lg border-2 bg-transparent px-4 py-3 text-gray-900 outline-none transition-all duration-200 resize-y min-h-[100px]
                        ${icon ? "pl-11" : ""} 
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
                        
                        /* 2. Inactive/Empty State (Positioned near the top for textarea) */
                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
                        
                        peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium
                        ${error ? "peer-focus:text-red-500" : "peer-focus:text-blue-600"}
                    `}
                >
                    <div className="flex gap-0.5">
                        {label}
                        {required && <span className="text-red-500 font-medium">*</span>}
                    </div>
                </label>
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

Textarea.displayName = "Textarea";

export default Textarea;