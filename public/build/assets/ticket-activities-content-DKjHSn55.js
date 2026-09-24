import{o as e,r as t}from"./rolldown-runtime-BM3Ffeng.js";import{n,t as r}from"./jsx-runtime-DBA9_yck.js";import{t as i}from"./clock-CCS4GFqk.js";import{t as a}from"./moment-DeFHJW9m.js";var o=t({default:()=>l}),s=e(n(),1),c=r();function l({props_data:e}){e?.ticket;let[t,n]=(0,s.useState)(e?.activities);return(0,s.useEffect)(()=>{n(e?.activities)},[e?.activities?.length]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`style`,{children:`
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
            `}),(0,c.jsxs)(`div`,{className:`tab-content-anim space-y-6`,children:[(0,c.jsxs)(`div`,{children:[(0,c.jsxs)(`h3`,{className:`text-lg font-bold text-slate-900 flex items-center gap-2`,children:[(0,c.jsx)(i,{className:`w-5 h-5 text-blue-600`}),` Activities & Audit History`]}),(0,c.jsx)(`p`,{className:`text-xs text-slate-500 mt-1`,children:`Real-time timeline of case updates, stage changes, and agent entries.`})]}),(0,c.jsx)(`div`,{className:`relative pl-6 border-l-2 border-slate-200 space-y-6 my-4`,children:t.map(e=>(0,c.jsxs)(`div`,{className:`relative group`,children:[(0,c.jsx)(`div`,{className:`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${e.type===`agent`?`bg-blue-600`:e.type===`customer`?`bg-emerald-500`:`bg-slate-400`}`}),(0,c.jsxs)(`div`,{className:`bg-slate-50 p-4 rounded-xl border border-slate-200`,children:[(0,c.jsxs)(`div`,{className:`flex justify-between items-center text-xs text-slate-500 mb-1`,children:[(0,c.jsx)(`span`,{className:`font-bold text-slate-700`,children:e?.user?.name??`Customer`}),(0,c.jsx)(`span`,{children:a(e.created_at).format(`LLL`)})]}),(0,c.jsx)(`p`,{className:`text-sm font-medium text-slate-800`,children:e.type})]})]},e.id))})]})]})}export{o as n,l as t};