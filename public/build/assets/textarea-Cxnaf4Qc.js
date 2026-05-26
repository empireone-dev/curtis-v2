import{o as e,r as t}from"./rolldown-runtime-BM3Ffeng.js";import{n,t as r}from"./jsx-runtime-DBA9_yck.js";var i=t({default:()=>s}),a=e(n(),1),o=r(),s=(0,a.forwardRef)(({label:e,id:t,error:n,icon:r,required:i,rows:a=4,...s},c)=>(0,o.jsxs)(`div`,{className:`w-full`,children:[(0,o.jsxs)(`div`,{className:`relative`,children:[r&&(0,o.jsx)(`div`,{className:`absolute left-4 top-3.5 text-gray-400 pointer-events-none`,children:r}),(0,o.jsx)(`textarea`,{ref:c,id:t,rows:a,placeholder:` `,className:`
                        border-blue-500
                        peer w-full rounded-lg border-2 bg-transparent px-4 py-3 text-gray-900 outline-none transition-all duration-200 resize-y min-h-[100px]
                        ${r?`pl-11`:``} 
                        ${n?`border-red-500 focus:border-red-500`:`border-blue-400 focus:border-blue-600 hover:border-blue-500`}
                    `,...s}),(0,o.jsx)(`label`,{htmlFor:t,className:`
                        absolute bg-white px-1 pointer-events-none transition-all duration-200
                        ${r?`left-10`:`left-3`}
                        
                        /* 1. Base/Filled State (Sitting on the top border, masking the line) */
                        -top-2.5 translate-y-0 text-xs font-medium
                        ${n?`text-red-500`:`text-blue-500`}
                        
                        /* 2. Inactive/Empty State (Positioned near the top for textarea) */
                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400
                        
                        peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium
                        ${n?`peer-focus:text-red-500`:`peer-focus:text-blue-600`}
                    `,children:(0,o.jsxs)(`div`,{className:`flex gap-0.5`,children:[e,i&&(0,o.jsx)(`span`,{className:`text-red-500 font-medium`,children:`*`})]})})]}),n&&(0,o.jsxs)(`p`,{className:`mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1`,children:[(0,o.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,className:`h-3 w-3`,viewBox:`0 0 20 20`,fill:`currentColor`,children:(0,o.jsx)(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z`,clipRule:`evenodd`})}),n]})]}));s.displayName=`Textarea`;export{i as n,s as t};