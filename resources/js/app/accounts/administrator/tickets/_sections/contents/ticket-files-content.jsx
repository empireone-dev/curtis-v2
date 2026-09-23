import React, { useEffect, useState } from 'react';
import {
    ImageIcon,
    CheckCircle2,
    X
} from 'lucide-react';
import TicketUploadContent from './ticket-upload-content';

export default function TicketFilesContent({ props_data }) {
    const [files, setFiles] = useState(props_data?.files);

    useEffect(() => {
        setFiles(props_data?.files)
    }, [props_data?.files?.length])

    return (
        <>
            <div className="tab-content-anim space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" /> {props_data?.call_type}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        A clear and readable picture of the bill of sale is required.
                    </p>
                </div>


                <TicketUploadContent props_data={props_data} />

                {/* Attached Documents Grid */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Attached Files Preview
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {files.map(file => (
                            <a
                                target='_blank'
                                href={file?.url}
                                key={file.id}
                                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {file.url && <img
                                        src={file.url}
                                        alt={file.name}
                                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0 cursor-pointer"

                                    />}
                                    <div className="truncate">
                                        <div className="text-xs font-bold text-slate-800 truncate capitalize">{file.type.replace(/_/g, ' ')}</div>
                                        <div className="text-[10px] text-slate-400 mt-0.5">{file.size} • Uploaded {file.uploadedAt}</div>
                                        <a
                                            className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-emerald-800`}
                                        >
                                            <CheckCircle2 className="w-3 h-3" />
                                            {file.status}
                                        </a>
                                    </div>
                                </div>


                            </a>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}