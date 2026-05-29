import{o as e}from"./rolldown-runtime-BM3Ffeng.js";import{n as t,t as n}from"./jsx-runtime-DBA9_yck.js";import{C as r,_ as i,a,b as o,c as s,d as c,f as l,g as u,h as d,i as f,l as p,m,o as h,p as g,r as ee,s as te,t as _,u as v,v as ne,w as y,x as b,y as x}from"./proxy-D9qr3jk8.js";import{t as re}from"./AnimatePresence-CwCXamba.js";function S(e,t){let n,r=()=>{let{currentTime:r}=t,i=(r===null?0:r.value)/100;n!==i&&e(i),n=i};return d.preUpdate(r,!0),()=>m(r)}function ie(...e){let t=!Array.isArray(e[0]),n=t?0:-1,r=e[0+n],i=e[1+n],a=e[2+n],o=e[3+n],s=g(i,a,o);return t?s(r):s}function C(e){return typeof window>`u`?!1:e?c():v()}var ae=50,w=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),oe=()=>({time:0,x:w(),y:w()}),T={x:{length:`Width`,position:`Left`},y:{length:`Height`,position:`Top`}};function E(e,t,n,r){let a=n[t],{length:o,position:s}=T[t],c=a.current,l=n.time;a.current=Math.abs(e[`scroll${s}`]),a.scrollLength=e[`scroll${o}`]-e[`client${o}`],a.offset.length=0,a.offset[0]=0,a.offset[1]=a.scrollLength,a.progress=ne(0,a.scrollLength,a.current);let u=r-l;a.velocity=u>ae?0:i(a.current-c,u)}function se(e,t,n){E(e,`x`,t,n),E(e,`y`,t,n),t.time=n}function ce(e,t){let n={x:0,y:0},r=e;for(;r&&r!==t;)if(te(r))n.x+=r.offsetLeft,n.y+=r.offsetTop,r=r.offsetParent;else if(r.tagName===`svg`){let e=r.getBoundingClientRect();r=r.parentElement;let t=r.getBoundingClientRect();n.x+=e.left-t.left,n.y+=e.top-t.top}else if(r instanceof SVGGraphicsElement){let{x:e,y:t}=r.getBBox();n.x+=e,n.y+=t;let i=null,a=r.parentNode;for(;!i;)a.tagName===`svg`&&(i=a),a=r.parentNode;r=i}else break;return n}var D={start:0,center:.5,end:1};function O(e,t,n=0){let r=0;if(e in D&&(e=D[e]),typeof e==`string`){let t=parseFloat(e);e.endsWith(`px`)?r=t:e.endsWith(`%`)?e=t/100:e.endsWith(`vw`)?r=t/100*document.documentElement.clientWidth:e.endsWith(`vh`)?r=t/100*document.documentElement.clientHeight:e=t}return typeof e==`number`&&(r=t*e),n+r}var k=[0,0];function A(e,t,n,r){let i=Array.isArray(e)?e:k,a=0,o=0;return typeof e==`number`?i=[e,e]:typeof e==`string`&&(e=e.trim(),i=e.includes(` `)?e.split(` `):[e,D[e]?e:`0`]),a=O(i[0],n,r),o=O(i[1],t),a-o}var j={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},le={x:0,y:0};function ue(e){return`getBBox`in e&&e.tagName!==`svg`?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function de(e,t,n){let{offset:r=j.All}=n,{target:i=e,axis:a=`y`}=n,o=a===`y`?`height`:`width`,s=i===e?le:ce(i,e),c=i===e?{width:e.scrollWidth,height:e.scrollHeight}:ue(i),u={width:e.clientWidth,height:e.clientHeight};t[a].offset.length=0;let d=!t[a].interpolate,f=r.length;for(let e=0;e<f;e++){let n=A(r[e],u[o],c[o],s[a]);!d&&n!==t[a].interpolatorOffsets[e]&&(d=!0),t[a].offset[e]=n}d&&(t[a].interpolate=g(t[a].offset,l(r),{clamp:!1}),t[a].interpolatorOffsets=[...t[a].offset]),t[a].progress=b(0,1,t[a].interpolate(t[a].current))}function fe(e,t=e,n){if(n.x.targetOffset=0,n.y.targetOffset=0,t!==e){let r=t;for(;r&&r!==e;)n.x.targetOffset+=r.offsetLeft,n.y.targetOffset+=r.offsetTop,r=r.offsetParent}n.x.targetLength=t===e?t.scrollWidth:t.clientWidth,n.y.targetLength=t===e?t.scrollHeight:t.clientHeight,n.x.containerLength=e.clientWidth,n.y.containerLength=e.clientHeight}function pe(e,t,n,r={}){return{measure:t=>{fe(e,r.target,n),se(e,n,t),(r.offset||r.target)&&de(e,n,r)},notify:()=>t(n)}}var M=new WeakMap,N=new WeakMap,P=new WeakMap,F=new WeakMap,I=new WeakMap,L=e=>e===document.scrollingElement?window:e;function R(e,{container:t=document.scrollingElement,trackContentSize:n=!1,...r}={}){if(!t)return x;let i=P.get(t);i||(i=new Set,P.set(t,i));let a=pe(t,e,oe(),r);if(i.add(a),!M.has(t)){let e=()=>{for(let e of i)e.measure(u.timestamp);d.preUpdate(n)},n=()=>{for(let e of i)e.notify()},r=()=>d.read(e);M.set(t,r);let a=L(t);window.addEventListener(`resize`,r),t!==document.documentElement&&N.set(t,f(t,r)),a.addEventListener(`scroll`,r),r()}if(n&&!I.has(t)){let e=M.get(t),n={width:t.scrollWidth,height:t.scrollHeight};F.set(t,n);let r=d.read(()=>{let r=t.scrollWidth,i=t.scrollHeight;(n.width!==r||n.height!==i)&&(e(),n.width=r,n.height=i)},!0);I.set(t,r)}let o=M.get(t);return d.read(o,!1,!0),()=>{m(o);let e=P.get(t);if(!e||(e.delete(a),e.size))return;let n=M.get(t);M.delete(t),n&&(L(t).removeEventListener(`scroll`,n),N.get(t)?.(),window.removeEventListener(`resize`,n));let r=I.get(t);r&&(m(r),I.delete(t)),F.delete(t)}}var z=[[j.Enter,`entry`],[j.Exit,`exit`],[j.Any,`cover`],[j.All,`contain`]],B={start:0,end:1};function me(e){let t=e.trim().split(/\s+/);if(t.length!==2)return;let n=B[t[0]],r=B[t[1]];if(!(n===void 0||r===void 0))return[n,r]}function V(e){if(e.length!==2)return;let t=[];for(let n of e)if(Array.isArray(n))t.push(n);else if(typeof n==`string`){let e=me(n);if(!e)return;t.push(e)}else return;return t}function he(e,t){let n=V(e);if(!n)return!1;for(let e=0;e<2;e++){let r=n[e],i=t[e];if(r[0]!==i[0]||r[1]!==i[1])return!1}return!0}function H(e){if(!e)return{rangeStart:`contain 0%`,rangeEnd:`contain 100%`};for(let[t,n]of z)if(he(e,t))return{rangeStart:`${n} 0%`,rangeEnd:`${n} 100%`}}var U=new Map;function W(e){let t={value:0};return{currentTime:t,cancel:R(n=>{t.value=n[e.axis].progress*100},e)}}function G({source:e,container:t,...n}){let{axis:r}=n;e&&(t=e);let i=U.get(t);i||(i=new Map,U.set(t,i));let a=n.target??`self`,o=i.get(a);o||(o={},i.set(a,o));let s=r+(n.offset??[]).join(`,`);return o[s]||(n.target&&C(n.target)?H(n.offset)?o[s]=new ViewTimeline({subject:n.target,axis:r}):o[s]=W({container:t,...n}):C()?o[s]=new ScrollTimeline({source:t,axis:r}):o[s]=W({container:t,...n})),o[s]}function ge(e,t){let n=G(t),r=t.target?H(t.offset):void 0,i=t.target?C(t.target)&&!!r:C();return e.attachTimeline({timeline:i?n:void 0,...r&&i&&{rangeStart:r.rangeStart,rangeEnd:r.rangeEnd},observe:e=>(e.pause(),S(t=>{e.time=e.iterationDuration*t},n))})}function _e(e){return e&&(e.target||e.offset)}function ve(e){return e.length===2}function ye(e,t){return ve(e)||_e(t)?R(n=>{e(n[t.axis].progress,n)},t):S(e,G(t))}function K(e,{axis:t=`y`,container:n=document.scrollingElement,...r}={}){if(!n)return x;let i={axis:t,container:n,...r};return typeof e==`function`?ye(e,i):ge(e,i)}var q=e(t(),1),be=()=>({scrollX:p(0),scrollY:p(0),scrollXProgress:p(0),scrollYProgress:p(0)}),J=e=>e?!e.current:!1;function Y(e,t,n,r){return{factory:i=>{let o,s=()=>{if(J(n)||J(r)){h.read(s);return}o=K(i,{...t,axis:e,container:n?.current||void 0,target:r?.current||void 0})};return h.read(s),()=>{a(s),o?.()}},times:[0,1],keyframes:[0,1],ease:e=>e,duration:1}}function xe(e,t){return typeof window>`u`?!1:e?c()&&!!H(t):v()}function Se({container:e,target:t,...n}={}){let i=y(be);xe(t,n.offset)&&(i.scrollXProgress.accelerate=Y(`x`,n,e,t),i.scrollYProgress.accelerate=Y(`y`,n,e,t));let s=(0,q.useRef)(null),c=(0,q.useRef)(!1),l=(0,q.useCallback)(()=>(s.current=K((e,{x:t,y:n})=>{i.scrollX.set(t.current),i.scrollXProgress.set(t.progress),i.scrollY.set(n.current),i.scrollYProgress.set(n.progress)},{...n,container:e?.current||void 0,target:t?.current||void 0}),()=>{s.current?.()}),[e,t,JSON.stringify(n.offset)]);return r(()=>{if(c.current=!1,J(e)||J(t)){c.current=!0;return}else return l()},[l]),(0,q.useEffect)(()=>{if(!c.current)return;let n,r=()=>{let r=J(e),i=J(t);o(!r,`Container ref is defined but not hydrated`,`use-scroll-ref`),o(!i,`Target ref is defined but not hydrated`,`use-scroll-ref`),!r&&!i&&(n=l())};return h.read(r),()=>{a(r),n?.()}},[l]),i}function Ce(e){let t=y(()=>p(e)),{isStatic:n}=(0,q.useContext)(ee);if(n){let[,n]=(0,q.useState)(e);(0,q.useEffect)(()=>t.on(`change`,n),[])}return t}function X(e,t){let n=Ce(t()),i=()=>n.set(t());return i(),r(()=>{let t=()=>d.preRender(i,!1,!0),n=e.map(e=>e.on(`change`,t));return()=>{n.forEach(e=>e()),m(i)}}),n}function we(e){s.current=[],e();let t=X(s.current,e);return s.current=void 0,t}function Z(e,t,n,r){if(typeof e==`function`)return we(e);if(n!==void 0&&!Array.isArray(n)&&typeof t!=`function`)return Te(e,t,n,r);let i=typeof t==`function`?t:ie(t,n,r),a=Array.isArray(e)?Q(e,i):Q([e],([e])=>i(e)),o=Array.isArray(e)?void 0:e.accelerate;return o&&!o.isTransformed&&typeof t!=`function`&&Array.isArray(n)&&r?.clamp!==!1&&(a.accelerate={...o,times:t,keyframes:n,isTransformed:!0,...r?.ease?{ease:r.ease}:{}}),a}function Q(e,t){let n=y(()=>[]);return X(e,()=>{n.length=0;let r=e.length;for(let t=0;t<r;t++)n[t]=e[t].get();return t(n)})}function Te(e,t,n,r){let i=y(()=>Object.keys(n)),a=y(()=>({}));for(let o of i)a[o]=Z(e,t,n[o],r);return a}var $=n();function Ee(e,t,n=1800){let[r,i]=(0,q.useState)(`0`),a=(0,q.useRef)(null);return(0,q.useEffect)(()=>{if(!t)return;let r=parseFloat(e.replace(/[^0-9.]/g,``)),o=e.replace(/[0-9.]/g,``),s=performance.now(),c=e=>{let t=Math.min((e-s)/n,1),l=1-(1-t)**4;i(Math.floor(l*r).toLocaleString()+o),t<1&&(a.current=requestAnimationFrame(c))};return a.current=requestAnimationFrame(c),()=>cancelAnimationFrame(a.current)},[t,e,n]),r}var De=[{value:`1000+`,label:`Employees`,icon:`◈`},{value:`250+`,label:`Skilled Experts`,icon:`◆`},{value:`10+`,label:`Finished Projects`,icon:`◉`},{value:`1000+`,label:`Media Posts`,icon:`◇`}],Oe=[{label:`ISO Certified`,img:`/images/ISO-Logo.png`,title:`ISO 27001:2022`,desc:`The ISO 27001:2022 badge is an internationally recognized certification that confirms our organization operates a world-class Information Security Management System (ISMS). This standard proves that we don't just use security tools—we have a comprehensive, board-led culture of risk management.`},{label:`GDPR Compliant`,img:`/images/GDPR-Logo.png`,title:`GDPR`,desc:`The GDPR badge signifies our adherence to the most stringent data protection framework in the world. Beyond mere security, GDPR compliance demonstrates our commitment to Data Privacy as a Human Right, ensuring that every individual's personal information is handled with transparency, purpose, and absolute care.`},{label:`SOC 2 Type II`,img:`/images/SOC2-Logo.png`,title:`SOC2 TYPE2`,desc:`The SOC 2 Type 2 badge is the gold standard for service organizations, representing a rigorous, independent audit of our internal controls. Unlike a "snapshot" audit, the Type 2 certification proves that our security protocols have been followed consistently and effectively over an extended period.`},{label:`HIPAA Ready`,img:`/images/HIPAA-Logo.png`,title:`HIPAA`,desc:`As a HIPAA-compliant organization, we adhere to the highest federal standards for the protection of Protected Health Information (PHI). This certification signifies that we have implemented rigorous safeguards to ensure the confidentiality, integrity, and availability of sensitive healthcare data.`},{label:`PCI DSS Certified`,img:`/images/PCI-Logo.png`,title:`PCI DSS`,desc:`The PCI DSS badge signifies that our organization meets the rigorous security standards established by the world's leading financial institutions. This compliance ensures that every credit card transaction and financial record processed through our systems is handled with maximum security to prevent fraud and data theft.`},{label:`BBB Accredited`,img:`/images/BBB-Logo.png`,title:`BBB ACCREDITED BUSINESSES`,desc:`The BBB Accredited Business seal is more than a rating; it is a public declaration of our commitment to ethical business practices. Accreditation signifies that we have been independently vetted and have pledged to uphold the BBB Standards for Trust—a comprehensive set of best practices for how businesses should treat their clients and the public.`}],ke=[{num:`01`,title:`24/7 Customer Support`,body:`Round-the-clock service teams fluent in your brand voice, resolving issues before they escalate.`},{num:`02`,title:`Expert BPO Solutions`,body:`End-to-end back-office operations engineered for precision, compliance, and cost efficiency.`},{num:`03`,title:`Scalable Process Management`,body:`Elastic capacity that grows with you — no overhead, no delays, no limits.`}];function Ae({value:e,label:t,icon:n,delay:r}){let[i,a]=(0,q.useState)(!1),o=Ee(e,i),s=(0,q.useRef)(null);return(0,q.useEffect)(()=>{let e=new IntersectionObserver(([e])=>{e.isIntersecting&&setTimeout(()=>a(!0),r)},{threshold:.5});return s.current&&e.observe(s.current),()=>e.disconnect()},[r]),(0,$.jsxs)(_.div,{ref:s,initial:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.7,delay:r/1e3+.2,ease:[.22,1,.36,1]},className:`stat-chip`,children:[(0,$.jsx)(`span`,{className:`stat-icon`,children:n}),(0,$.jsx)(`span`,{className:`stat-val`,children:i?o:`0`}),(0,$.jsx)(`span`,{className:`stat-label`,children:t})]})}function je({num:e,title:t,body:n,index:r}){return(0,$.jsxs)(_.div,{className:`pillar-card`,initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:{once:!0,amount:.4},transition:{duration:.65,delay:.15*r,ease:[.22,1,.36,1]},children:[(0,$.jsx)(`span`,{className:`pillar-num`,children:e}),(0,$.jsxs)(`div`,{className:`pillar-body`,children:[(0,$.jsx)(`strong`,{className:`pillar-title`,children:t}),(0,$.jsx)(`p`,{className:`pillar-text`,children:n})]}),(0,$.jsx)(`div`,{className:`pillar-arrow`,children:`→`})]})}function Me({label:e,img:t,title:n,desc:r}){let[i,a]=(0,q.useState)(!1);return(0,$.jsxs)(`span`,{className:`strip-badge`,onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[(0,$.jsx)(`img`,{src:t,alt:e,style:{height:50,width:`auto`}}),(0,$.jsx)(`span`,{children:e}),(0,$.jsx)(re,{children:i&&(0,$.jsxs)(_.div,{className:`badge-tooltip`,initial:{opacity:0,y:8,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:8,scale:.95},transition:{duration:.18,ease:`easeOut`},children:[(0,$.jsx)(`div`,{className:`badge-tooltip-title`,children:n}),(0,$.jsx)(`p`,{className:`badge-tooltip-desc`,children:r})]})})]})}function Ne(){let e=(0,q.useRef)(null),{scrollYProgress:t}=Se({target:e,offset:[`start end`,`end start`]}),n=Z(t,[0,1],[`-6%`,`6%`]);return(0,$.jsxs)(`section`,{id:`about-us`,ref:e,className:`about-root`,children:[(0,$.jsx)(`style`,{children:`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

                :root {
                    --ink:   #0b0b10;
                    --gold:  #c9a84c;
                    --gold2: #e8c97a;
                    --lilac: #8b7bb5;
                }

                .about-root {
                    position: relative;
                    overflow: hidden;
                    background: var(--ink);
                    font-family: 'Outfit', sans-serif;
                }

                /* video bg */
                .about-video-wrap { position: absolute; inset: 0; z-index: 0; }
                .about-video-wrap video { width: 100%; height: 100%; object-fit: cover; }
                .about-video-wrap::after {
                    content: '';
                    position: absolute; inset: 0;
                    background:
                        linear-gradient(to bottom, rgba(11,11,16,0.88) 0%, rgba(11,11,16,0.55) 50%, rgba(11,11,16,0.92) 100%),
                        linear-gradient(100deg, rgba(11,11,16,0.9) 0%, transparent 60%);
                }

                /* grain */
                .about-grain {
                    position: absolute; inset: 0; z-index: 1; pointer-events: none;
                    opacity: 0.035;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    background-size: 200px 200px;
                }

                /* layout */
                .about-inner {
                    position: relative; z-index: 2;
                    max-width: 1360px; margin: 0 auto;
                    padding: 100px 48px 80px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0 72px;
                    align-items: start;
                }

                /* eyebrow */
                .eyebrow {
                    display: inline-flex; align-items: center; gap: 10px;
                    font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
                    text-transform: uppercase; color: var(--gold); margin-bottom: 22px;
                }
                .eyebrow-line {
                    display: block; width: 32px; height: 1px;
                    background: linear-gradient(90deg, var(--gold), transparent);
                }

                /* headline */
                .about-h2 {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(38px, 5vw, 72px);
                    font-weight: 700; line-height: 1.03;
                    color: #fff; margin: 0 0 6px;
                }
                .about-h2 em {
                    font-style: italic;
                    background: linear-gradient(120deg, var(--gold2), var(--lilac));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .about-sub {
                    font-size: 15px; font-weight: 300; line-height: 1.75;
                    color: rgba(255,255,255,0.52); max-width: 440px; margin-bottom: 40px;
                }

                /* pillars */
                .pillars { display: flex; flex-direction: column; gap: 2px; margin-bottom: 44px; }
                .pillar-card {
                    display: flex; align-items: flex-start; gap: 20px;
                    padding: 18px 20px; border-radius: 14px;
                    border: 1px solid transparent; cursor: default;
                    transition: background 0.25s, border-color 0.25s, transform 0.25s;
                }
                .pillar-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(201,168,76,0.2);
                    transform: translateX(6px);
                }
                .pillar-num {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 11px; font-weight: 600; letter-spacing: 0.15em;
                    color: var(--gold); margin-top: 3px; flex-shrink: 0; min-width: 26px;
                }
                .pillar-body { flex: 1; min-width: 0; }
                .pillar-title {
                    display: block; font-size: 14px; font-weight: 600;
                    color: rgba(255,255,255,0.9); margin-bottom: 4px; letter-spacing: 0.01em;
                }
                .pillar-text {
                    font-size: 13px; font-weight: 300;
                    color: rgba(255,255,255,0.42); line-height: 1.65; margin: 0;
                }
                .pillar-arrow {
                    font-size: 16px; color: rgba(255,255,255,0.12);
                    margin-top: 2px; flex-shrink: 0;
                    transition: color 0.2s, transform 0.2s;
                }
                .pillar-card:hover .pillar-arrow { color: var(--gold); transform: translateX(4px); }

                /* CTA */
                .cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
                .btn-primary {
                    padding: 13px 30px;
                    background: linear-gradient(135deg, var(--gold) 0%, #a8722a 100%);
                    border: none; border-radius: 10px;
                    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
                    color: #1a1000; cursor: pointer; letter-spacing: 0.03em;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 8px 28px rgba(201,168,76,0.28);
                }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(201,168,76,0.38); }
                .btn-ghost {
                    padding: 13px 30px; background: transparent;
                    border: 1px solid rgba(255,255,255,0.18); border-radius: 10px;
                    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 500;
                    color: rgba(255,255,255,0.7); cursor: pointer; text-decoration: none;
                    display: inline-flex; align-items: center;
                    transition: border-color 0.2s, color 0.2s, transform 0.2s;
                }
                .btn-ghost:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

                /* right col */
                .right-col { display: flex; flex-direction: column; gap: 28px; }

                /* image frame */
                .img-frame-outer { position: relative; }
                .img-frame {
                    position: relative; border-radius: 20px; overflow: hidden;
                    aspect-ratio: 4/3;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow: 0 40px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04);
                }
                .img-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
                .img-frame::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(to top, rgba(11,11,16,0.6) 0%, transparent 55%);
                    border-radius: inherit; pointer-events: none;
                }
                .img-corner {
                    position: absolute; width: 52px; height: 52px;
                    border-color: var(--gold); border-style: solid; border-width: 0; opacity: 0.6;
                }
                .img-corner.tl { top: -10px; left: -10px; border-top-width: 1px; border-left-width: 1px; border-top-left-radius: 6px; }
                .img-corner.br { bottom: -10px; right: -10px; border-bottom-width: 1px; border-right-width: 1px; border-bottom-right-radius: 6px; }

                /* badge */
                .img-badge {
                    position: absolute; bottom: 16px; left: 16px; z-index: 3;
                    background: rgba(11,11,16,0.82); backdrop-filter: blur(18px);
                    border: 1px solid rgba(201,168,76,0.25); border-radius: 14px;
                    padding: 12px 16px; display: flex; align-items: center; gap: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                    max-width: calc(100% - 32px);
                }
                .badge-dot {
                    width: 8px; height: 8px; border-radius: 50%; background: #4ade80;
                    flex-shrink: 0; box-shadow: 0 0 10px #4ade80;
                    animation: pulse-green 2.2s ease-out infinite;
                }
                @keyframes pulse-green {
                    0%,100% { box-shadow: 0 0 6px #4ade80; }
                    50% { box-shadow: 0 0 14px #4ade80, 0 0 24px rgba(74,222,128,0.3); }
                }
                .badge-text-top { font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.45); margin-bottom: 1px; }
                .badge-text-bot { font-size: 14px; font-weight: 600; color: #fff; font-family: 'Outfit', sans-serif; }

                /* divider */
                .gold-rule {
                    width: 100%; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent);
                }

                /* stats grid */
                .stats-grid {
                    display: grid; grid-template-columns: repeat(2, 1fr);
                    gap: 1px; background: rgba(255,255,255,0.07);
                    border-radius: 18px; overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.07);
                }
                .stat-chip {
                    display: flex; flex-direction: column; align-items: flex-start;
                    gap: 4px; padding: 22px 20px 18px;
                    background: rgba(11,11,16,0.85);
                    transition: background 0.25s; cursor: default;
                }
                .stat-chip:hover { background: rgba(201,168,76,0.06); }
                .stat-icon { font-size: 12px; color: var(--gold); margin-bottom: 6px; }
                .stat-val {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: clamp(26px, 3.5vw, 42px);
                    font-weight: 700; color: #fff; line-height: 1; letter-spacing: -0.02em;
                }
                .stat-label {
                    font-size: 10px; font-weight: 500; letter-spacing: 0.14em;
                    text-transform: uppercase; color: rgba(255,255,255,0.38); margin-top: 2px;
                }

                /* bottom strip */
                .about-strip {
                    position: relative; z-index: 2;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    padding: 24px 48px;
                    display: flex; align-items: center; justify-content: space-between;
                    flex-wrap: wrap; gap: 16px;
                    max-width: 1360px; margin: 0 auto;
                }
                .strip-text {
                    font-size: 12px; font-weight: 400;
                    color: rgba(255,255,255,0.28); letter-spacing: 0.06em;
                }
                .strip-badges { display: flex; gap: 10px; flex-wrap: wrap; }
                .strip-badge {
                    padding: 6px 14px; border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 999px; font-size: 11px; font-weight: 500;
                    color: rgba(255,255,255,0.38); letter-spacing: 0.06em;
                    transition: border-color 0.2s, color 0.2s; cursor: default;
                    display: flex; align-items: center; gap: 6px;
                    position: relative;
                }
                .strip-badge:hover { border-color: var(--gold); color: var(--gold); }

                /* badge tooltip */
                .badge-tooltip {
                    position: absolute;
                    bottom: calc(100% + 14px);
                    left: 50%;
                    transform: translateX(-50%);
                    width: 270px;
                    background: rgba(11,11,16,0.97);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(201,168,76,0.35);
                    border-radius: 14px;
                    padding: 16px 18px;
                    pointer-events: none;
                    z-index: 200;
                    box-shadow: 0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.08) inset;
                }

                .badge-tooltip-title {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.16em;
                    color: var(--gold);
                    text-transform: uppercase;
                    margin-bottom: 8px;
                    font-family: 'Outfit', sans-serif;
                }
                .badge-tooltip-desc {
                    font-size: 12px;
                    font-weight: 300;
                    color: rgba(255,255,255,0.62);
                    line-height: 1.65;
                    margin: 0;
                    font-family: 'Outfit', sans-serif;
                }

                /* ── RESPONSIVE ─────────────────────────────────── */
                @media (max-width: 1024px) {
                    .about-inner { gap: 0 48px; padding: 80px 32px 60px; }
                }

                @media (max-width: 768px) {
                    .about-inner {
                        grid-template-columns: 1fr;
                        gap: 48px;
                        padding: 72px 20px 52px;
                    }
                    .about-h2 { font-size: clamp(32px, 9vw, 56px); }
                    .about-sub { font-size: 14px; max-width: 100%; margin-bottom: 28px; }
                    .pillars { margin-bottom: 32px; }
                    .pillar-card { padding: 14px 16px; gap: 14px; }
                    .cta-row { flex-direction: column; }
                    .btn-primary, .btn-ghost { width: 100%; text-align: center; justify-content: center; padding: 14px 24px; }
                    .right-col { gap: 20px; }
                    .stat-chip { padding: 18px 16px 14px; }
                    .about-strip {
                        flex-direction: column; align-items: flex-start;
                        padding: 20px 20px; gap: 14px;
                    }
                    .strip-badges { gap: 8px; }
                    .strip-badge { font-size: 10px; padding: 5px 10px; }
                    .strip-badge img { height: 40px !important; }
                }

                @media (max-width: 480px) {
                    .about-inner { padding: 64px 16px 44px; gap: 36px; }
                    .eyebrow { font-size: 9px; }
                    .about-h2 { font-size: clamp(28px, 10vw, 44px); }
                    .img-badge { padding: 10px 12px; gap: 8px; }
                    .badge-text-bot { font-size: 12px; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .stat-chip { padding: 14px 12px 12px; }
                    .stat-val { font-size: clamp(22px, 6vw, 32px); }
                    .stat-label { font-size: 9px; }
                    .strip-badge img { height: 30px !important; }
                }
            `}),(0,$.jsx)(`div`,{className:`about-video-wrap`,children:(0,$.jsx)(`video`,{src:`/video/about.mp4`,autoPlay:!0,loop:!0,muted:!0,playsInline:!0})}),(0,$.jsx)(`div`,{className:`about-grain`}),(0,$.jsxs)(`div`,{className:`about-inner`,children:[(0,$.jsxs)(`div`,{children:[(0,$.jsxs)(_.div,{className:`eyebrow`,initial:{opacity:0,x:-16},whileInView:{opacity:1,x:0},viewport:{once:!0,amount:.7},transition:{duration:.6,ease:[.22,1,.36,1]},children:[(0,$.jsx)(`span`,{className:`eyebrow-line`}),`About EmpireOne BPO Solutions Inc.`]}),(0,$.jsxs)(_.h2,{className:`about-h2`,initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.75,delay:.1,ease:[.22,1,.36,1]},children:[`Your Trusted`,(0,$.jsx)(`br`,{}),`Partner in`,(0,$.jsx)(`br`,{}),(0,$.jsx)(`em`,{children:`Business Excellence`})]}),(0,$.jsx)(_.p,{className:`about-sub`,initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.5},transition:{duration:.7,delay:.22,ease:[.22,1,.36,1]},children:`At EmpireOne, we deliver world-class BPO solutions that help businesses optimize operations, reduce costs, and scale efficiently — from customer support to back-office operations, across the globe.`}),(0,$.jsx)(`div`,{className:`pillars`,children:ke.map((e,t)=>(0,$.jsx)(je,{...e,index:t},e.num))}),(0,$.jsxs)(_.div,{className:`cta-row`,initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.6},transition:{duration:.6,delay:.5,ease:[.22,1,.36,1]},children:[(0,$.jsx)(_.button,{className:`btn-primary`,whileHover:{y:-2},whileTap:{scale:.97},children:`Explore More`}),(0,$.jsx)(_.a,{href:`#contact`,className:`btn-ghost`,style:{textDecoration:`none`,display:`inline-flex`,alignItems:`center`},whileHover:{y:-2},whileTap:{scale:.97},children:`Contact Us →`})]})]}),(0,$.jsxs)(`div`,{className:`right-col`,children:[(0,$.jsxs)(_.div,{className:`img-frame-outer`,initial:{opacity:0,x:32},whileInView:{opacity:1,x:0},viewport:{once:!0,amount:.3},transition:{duration:.85,delay:.18,ease:[.22,1,.36,1]},children:[(0,$.jsx)(`div`,{className:`img-corner tl`}),(0,$.jsx)(`div`,{className:`img-corner br`}),(0,$.jsxs)(`div`,{className:`img-frame`,children:[(0,$.jsx)(_.img,{src:`/images/image-200.png`,alt:`Team collaborating`,style:{y:n}}),(0,$.jsxs)(`div`,{className:`img-badge`,children:[(0,$.jsx)(`span`,{className:`badge-dot`}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{className:`badge-text-top`,children:`Currently hiring`}),(0,$.jsx)(`div`,{className:`badge-text-bot`,children:`Join our global team`})]})]})]})]}),(0,$.jsx)(_.div,{className:`gold-rule`,initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0,amount:.5},transition:{duration:.9,delay:.3,ease:[.22,1,.36,1]},style:{transformOrigin:`left`}}),(0,$.jsx)(_.div,{className:`stats-grid`,initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,amount:.3},transition:{duration:.7,delay:.32,ease:[.22,1,.36,1]},children:De.map((e,t)=>(0,$.jsx)(Ae,{...e,delay:t*120},e.label))})]})]}),(0,$.jsxs)(_.div,{className:`about-strip`,initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.5},transition:{duration:.8,delay:.2},children:[(0,$.jsx)(`span`,{className:`strip-text`,children:`EmpireOne BPO · Trusted Worldwide`}),(0,$.jsx)(`div`,{className:`strip-badges`,children:Oe.map(e=>(0,$.jsx)(Me,{...e},e.label))})]})]})}export{Ne as default};