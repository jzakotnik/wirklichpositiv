(this.webpackJsonpwirklichpositiv=this.webpackJsonpwirklichpositiv||[]).push([[0],{120:function(e,t){},122:function(e,t){},139:function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),c=i(11),r=i.n(c),s=(i(98),i(59)),o=i(80),l=i(42),u=i(192),d=i(186),p=i(189),b=i(191),f=i(183),j=i(190),h=i(78),v=i.n(h),m=i(140),O=i(184),g=i(185),x=i(193),y=i(77),k=i.n(y),I=i(10);function S(){return Object(I.jsxs)(m.a,{variant:"body2",color:"textSecondary",align:"center",children:[Object(I.jsx)(f.a,{color:"inherit",href:"https://github.com/jzakotnik/wirklichpositiv",children:"Impressum und Infos - Jure Zakotnik"})," ",(new Date).getFullYear(),"."]})}var T=Object(O.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",padding:"5px",spacing:"10px",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main}}}));var W=function(){var e=T(),t=Object(n.useState)([{productname:"Standard",specifity:80,sensitivity:95}]),i=Object(l.a)(t,2),a=i[0],c=i[1],r=Object(n.useState)({productname:"Standard",specifity:80,sensitivity:95}),f=Object(l.a)(r,2),h=f[0],O=f[1],y=Object(n.useState)(150),W=Object(l.a)(y,2),w=W[0],C=W[1],P=Object(n.useState)("20"),F=Object(l.a)(P,2),z=F[0],D=F[1];return Object(n.useEffect)((function(){console.log("Starting web app and loading csv..");var e=Object(o.a)(a);fetch("/wirklichpositiv/antigentests.csv").then((function(e){return e.text()})).then((function(t){console.log(t),k()(t,{delimiter:";"},(function(t,i){console.log(i),i.map((function(t){"Hersteller Name"!=t[3]&&e.push({productname:t[3]+" - "+t[1],specifity:parseFloat(t[10].replace(",",".")),sensitivity:parseFloat(t[12].replace(",","."))})}))}))})),c(e),C(150)}),[]),Object(n.useEffect)((function(){return console.log("Refreshing calculation"),function(){var e=1e5-w,t=w*h.sensitivity/100,i=w*(1-h.sensitivity/100),n=e*(1-h.specifity/100),a=t/n,c={specifity:h.specifity,sensitivity:h.sensitivity,infected:w,notInfected:e,infectedPositiveTest:t,infectedNegativeTest:i,notInfectedPositiveTest:n,probability:a};console.log(c),D(Math.round(100*a))}(),function(){}}),[h,w]),Object(I.jsxs)(g.a,{component:"main",maxWidth:"xs",children:[Object(I.jsx)(d.a,{}),Object(I.jsxs)("div",{className:e.paper,children:[Object(I.jsx)(m.a,{component:"h1",variant:"h5",children:"Bin ich wirklich Corona-positiv?"}),Object(I.jsx)(u.a,{className:e.avatar,children:Object(I.jsx)(v.a,{})}),Object(I.jsx)(m.a,{component:"h4",variant:"h7",children:"Welcher Antigen-Test?"}),Object(I.jsx)(b.a,{id:"combo-box-demo",options:a,getOptionLabel:function(e){return e.productname},fullWidth:!0,disableClearable:!0,onChange:function(e,t){console.log(t),O(t)},renderInput:function(e){return Object(I.jsx)(p.a,Object(s.a)(Object(s.a)({},e),{},{label:"Antigen Test Hersteller",variant:"outlined"}))}}),Object(I.jsx)(p.a,{variant:"outlined",margin:"normal",InputProps:{readOnly:!0},fullWidth:!0,name:"sensitivity",label:"Sensitivit\xe4t",id:"sensitivity",value:h.sensitivity}),Object(I.jsx)(p.a,{variant:"outlined",margin:"normal",InputProps:{readOnly:!0},fullWidth:!0,name:"specificity",label:"Spezifit\xe4t",id:"specificity",value:h.specifity}),Object(I.jsx)(m.a,{component:"h4",variant:"h7",children:"Wieviele Infizierte pro 100.000?"}),Object(I.jsx)(x.a,{defaultValue:150,getAriaValueText:function(e){return"".concat(e)},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:10,marks:!0,min:20,max:1e3,onChange:function(e,t){C(t)}}),Object(I.jsx)(p.a,{variant:"outlined",margin:"normal",InputProps:{readOnly:!0},fullWidth:!0,name:"infected",label:"Infizierte pro 100.000 Menschen",id:"infected",value:w}),Object(I.jsx)(p.a,{variant:"outlined",margin:"normal",InputProps:{readOnly:!0},fullWidth:!0,name:"Wahrscheinlichkeit",label:"Wahrscheinlichkeit f\xfcr korrekten positiven Test",id:"probability",value:z+" %"})]}),Object(I.jsx)(j.a,{mt:8,children:Object(I.jsx)(S,{})})]})},w=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,195)).then((function(t){var i=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;i(e),n(e),a(e),c(e),r(e)}))};r.a.render(Object(I.jsx)(a.a.StrictMode,{children:Object(I.jsx)(W,{})}),document.getElementById("root")),w()},98:function(e,t,i){}},[[139,1,2]]]);
//# sourceMappingURL=main.c52b0448.chunk.js.map