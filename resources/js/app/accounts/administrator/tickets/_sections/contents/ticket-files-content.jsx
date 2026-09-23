import React, { useState } from 'react';
import {
    ImageIcon,
    CheckCircle2,
    Upload,
    FileText,
    Trash2,
    X
} from 'lucide-react';

export default function TicketFilesContent({ props_data }) {
    const ticketData = props_data?.ticket || props_data || {};

    // Local States
    const [lightboxImage, setLightboxImage] = useState(null);

    const [checklist, setChecklist] = useState({
        storeName: true,
        purchaseDate: true,
        itemDesc: true,
        unitPrice: false,
        totalPaid: true
    });

    const [files, setFiles] = useState(props_data?.files || ticketData?.files || [
        {
            id: 1,
            name: 'Bill_Of_Sale_Receipt_BestBuy.png',
            size: '2.4 MB',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800',
            status: 'Verified',
            uploadedAt: 'Yesterday 14:22'
        },
        {
            id: 2,
            name: 'Fridge_Serial_Number_Plate.jpg',
            size: '1.8 MB',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
            status: 'Pending Review',
            uploadedAt: 'Yesterday 14:25'
        }
    ]);

    // Handlers
    const toggleChecklist = (key) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files || []);
        if (uploadedFiles.length === 0) return;

        uploadedFiles.forEach(f => {
            const newFile = {
                id: Date.now() + Math.random(),
                name: f.name,
                size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
                type: f.type.includes('image') ? 'image' : 'document',
                url: URL.createObjectURL(f),
                status: 'Pending Review',
                uploadedAt: 'Just now'
            };
            setFiles(prev => [newFile, ...prev]);
        });
    };

    const deleteFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const toggleFileStatus = (id) => {
        setFiles(prev => prev.map(f => {
            if (f.id === id) {
                return { ...f, status: f.status === 'Verified' ? 'Pending Review' : 'Verified' };
            }
            return f;
        }));
    };

    return (
        <>
            <style>{`
                @keyframes tabFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(6px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .tab-content-anim {
                    animation: tabFadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            <div className="tab-content-anim space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" /> {props_data?.call_type}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        A clear and readable picture of the bill of sale is required.
                    </p>
                </div>

                {/* Bill of Sale Checklist Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bill of Sale Requirement Checklist
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                            {Object.values(checklist).filter(Boolean).length} / {Object.keys(checklist).length} Criteria Met
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                        {[
                            { key: 'storeName', label: 'Store Name & Address' },
                            { key: 'purchaseDate', label: 'Date of Purchase' },
                            { key: 'itemDesc', label: 'Item Description' },
                            { key: 'unitPrice', label: 'Unit Price' },
                            { key: 'totalPaid', label: 'Total Amount Paid' }
                        ].map(item => (
                            <button
                                key={item.key}
                                onClick={() => toggleChecklist(item.key)}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition text-left ${checklist[item.key]
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 transition ${checklist[item.key] ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                                    }`}>
                                    {checklist[item.key] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <span className="truncate">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Drop Zone */}
                <div className="relative border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 rounded-2xl p-8 text-center transition group cursor-pointer">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                        <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">
                        To Upload: Click to browse or drag and drop bill of sale
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">If customer does not have bill of sale, contact dealer's care department.</p>
                </div>

                {/* Attached Documents Grid */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Attached Files Preview
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map(file => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {file.type === 'image' ? (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0 cursor-pointer"
                                            onClick={() => setLightboxImage(file.url)}
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                    )}

                                    <div className="truncate">
                                        <div className="text-xs font-bold text-slate-800 truncate">{file.name}</div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">{file.size} • Uploaded {file.uploadedAt}</div>
                                        <button
                                            onClick={() => toggleFileStatus(file.id)}
                                            className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${file.status === 'Verified'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : 'bg-amber-100 text-amber-800'
                                                }`}
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            {file.status}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 flex-shrink-0">
                                    {file.type === 'image' && (
                                        <button
                                            onClick={() => setLightboxImage(file.url)}
                                            className="p-2 text-slate-400 hover:text-blue-600 transition rounded-lg hover:bg-slate-200"
                                            title="Expand Image"
                                        >
                                            <ImageIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteFile(file.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 transition rounded-lg hover:bg-slate-200"
                                        title="Delete File"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Image Preview Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                    onClick={() => setLightboxImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-black transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img src={lightboxImage} alt="Document Lightbox" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
                    </div>
                </div>
            )}
        </>
    );
}