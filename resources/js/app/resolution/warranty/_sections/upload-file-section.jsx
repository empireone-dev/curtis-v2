import React, { useState } from 'react';
import { FiUploadCloud, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaFileImage, FaFileVideo } from 'react-icons/fa';

const UploadFileSection = ({ files, setFiles }) => {
    const uploadRequirements = [
        {
            id: 'modelSerial',
            label: 'Model & Serial Number',
            description: 'Clear and readable picture of the model & serial number sticker/plate.',
            accept: 'image/*',
            icon: <FaFileImage className="w-6 h-6 text-blue-500" />
        },
        {
            id: 'receipt',
            label: 'Bill of Sale',
            description: 'Clear picture showing store name, purchase date, price, and unit description.',
            accept: 'image/*',
            icon: <FaFileImage className="w-6 h-6 text-green-500" />
        },
        {
            id: 'issueEvidence',
            label: 'Issue Evidence',
            description: 'Clear picture or video demonstrating the issue or defect.',
            accept: 'image/*,video/*',
            icon: <FaFileVideo className="w-6 h-6 text-purple-500" />
        }
    ];

    const handleFileChange = (e, categoryId) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles({
            ...files,
            [categoryId]: [...files[categoryId], ...selectedFiles]
        });
    };

    const removeFile = (categoryId, indexToRemove) => {
        setFiles({
            ...files,
            [categoryId]: files[categoryId].filter((_, index) => index !== indexToRemove)
        });
    };

    return (
        <div className="mt-6 mb-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">Warranty File Upload</h2>
                <p className="text-gray-600 mt-1 text-sm">
                    To process your warranty claim quickly, please upload the required documentation below.
                </p>
            </div>

            <div className="space-y-6">
                {uploadRequirements.map((req) => (
                    <div key={req.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {req.icon}
                                <div>
                                    <h3 className="font-semibold text-gray-800">{req.label}</h3>
                                    <p className="text-sm text-gray-500">{req.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition-colors text-center cursor-pointer bg-white">
                            <input
                                type="file"
                                multiple
                                accept={req.accept}
                                onChange={(e) => handleFileChange(e, req.id)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                                <FiUploadCloud className="w-8 h-8 text-gray-400" />
                                <span className="text-sm font-medium text-blue-600">Click to upload or drag and drop</span>
                                <span className="text-xs text-gray-400">Supported formats: {req.accept.replace('/*', '')}</span>
                            </div>
                        </div>

                        {files[req.id]?.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {files[req.id].map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded text-sm">
                                        <div className="flex items-center gap-2 truncate">
                                            <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            <span className="truncate text-gray-700">{file.name}</span>
                                            <span className="text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(req.id, index)}
                                            className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                                        >
                                            <FiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadFileSection;