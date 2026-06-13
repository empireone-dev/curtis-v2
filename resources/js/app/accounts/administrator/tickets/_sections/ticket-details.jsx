import React, { useState } from 'react';
import { 
  Compass, LayoutDashboard, AlertTriangle, ArrowLeft, 
  User, Package, FileText, Image as ImageIcon, Video, 
  MessageSquare, Send, CheckCircle, Clock, XCircle 
} from 'lucide-react';

const TicketDetails = () => {
  const [ticketStatus, setTicketStatus] = useState('pending');
  const [internalNote, setInternalNote] = useState('');

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 lg:px-10 shrink-0 z-10">
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 font-medium mb-1">
              Dashboard &gt; Safety Concerns &gt; <span className="text-blue-600">Ticket #SC-8492</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">Ticket #SC-8492</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200 uppercase tracking-wide">
                <Clock size={12} /> Pending Review
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200 uppercase tracking-wide">
                High Priority
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Processing Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN: Submission Details (2/3 width) */}
            <div className="xl:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User size={16} /> Customer Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">Sarah Jenkins</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="text-gray-900">sarah.j@example.com</p>
                      <p className="text-gray-900">(555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-gray-900">123 Maple Street, Apt 4B<br/>Seattle, WA 98101<br/>United States</p>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Package size={16} /> Product Information
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Model Number</p>
                      <p className="font-medium text-gray-900 bg-gray-100 inline-block px-2 py-1 rounded mt-1">RCA-TV-55</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Serial Number</p>
                      <p className="font-mono text-gray-900 bg-gray-100 inline-block px-2 py-1 rounded mt-1">A1234567890123456</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Purchase Date</p>
                        <p className="text-gray-900">10/12/2023</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Warranty Status</p>
                        <p className="text-green-600 font-medium">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText size={16} /> Issue Explanation
                </h2>
                <div className="bg-red-50 text-red-900 p-4 rounded-lg border border-red-100 text-sm leading-relaxed">
                  "I was watching TV last night and heard a loud popping noise from the back panel. Immediately after, there was a smell of burning plastic and smoke started coming out of the top vents. I unplugged it immediately but it feels extremely hot to the touch. I am worried it might start a fire."
                </div>
              </div>

              {/* Uploaded Evidence */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ImageIcon size={16} /> Customer Uploads
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Evidence Item */}
                  <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors cursor-pointer group">
                    <div className="bg-gray-100 h-32 rounded flex items-center justify-center text-gray-400 group-hover:text-blue-500 mb-2">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">receipt_bestbuy.jpg</p>
                    <p className="text-xs text-gray-500">Bill of Sale</p>
                  </div>
                  {/* Evidence Item */}
                  <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors cursor-pointer group">
                    <div className="bg-gray-100 h-32 rounded flex items-center justify-center text-gray-400 group-hover:text-blue-500 mb-2">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">plate_sn.jpg</p>
                    <p className="text-xs text-gray-500">Model & Serial</p>
                  </div>
                  {/* Evidence Item */}
                  <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors cursor-pointer group">
                    <div className="bg-gray-100 h-32 rounded flex items-center justify-center text-gray-400 group-hover:text-blue-500 mb-2">
                      <Video size={32} />
                    </div>
                    <p className="text-sm font-medium text-gray-800 truncate">smoke_video.mov</p>
                    <p className="text-xs text-gray-500 text-red-500 font-medium">Issue Evidence</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Resolution Panel (1/3 width) */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
                  Process & Resolve
                </h2>
                
                {/* Status Update */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                  <div className="space-y-2">
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${ticketStatus === 'pending' ? 'bg-yellow-50 border-yellow-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="status" value="pending" className="mr-3" checked={ticketStatus === 'pending'} onChange={() => setTicketStatus('pending')} />
                      <Clock size={16} className={`mr-2 ${ticketStatus === 'pending' ? 'text-yellow-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Needs Review</span>
                    </label>
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${ticketStatus === 'approved' ? 'bg-green-50 border-green-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="status" value="approved" className="mr-3" checked={ticketStatus === 'approved'} onChange={() => setTicketStatus('approved')} />
                      <CheckCircle size={16} className={`mr-2 ${ticketStatus === 'approved' ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Approve Return/Recall</span>
                    </label>
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${ticketStatus === 'more_info' ? 'bg-blue-50 border-blue-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="status" value="more_info" className="mr-3" checked={ticketStatus === 'more_info'} onChange={() => setTicketStatus('more_info')} />
                      <MessageSquare size={16} className={`mr-2 ${ticketStatus === 'more_info' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Request More Info</span>
                    </label>
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${ticketStatus === 'denied' ? 'bg-red-50 border-red-400' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="status" value="denied" className="mr-3" checked={ticketStatus === 'denied'} onChange={() => setTicketStatus('denied')} />
                      <XCircle size={16} className={`mr-2 ${ticketStatus === 'denied' ? 'text-red-600' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Deny Claim</span>
                    </label>
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
                    Internal Resolution Notes
                    <span className="text-xs text-gray-400 font-normal">Customer won't see this</span>
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Document your findings and steps taken..."
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                  />
                </div>

                {/* Submit Action */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Send size={18} /> Process Ticket
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketDetails;