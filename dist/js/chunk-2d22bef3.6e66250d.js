(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22bef3"],{f0a4:function(e,t,n){"use strict";n.r(t);var c=n("ecd8"),o=(n("797a"),n("7a23")),r=Object(o["createElementVNode"])("h1",null,"时间显示模块",-1),a=Object(o["createTextVNode"])("显示时间"),l={class:"animate__animated animate__backInDown"};function u(e,t,n,u,i,s){var d=c["a"];return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",null,[r,Object(o["createElementVNode"])("div",null,Object(o["toDisplayString"])(e.nowTime),1),Object(o["createElementVNode"])("div",null,[Object(o["createVNode"])(d,{onClick:e.getNowTime},{default:Object(o["withCtx"])((function(){return[a]})),_:1},8,["onClick"])]),Object(o["createElementVNode"])("h1",l,"result: "+Object(o["toDisplayString"])(e.result),1)])}var i=Object(o["ref"])("00:00:00"),s=function(){var e=new Date,t=e.getHours()<10?"0"+e.getHours():e.getHours(),n=e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes(),c=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();i.value=t+":"+n+":"+c,setTimeout(s,1e3)};function d(e,t){var n=Object(o["ref"])(null),c=Object(o["ref"])(!0),r=Object(o["ref"])(!1);Object(o["ref"])(null);return{result:n,loading:c,loaded:r}}var b=d,f=n("2ef0"),j=n.n(f),O=Object(o["defineComponent"])({name:"NowTimes",setup:function(){var e=b("/search",{keywords:"海阔天空"}),t=e.result,n=(e.loading,e.loaded,[1,2,3]),c=j.a.concat(n,[4,5,6]);return console.log(c),{nowTime:i,result:t,getNowTime:s}}}),g=n("6b0d"),m=n.n(g);const w=m()(O,[["render",u]]);t["default"]=w}}]);