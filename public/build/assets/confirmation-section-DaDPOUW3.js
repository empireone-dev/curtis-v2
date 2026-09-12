import"./rolldown-runtime-BM3Ffeng.js";import{n as e,t}from"./jsx-runtime-DBA9_yck.js";import{c as n}from"./app-Dp6Ra_YL.js";import{t as r}from"./useTranslation-Cq74Owti.js";e();var i=t();function a(){let{t:e}=r(),t=window.location.pathname.split(`/`)[2];return(0,i.jsxs)(`div`,{children:[(0,i.jsxs)(`div`,{className:`text-center mb-8`,children:[(0,i.jsx)(`span`,{className:`text-sm font-bold tracking-wider text-blue-800 uppercase mb-2 block drop-shadow-sm`,children:e(`confirmation.customer_intake`)}),(0,i.jsxs)(`h2`,{className:`text-2xl font-semibold text-blue-800`,children:[`"`,e(`confirmation.question`),`"`]})]}),(0,i.jsxs)(`div`,{className:`flex flex-col sm:flex-row gap-4 w-full`,children:[(0,i.jsx)(`button`,{type:`button`,onClick:()=>n.visit(`/resolution/${t}/verification`),className:`
            flex-1 py-4 px-6 rounded-xl border-2 text-lg font-semibold tracking-wide 
            transition-all duration-300 ease-in-out outline-none shadow-md scale-[1.02]
            border-blue-400 bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 
            hover:from-blue-100 hover:to-blue-200 hover:border-blue-500 hover:shadow-lg hover:scale-105
        `,children:e(`confirmation.yes`)}),(0,i.jsx)(`button`,{onClick:()=>n.visit(`/resolution/${t}/blank`),type:`button`,className:`
            flex-1 py-4 px-6 rounded-xl border-2 text-lg font-semibold tracking-wide 
            transition-all duration-300 ease-in-out outline-none shadow-md scale-[1.02]
            border-gray-400 bg-gradient-to-b from-gray-50 to-gray-100 text-blue-700 
            hover:from-gray-100 hover:to-gray-200 hover:border-gray-500 hover:shadow-lg hover:scale-105
        `,children:e(`confirmation.no`)})]})]})}export{a as default};