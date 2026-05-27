import React, { forwardRef } from "react";

// Wrapped in forwardRef so it works perfectly with react-hook-form
const Radio = forwardRef(({
    id,
    label,
    description,
    error,
    disabled = false,
    className = "",
    value = "", // Fallback to an empty string to prevent uncontrolled warnings
    checked,    // Intercept checked
    ...props
}, ref) => {

    // Safely cast `checked` to a boolean if it was explicitly passed (even as null/undefined).
    // If it wasn't passed at all, leave it undefined so standard HTML handling applies.
    const safeChecked = checked !== undefined ? !!checked : undefined;

    return (
        <div className={`flex items-start ${className}`}>
            <div className="relative flex items-center justify-center pt-0.5">
                <input
                    type="radio"
                    id={id}
                    ref={ref}
                    disabled={disabled}
                    value={value}
                    {...(safeChecked !== undefined && { checked: safeChecked })}
                    className={`
                        peer appearance-none w-5 h-5 border-2 rounded-full shrink-0 bg-white
                        transition-all duration-200 cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-offset-1
                        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200
                        ${error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500 checked:border-blue-600 hover:border-blue-500"
                        }
                    `}
                    {...props}
                />

                {/* Custom Radio Dot (Hidden by default, shown when peer is checked) */}
                <div
                    className={`
                        absolute w-2.5 h-2.5 rounded-full pointer-events-none opacity-0 scale-50
                        peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 ease-out
                        ${disabled ? "bg-gray-400" : "bg-blue-600"}
                    `}
                />
            </div>

            {/* Label and Error Messages */}
            {(label || description || error) && (
                <div className="ml-3 flex flex-col">
                    {label && (
                        <label
                            htmlFor={id}
                            className={`
                                text-sm font-medium transition-colors select-none
                                ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 cursor-pointer hover:text-gray-900"}
                            `}
                        >
                            {label}
                        </label>
                    )}

                    {/* Optional description text below the label */}
                    {description && !error && (
                        <span className={`text-xs mt-0.5 ${disabled ? "text-gray-400" : "text-gray-500"}`}>
                            {description}
                        </span>
                    )}

                    {/* Error Message */}
                    {error && (
                        <span className="text-xs text-red-500 mt-1 font-medium flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
});

Radio.displayName = "Radio";

export default Radio;