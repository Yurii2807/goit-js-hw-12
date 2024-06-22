import{a as w,S as b,i as n}from"./assets/vendor-b11e2a50.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();async function y(i,e,s){return(await w.get("https://pixabay.com/api/",{params:{key:"44364811-49b1c0cdbd7356dfdac934983",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:s}})).data}function v(i){return i.hits.map(s=>`<li class="gallery-item">
        <a class="gallery-link" href="${s.largeImageURL}">
          <img class="gallery-img" src="${s.webformatURL}" alt="${s.tags}">
          <div class="cards-wrapper">
          <div class="card-wrapper">
            <strong>Likes</strong>
            <p>${s.likes}</p>
          </div>
          <div class="card-wrapper">
            <strong>Views</strong>
            <p>${s.views}</p>
          </div>
          <div class="card-wrapper">
            <strong>Comments</strong>
            <p>${s.comments}</p>
          </div>
          <div class="card-wrapper">
            <strong>Downloads</strong>
            <p>${s.downloads}</p>
          </div>
        </div>
        </a>
      </li>`).join("")}const S="/goit-js-hw-12/assets/alert-e987a0ca.svg",q="/goit-js-hw-12/assets/caution-3a1f6716.svg",E="/goit-js-hw-12/assets/inform-02e865e2.svg",p=document.querySelector(".search-form"),m=document.querySelector(".search-input"),a=document.querySelector(".loader"),l=document.querySelector(".gallery"),c=document.querySelector(".load-btn");let L=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});const h=15;let o=1,g=0,f="";p.addEventListener("submit",async i=>{if(i.preventDefault(),!m.value.trim()){p.reset();return}try{o=1,f="",c.classList.add("visually-hidden"),l.innerHTML="",a.classList.remove("visually-hidden");const e=await y(m.value.trim(),o,h);if(!e.total){n.error({iconUrl:S,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),a.classList.add("visually-hidden");return}a.classList.add("visually-hidden"),l.insertAdjacentHTML("beforeend",v(e)),L.refresh(),g=Math.ceil(e.totalHits/h),f=m.value.trim(),o<g&&c.classList.remove("visually-hidden")}catch(e){a.classList.add("visually-hidden"),n.warning({iconUrl:q,message:`${e}`,position:"topRight",timeout:5e3})}p.reset()});c.addEventListener("click",async i=>{o+=1,o===g&&(n.info({iconUrl:E,position:"topRight",backgroundColor:"#09f",message:"We're sorry, but you've reached the end of search results."}),a.classList.add("visually-hidden"),c.classList.add("visually-hidden"));try{a.classList.remove("visually-hidden");const e=await y(f,o,h);a.classList.add("visually-hidden"),l.insertAdjacentHTML("beforeend",v(e)),L.refresh(),window.scrollBy({top:l.firstChild.getBoundingClientRect().height*2,behavior:"smooth"})}catch(e){a.classList.add("visually-hidden"),n.warning({title:"Error",message:e.message,position:"topRight"})}});
//# sourceMappingURL=commonHelpers.js.map
