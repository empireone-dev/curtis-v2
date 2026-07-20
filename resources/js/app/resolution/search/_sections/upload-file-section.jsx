import React, { useState } from 'react';
import { FiUploadCloud, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaFileImage, FaFileVideo } from 'react-icons/fa';

const UploadFileSection = ({ files = {}, setFiles, error, parts_issue, watchValues }) => {
    const [formatError, setFormatError] = useState('');
    
    const pathParts = window.location.pathname.split('/');
    const call_type = pathParts.length > 2 ? pathParts[2] : ''; 
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const rawLackings = urlParams.get('lackings');
    const lackings = rawLackings ? rawLackings.split(',') : [];
    const notes = urlParams.get('notes');
    
    console.log('lackingslackings', lackings);
    
    const uploadRequirements = [
        call_type !== 'product_registration' ? {
            id: 'readable_serial_section',
            label: 'Model & Serial Number',
            description: 'Clear and readable picture of the model & serial number sticker/plate.',
            accept: '.jpg,.jpeg,.png',
            notes: 'Max size: 10MB. Formats: JPG, PNG.',
            icon: <FaFileImage className="w-6 h-6 text-blue-500" />,
            required: true
        } : null,

        {
            id: 'bill_of_sale',
            label: 'Bill of Sale / Receipt',
            description: 'Clear picture showing store name, purchase date, price, and unit description.',
            accept: '.jpg,.jpeg,.png',
            notes: 'Max size: 10MB. Formats: JPG, PNG.',
            icon: <FaFileImage className="w-6 h-6 text-green-500" />,
            required: call_type === "safety_issue" || parts_issue === '["Want to buy Parts"]' ? false : true
        },

        call_type === 'parts'
            ? {
                id: 'parts_model',
                label: 'Photo of the parts',
                description: (
                    <>
                        * Clear picture of the part/s you need.<br />
                        * Clear photo of the unit in which the missing/damaged part is located.
                    </>
                ),
                accept: '.jpg,.jpeg,.png,.mp4,.mov',
                notes: 'Max size: 50MB. Formats: JPG, PNG, MP4, MOV. Videos compressed under 30 seconds preferred.',
                icon: <FaFileVideo className="w-6 h-6 text-purple-500" />,
                required: true
            }
            : call_type !== 'product_registration'
                ? {
                    id: 'defect_issue',
                    label: 'Issue Evidence',
                    description: 'Clear picture or video demonstrating the issue or defect.',
                    accept: '.jpg,.jpeg,.png,.mp4,.mov',
                    notes: 'Max size: 50MB. Formats: JPG, PNG, MP4, MOV. Videos compressed under 30 seconds preferred.',
                    icon: <FaFileVideo className="w-6 h-6 text-purple-500" />,
                    required: true
                }
                : null
    ].filter(Boolean);

    const handleFileChange = (e, req) => {
        const selectedFiles = Array.from(e.target.files);
        const currentCategoryFiles = files[req.id] || [];

        const allowedImageExtensions = ['.jpg', '.jpeg', '.png'];
        const allowedVideoExtensions = ['.mp4', '.mov'];

        let hasInvalidFile = false;

        const validFiles = selectedFiles.filter(file => {
            const extension = '.' + file.name.split('.').pop().toLowerCase();

            if (req.accept === '.jpg,.jpeg,.png') {
                const isValidImg = allowedImageExtensions.includes(extension);
                if (!isValidImg) hasInvalidFile = true;
                return isValidImg;
            } else {
                const isValidImg = allowedImageExtensions.includes(extension);
                const isValidVid = allowedVideoExtensions.includes(extension);
                if (!isValidImg && !isValidVid) hasInvalidFile = true;
                return isValidImg || isValidVid;
            }
        });

        if (hasInvalidFile) {
            setFormatError("Unsupported file format. Please upload a JPG, PNG, MP4, or MOV file.");
        } else {
            setFormatError(''); 
        }

        if (validFiles.length > 0) {
            setFiles({
                ...files,
                [req.id]: [...currentCategoryFiles, ...validFiles]
            });
        }
    };

    const removeFile = (categoryId, indexToRemove) => {
        const currentCategoryFiles = files[categoryId] || [];
        setFiles({
            ...files,
            [categoryId]: currentCategoryFiles.filter((_, index) => index !== indexToRemove)
        });
    };

    const default_files = watchValues?.uploaded_files || {};

    return (
        <div className="">
            {notes && (
                <div className='border border-blue-500 rounded-md p-2 text-blue-500 shadow-sm mb-4 bg-blue-100'>
                    Agent Note :<br /> 
                    <div className='px-3'>
                        {notes}
                    </div>
                </div>
            )}
            
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-1 capitalize">
                    {call_type ? call_type.replace(/_/g, ' ') : 'Claim'} File Upload
                    <span className="text-red-500" title="Required fields">*</span>
                </h2>

                <p className="text-gray-600 mt-1 text-sm">
                    To process your {call_type ? call_type.replace(/_/g, ' ') : 'claim'} claim quickly, please upload the required documentation below.
                    All categories marked with an asterisk (<span className="text-red-500">*</span>) are mandatory.
                </p>
            </div>
            
            {formatError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm font-medium transition-all duration-200">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                    <span>{formatError}</span>
                </div>
            )}

            {error && !formatError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm font-medium animate-pulse">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                    <span>{error.message || "Please upload all required files to proceed."}</span>
                </div>
            )}

            <div className="space-y-6">
                {uploadRequirements.map((req) => {
                    const categoryFiles = files[req.id] || [];
                    
                    // NEW LOGIC: Only required if it's explicitly set to required AND it's in the lackings list
                    const isDynamicRequired = req.required && lackings.includes(req.id);
                    
                    // The section is missing if there's a global error, no files uploaded, and it is actually required
                    const isSectionMissing = error && categoryFiles.length === 0 && isDynamicRequired;
                    
                    return (
                        <div
                            key={req.id}
                            className={`p-5 border rounded-lg transition-all duration-200 ${
                                isSectionMissing
                                    ? 'border-red-300 bg-red-50/30 ring-1 ring-red-200'
                                    : 'border-gray-200 bg-gray-50'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {req.icon}
                                    <div>
                                        <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                                            {/* Render asterisk only if dynamically required */}
                                            {req.label} {isDynamicRequired && <span className="text-red-500">*</span>}
                                        </h3>
                                        <p className="text-sm text-gray-500">{req.description}</p>
                                    </div>
                                </div>

                                {isSectionMissing && (
                                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                                        File missing
                                    </span>
                                )}
                            </div>

                            {/* Only show the upload section if the req.id is in the lackings array */}
                            {lackings.includes(req.id) && (
                                <div className={`relative border-2 border-dashed rounded-lg p-6 hover:bg-gray-100 transition-colors text-center cursor-pointer bg-white ${
                                    isSectionMissing ? 'border-red-300' : 'border-gray-300'
                                }`}>
                                    <input
                                        type="file"
                                        accept={req.accept}
                                        required={isDynamicRequired && categoryFiles.length === 0}
                                        onChange={(e) => handleFileChange(e, req)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        multiple 
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
                            )}

                            {/* Previous Uploads (Will ALWAYS show if they exist, regardless of lackings array) */}
                            {default_files?.[req.id] && (
                                <div className="mt-4 space-y-2">
                                    {default_files[req.id].map((file, index) => (
                                        <a
                                            target='_blank'
                                            rel="noopener noreferrer"
                                            href={file.url}
                                            key={index} 
                                            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded text-sm shadow-sm hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2 truncate">
                                                <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span className="truncate text-gray-700">{file.url}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                            
                            {/* Newly Uploaded File Preview Cards */}
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