import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i}from"./assets/vendor-BbbuE1sJ.js";let o=0;const n=document.querySelector('input[name="delay"]');n.addEventListener("input",e=>{o=Number(e.target.value)});const r=document.querySelector('input[value="fulfilled"]'),s=document.querySelector('input[value="rejected"]'),u=document.querySelector(".form"),c=()=>new Promise((e,t)=>{setTimeout(()=>{r.checked?e(o):s.checked&&t(o)},o)});u.addEventListener("submit",e=>{e.preventDefault(),c().then(t=>{i.show({message:`✅ Fulfilled promise in ${t}ms`})}).catch(t=>{i.show({message:`❌ Rejected promise in ${t}ms`})})});
//# sourceMappingURL=2-snackbar.js.map
