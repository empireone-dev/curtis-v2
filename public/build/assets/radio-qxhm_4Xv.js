import{o as e,r as t}from"./rolldown-runtime-BM3Ffeng.js";import{n,t as r}from"./jsx-runtime-DBA9_yck.js";var i=t({default:()=>s}),a=e(n(),1),o=r(),s=(0,a.forwardRef)(({id:e,label:t,description:n,error:r,disabled:i=!1,className:a=``,value:s=``,checked:c,...l},u)=>{let d=c===void 0?void 0:!!c;return(0,o.jsxs)(`div`,{className:`flex items-start ${a}`,children:[(0,o.jsxs)(`div`,{className:`relative flex items-center justify-center pt-0.5`,children:[(0,o.jsx)(`input`,{type:`radio`,id:e,ref:u,disabled:i,value:s,...d!==void 0&&{checked:d},className:`
                        peer appearance-none w-5 h-5 border-2 rounded-full shrink-0 bg-white
                        transition-all duration-200 cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-offset-1
                        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200
                        ${r?`border-red-500 focus:ring-red-500`:`border-gray-300 focus:ring-blue-500 checked:border-blue-600 hover:border-blue-500`}
                    `,...l}),(0,o.jsx)(`div`,{className:`
                        absolute w-2.5 h-2.5 rounded-full pointer-events-none opacity-0 scale-50
                        peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 ease-out
                        ${i?`bg-gray-400`:``}
                    `})]}),(t||n||r)&&(0,o.jsxs)(`div`,{className:`ml-3 flex flex-col`,children:[t&&(0,o.jsx)(`label`,{htmlFor:e,className:`
                                text-sm font-medium transition-colors select-none
                                ${i?`text-gray-400 cursor-not-allowed`:`text-gray-700 cursor-pointer hover:text-gray-900`}
                            `,children:t}),n&&!r&&(0,o.jsx)(`span`,{className:`text-xs mt-0.5 ${i?`text-gray-400`:`text-gray-500`}`,children:n}),r&&(0,o.jsxs)(`span`,{className:`text-xs text-red-500 mt-1 font-medium flex items-center gap-1`,children:[(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,className:`h-3 w-3`,viewBox:`0 0 20 20`,fill:`currentColor`,children:(0,o.jsx)(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z`,clipRule:`evenodd`})}),r]})]})]})});s.displayName=`Radio`;export{i as n,s as t};