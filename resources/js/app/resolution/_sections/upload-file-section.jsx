import React from 'react';
import { FiUploadCloud, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaFileImage, FaFileVideo } from 'react-icons/fa';

const UploadFileSection = ({ files = {}, setFiles, error }) => {
    const call_type = window.location.pathname.split('/')[2];
    const uploadRequirements = [
        {
            id: 'readable_serial_section',
            label: 'Model & Serial Number',
            description: 'Clear and readable picture of the model & serial number sticker/plate.',
            accept: 'image/*',
            notes: 'Max size: 10MB. Formats: JPG, PNG.',
            icon: <FaFileImage className="w-6 h-6 text-blue-500" />,
            required: true // <-- Mandatory
        },
        {
            id: 'bill_of_sale',
            label: 'Bill of Sale',
            description: 'Clear picture showing store name, purchase date, price, and unit description.',
            accept: 'image/*',
            notes: 'Max size: 10MB. Formats: JPG, PNG.',
            icon: <FaFileImage className="w-6 h-6 text-green-500" />,
            required: call_type == "safety_issue" ? false : true
        },
        // Use the ternary operator to conditionally insert the third object
        call_type === 'parts'
            ? {
                id: 'parts_model',
                label: 'Photo of the parts',
                description: <>
                    * Clear picture of the part/s you need.<br />
                    * Clear photo of the unit in which the missing/damaged part is located.
                </>,
                accept: 'image/*,video/*',
                notes: 'Max size: 50MB. Videos compressed under 30 seconds preferred.',
                icon: <FaFileVideo className="w-6 h-6 text-purple-500" />,
                required: true // <-- Mandatory
            }
            : {
                id: 'receipt_model',
                label: 'Issue Evidence',
                description: 'Clear picture or video demonstrating the issue or defect.',
                accept: 'image/*,video/*',
                notes: 'Max size: 50MB. Videos compressed under 30 seconds preferred.',
                icon: <FaFileVideo className="w-6 h-6 text-purple-500" />,
                required: true // <-- Mandatory
            }
    ];

    const handleFileChange = (e, categoryId) => {
        const selectedFiles = Array.from(e.target.files);
        const currentCategoryFiles = files[categoryId] || [];

        setFiles({
            ...files,
            [categoryId]: [...currentCategoryFiles, ...selectedFiles]
        });
    };

    const removeFile = (categoryId, indexToRemove) => {
        const currentCategoryFiles = files[categoryId] || [];

        setFiles({
            ...files,
            [categoryId]: currentCategoryFiles.filter((_, index) => index !== indexToRemove)
        });
    };

    return (
        <div className="mt-6 mb-4">
            {/* Section Header */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-1 capitalize">
                    {call_type ? call_type.replace('_', ' ') : 'Claim'} File Upload
                    <span className="text-red-500" title="Required fields">*</span>
                </h2>
                <p className="text-gray-600 mt-1 text-sm">
                    To process your {call_type ? call_type.replace('_', ' ') : 'claim'} claim quickly, please upload the required documentation below.
                    All categories marked with an asterisk (<span className="text-red-500">*</span>) are mandatory.
                </p>
            </div>

            {/* Global Error Message Banner */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm font-medium animate-pulse">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                    <span>{error.message || "Please upload all required files to proceed."}</span>
                </div>
            )}

            <div className="space-y-6">
                {uploadRequirements.map((req) => {
                    const categoryFiles = files[req.id] || [];
                    // Smart Check: This specific section is invalid if a global error exists AND it has 0 files AND it is required
                    const isSectionMissing = error && categoryFiles.length === 0 && req.required;

                    return (
                        <div
                            key={req.id}
                            className={`p-5 border rounded-lg transition-all duration-200 ${isSectionMissing
                                ? 'border-red-300 bg-red-50/30 ring-1 ring-red-200'
                                : 'border-gray-200 bg-gray-50'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {req.icon}
                                    <div>
                                        {/* Conditionally render the red asterisk */}
                                        <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                                            {req.label} {req.required && <span className="text-red-500">*</span>}
                                        </h3>
                                        <p className="text-sm text-gray-500">{req.description}</p>
                                    </div>
                                </div>

                                {/* Category Specific Error text */}
                                {isSectionMissing && (
                                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                                        File missing
                                    </span>
                                )}
                            </div>

                            {/* Upload Target Zone */}
                            <div className={`relative border-2 border-dashed rounded-lg p-6 hover:bg-gray-100 transition-colors text-center cursor-pointer bg-white ${isSectionMissing ? 'border-red-300' : 'border-gray-300'
                                }`}>
                                <input
                                    type="file"
                                    multiple
                                    accept={req.accept}
                                    required={req.required && categoryFiles.length === 0}
                                    onChange={(e) => handleFileChange(e, req.id)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                                    <FiUploadCloud className={`w-8 h-8 ${isSectionMissing ? 'text-red-400' : 'text-gray-400'}`} />
                                    <span className="text-sm font-medium text-blue-600">
                                        Click to upload or drag and drop
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {req.notes}
                                    </span>
                                </div>
                            </div>

                            {/* File Preview Cards */}
                            {categoryFiles.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {categoryFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded text-sm shadow-sm">
                                            <div className="flex items-center gap-2 truncate">
                                                <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span className="truncate text-gray-700">{file.name}</span>
                                                <span className="text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(req.id, index)}
                                                className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                                                title="Remove file"
                                            >
                                                <FiX className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UploadFileSection;