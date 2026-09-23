import React, { useState } from 'react';
import { CheckCircle2, Upload, FileImage, Loader2 } from 'lucide-react';
import { upload_files_service } from '@/app/services/tickets-service';
import store from '@/app/store/store';
import { get_tickets_thunk } from '@/app/_redux/tickets-thunk';

export default function TicketUploadContent({ props_data }) {
    // Ticket ID reference
    const ticketId = props_data?.id;


    const searchParams = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams()
    const page = searchParams.get('page') || 1
    const per_page = searchParams.get('per_page') || 5

    // State to store which image type the agent has selected
    const [selectedImageType, setSelectedImageType] = useState('bill_of_sale');
    const [isUploading, setIsUploading] = useState(false);

    const imageTypeOptions = [
        { key: 'readable_serial_section', label: 'Readable Serial Section' },
        { key: 'bill_of_sale', label: 'Bill of Sale / Receipt' },
        { key: 'parts_model', label: 'Parts & Model Plate' },
        { key: 'defect_issue', label: 'Defect / Issue Photo' },
    ];

    console.log('props_data', props_data.id)

    // Handler when agent changes the selected image type
    const handleRadioChange = (key) => {
        setSelectedImageType(key);

    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);

        try {
            // Call the service with ticket ID, selected category, and files
            await upload_files_service(ticketId, selectedImageType, files);
            await store.dispatch(get_tickets_thunk({ page, per_page }))

        } catch (error) {
            console.error('File upload failed:', error);
        } finally {
            setIsUploading(false);
            e.target.value = null; // Clear input field so the same file can be re-uploaded if needed
        }
    };

    return (
        <div className="space-y-4">
            {/* Image Category Radio Selection Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <FileImage className="w-4 h-4 text-blue-600" /> Select Document / Image Category
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                        Category: <strong className="text-blue-600 font-mono capitalize">{selectedImageType.replace(/_/g, ' ')}</strong>
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {imageTypeOptions.map((item) => {
                        const isSelected = selectedImageType === item.key;

                        return (
                            <label
                                key={item.key}
                                className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition cursor-pointer select-none ${isSelected
                                    ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-sm ring-1 ring-blue-500/20'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100/50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="image_type_selection"
                                    value={item.key}
                                    checked={isSelected}
                                    onChange={() => handleRadioChange(item.key)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                                />
                                <span className="truncate">{item.label}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Upload Drop Zone */}
            <div className={`relative border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-8 text-center transition group cursor-pointer ${isUploading ? 'opacity-60 pointer-events-none' : ''
                }`}>
                <input
                    type="file"
                    multiple
                    disabled={isUploading}
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                    {isUploading ? (
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    ) : (
                        <Upload className="w-6 h-6 text-blue-600" />
                    )}
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                    {isUploading ? 'Uploading files...' : (
                        <>
                            Upload image for{' '}
                            <span className="text-blue-600 underline">
                                {imageTypeOptions.find(i => i.key === selectedImageType)?.label}
                            </span>
                        </>
                    )}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                    Click to browse or drag and drop image files here.
                </p>
            </div>
        </div>
    );
}