import{i as e,n as t}from"./rolldown-runtime-DWdDZTNf.js";import{n,t as r}from"./jsx-runtime-YWENcNzD.js";var i=t({default:()=>s}),a=e(n(),1),o=r(),s=(0,a.forwardRef)(({label:e,id:t,type:n=`text`,error:r,icon:i,required:s,...c},l)=>{let[u,d]=(0,a.useState)(!1);return(0,o.jsxs)(`div`,{className:`w-full`,children:[(0,o.jsxs)(`div`,{className:`relative`,children:[i&&(0,o.jsx)(`div`,{className:`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`,children:i}),(0,o.jsx)(`input`,{ref:l,id:t,type:n===`password`&&u?`text`:n,placeholder:` `,className:`
                        border-blue-500
                        peer w-full h-12 rounded-lg border-2 bg-transparent px-4 text-gray-900 outline-none transition-all duration-200
                        ${i?`pl-11`:``} 
                        ${n===`password`?`pr-11`:``}
                        ${r?`border-red-500 focus:border-red-500`:`border-blue-400 focus:border-blue-600 hover:border-blue-500`}
                    `,...c}),(0,o.jsx)(`label`,{htmlFor:t,className:`
                        absolute bg-white px-1 pointer-events-none transition-all duration-200
                        ${i?`left-10`:`left-3`}
                        
                        /* 1. Base/Filled State (Sitting on the top border, masking the line) */
                        -top-2.5 translate-y-0 text-xs font-medium
                        ${r?`text-red-500`:`text-blue-500`}
                        
                        /* 2. Inactive/Empty State (Centered inside the input) */
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
                        
                        peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium
                        ${r?`peer-focus:text-red-500`:`peer-focus:text-blue-600`}
                    `,children:(0,o.jsxs)(`div`,{className:`flex gap-0.5`,children:[e,s&&(0,o.jsx)(`span`,{className:`text-red-500 font-medium`,children:`*`})]})}),n===`password`&&(0,o.jsx)(`button`,{type:`button`,onClick:()=>d(!u),className:`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none`,children:u?(0,o.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,className:`h-5 w-5`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24`}),(0,o.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`})]}):(0,o.jsxs)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,className:`h-5 w-5`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`path`,{d:`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z`}),(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`})]})})]}),r&&(0,o.jsxs)(`p`,{className:`mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1`,children:[(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,className:`h-3 w-3`,viewBox:`0 0 20 20`,fill:`currentColor`,children:(0,o.jsx)(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z`,clipRule:`evenodd`})}),r]})]})});s.displayName=`Input`;export{i as n,s as t};