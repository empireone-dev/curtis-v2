import{o as e,r as t}from"./rolldown-runtime-BM3Ffeng.js";import{n,t as r}from"./jsx-runtime-DBA9_yck.js";import{t as i}from"./clock-CCS4GFqk.js";var a=t({default:()=>c}),o=e(n(),1),s=r();function c({props_data:e}){let t=e?.ticket||e||{},[n]=(0,o.useState)(e?.activities||[{id:1,user:`System Intake`,text:`Case File created via Web Form intake portal`,time:`1 day ago`,type:`system`},{id:2,user:`${`${t?.fname||t?.user?.fname||t?.customer?.fname||``} ${t?.lname||t?.user?.lname||t?.customer?.lname||``}`.trim()||t?.fullname||`Marcus Vance`} (Customer)`,text:`Uploaded proof of purchase bill of sale and serial plate photo`,time:`1 day ago`,type:`customer`},{id:3,user:`Support Agent`,text:`Verified Store Name and Purchase Date validity on receipt`,time:`2 hours ago`,type:`agent`}]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`style`,{children:`
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
            `}),(0,s.jsxs)(`div`,{className:`tab-content-anim space-y-6`,children:[(0,s.jsxs)(`div`,{children:[(0,s.jsxs)(`h3`,{className:`text-lg font-bold text-slate-900 flex items-center gap-2`,children:[(0,s.jsx)(i,{className:`w-5 h-5 text-blue-600`}),` Activities & Audit History`]}),(0,s.jsx)(`p`,{className:`text-xs text-slate-500 mt-1`,children:`Real-time timeline of case updates, stage changes, and agent entries.`})]}),(0,s.jsx)(`div`,{className:`relative pl-6 border-l-2 border-slate-200 space-y-6 my-4`,children:n.map(e=>(0,s.jsxs)(`div`,{className:`relative group`,children:[(0,s.jsx)(`div`,{className:`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${e.type===`agent`?`bg-blue-600`:e.type===`customer`?`bg-emerald-500`:`bg-slate-400`}`}),(0,s.jsxs)(`div`,{className:`bg-slate-50 p-4 rounded-xl border border-slate-200`,children:[(0,s.jsxs)(`div`,{className:`flex justify-between items-center text-xs text-slate-500 mb-1`,children:[(0,s.jsx)(`span`,{className:`font-bold text-slate-700`,children:e.user}),(0,s.jsx)(`span`,{children:e.time})]}),(0,s.jsx)(`p`,{className:`text-sm font-medium text-slate-800`,children:e.text})]})]},e.id))})]})]})}export{a as n,c as t};