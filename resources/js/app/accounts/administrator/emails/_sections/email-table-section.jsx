import React, { useState, useMemo } from 'react';

// Simulated data
const initialMockClaims = [
  {
    id: "claim_1",
    subject: "CF260925107206",
    from: "support2@curtiscs.com",
    to: "divineeats842@gmail.com",
    date: "2025-10-28T17:49:37.000Z",
    messageId: "19a2bf090c17ee44",
    count: 2,
    source: "Support2",
    attachments: [
      {
        name: "broken_fridge_door.jpg",
        contentType: "image/jpeg",
        size: 245000,
        fileUrl: "https://drive.google.com/file/d/mock_url_1/view"
      }
    ],
    threads: [
      {
        messageId: "19a2bf090c17ee44",
        date: "2025-10-28T17:49:37.000Z",
        from: "support2@curtiscs.com",
        body: "Hello,\n\nWe will cover this under warranty for you. Please provide your information below for verification.\n\nThank you,\nRhian Steinfield"
      },
      {
        messageId: "19a2d56892dbd170",
        date: "2025-10-29T00:20:32.000Z",
        from: "Miracle Lathan <divineeats842@gmail.com>",
        body: "Good Afternoon,\n\nWe would like a refund please.\n\nName: Latrecia Lathan\nStreet: 842 County Road 2625\nCity: Shelbyville"
      }
    ]
  },
  {
    id: "claim_2",
    subject: "CF050726165207",
    from: "Williamhbfr <william@example.com>",
    to: "support2@curtiscs.com",
    date: "2026-07-05T13:35:36.000Z",
    messageId: "19f327ddb29871c3",
    count: 1,
    source: "Support2",
    attachments: [
      {
        name: "receipt.pdf",
        contentType: "application/pdf",
        size: 102400,
        fileUrl: "https://drive.google.com/file/d/mock_url_2/view"
      }
    ],
    threads: [
      {
        messageId: "19f327ddb29871c3",
        date: "2026-07-05T13:35:36.000Z",
        from: "support2@curtiscs.com",
        body: "Warranty Claim Received 🛠️\n\nHi Williamhbfr,\nThank you for reaching out to Curtis International Ltd. We have successfully received your warranty claim request."
      }
    ]
  }
];

export default function EmailTableSection() {
  const [claims, setClaims] = useState(initialMockClaims);
  const [selectedId, setSelectedId] = useState(initialMockClaims[0]?.id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReplying, setIsReplying] = useState(true);
  const [replyText, setReplyText] = useState("");

  // Derived state for the currently selected claim
  const selectedClaim = useMemo(() => 
    claims.find(c => c.id === selectedId), 
  [claims, selectedId]);

  // Filtered claims for the sidebar
  const filteredClaims = useMemo(() => {
    return claims.filter(claim => 
      claim.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.from.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [claims, searchQuery]);

  // Handlers
  const handleResolve = () => {
    setClaims(prev => prev.filter(c => c.id !== selectedId));
    setSelectedId(null);
    setIsReplying(false);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    alert(`Mock Reply Sent:\n${replyText}`);
    setReplyText("");
    setIsReplying(false);
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar: List of Claims */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Warranty Claims</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {filteredClaims.length} Active
            </span>
          </div>
          {/* Interactive Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search subject or sender..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-3 space-y-2 bg-gray-50/50">
          {filteredClaims.length === 0 ? (
            <div className="text-center text-sm text-gray-400 mt-10">No claims found.</div>
          ) : (
            filteredClaims.map((claim) => (
              <div
                key={claim.id}
                onClick={() => {
                  setSelectedId(claim.id);
                  setIsReplying(false);
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedId === claim.id
                    ? 'bg-blue-50 border-blue-300 shadow-sm ring-1 ring-blue-300'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-gray-800 truncate pr-2">{claim.subject}</span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(claim.date)}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">{claim.threads[claim.threads.length - 1].from}</div>
                <div className="text-xs text-gray-400 mt-3 flex items-center gap-3">
                  <span className="flex items-center gap-1">💬 {claim.count}</span>
                  {claim.attachments.length > 0 && <span className="flex items-center gap-1">📎 {claim.attachments.length}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content: Claim Details */}
      <div className="w-2/3 flex flex-col bg-gray-50 relative">
        {selectedClaim ? (
          <>
            {/* Detail Header */}
            <div className="p-6 bg-white border-b border-gray-200 shadow-sm flex justify-between items-start z-10">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{selectedClaim.subject}</h1>
                <div className="flex gap-6 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-400">Source:</span> {selectedClaim.source}</p>
                  <p><span className="font-medium text-gray-400">Created:</span> {formatDate(selectedClaim.date)}</p>
                </div>
              </div>
          
            </div>

            {/* Attachments Banner */}
            {selectedClaim.attachments.length > 0 && (
              <div className="px-6 py-3 bg-white border-b border-gray-100 flex gap-3 overflow-x-auto items-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attachments:</span>
                {selectedClaim.attachments.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
                  >
                    📎 {file.name}
                  </a>
                ))}
              </div>
            )}

            {/* Thread History */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              <div className="space-y-6">
                {selectedClaim.threads.map((msg, idx) => (
                  <div key={msg.messageId} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {msg.from.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{msg.from}</p>
                          <p className="text-xs text-gray-500">{formatDate(msg.date)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                      {msg.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Composer Toggle */}
               <div className="mt-6 bg-white p-4 rounded-xl border border-blue-200 shadow-lg animate-fade-in-up">
                  <textarea 
                    autoFocus
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none mb-3"
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={handleSendReply}
                      className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <p className="text-lg font-medium text-gray-500">No Claim Selected</p>
            <p className="text-sm">Select a warranty claim from the sidebar to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}