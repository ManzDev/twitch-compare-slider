const c=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}};c();const l=a=>`'${a}'`;class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
      :host {
        --percent: 0%;

        width: var(--width);
        height: var(--height);
        display: block;
        color: white;
        border: 4px solid black;
        overflow: hidden;
      }

      .container {
        width: 100%;
        height: 100%;
        position: relative;
      }

      slot::before,
      slot::after {
        position: absolute;
        background: #000c;
        padding: 3px 8px;
        top: 10px;
        z-index: 5;
      }

      slot::before {
        content: var(--after-text);
        text-transform: uppercase;
        left: 12px;
      }

      slot::after {
        content: var(--before-text);
        text-transform: uppercase;
        right: 10px;
      }

      .separator {
        --color: #000;

        border: 3px solid var(--color);
        position: absolute;
        height: 100%;
        left: var(--percent);
        transform: translateX(2px);
        opacity: 0.8;
      }

      .separator::after {
        --size: 48px;
        --half: calc(var(--size) / 2);

        content: "\u25C0 \u25B6";
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--size);
        height: var(--size);
        position: absolute;
        font-size: 0.75rem;
        color: white;
        background: var(--color);
        border-radius: 50%;
        top: calc(50% - var(--half));
        transform: translateX(calc(-1 * var(--half)));
      }

      ::slotted(img),
      ::slotted(video) {
        border: 4px solid black;
        position: absolute;
      }

      ::slotted(img:nth-child(2)),
      ::slotted(video:nth-child(2)) {
        clip-path: inset(0 calc(100% - var(--percent)) 0 0);
      }
    `}connectedCallback(){this.initialValue=this.getAttribute("initial-value")||"0%",this.render(),this.init(),this.addEventListener("mousemove",s=>this.onMouseMove(s))}init(){const s=this.shadowRoot.querySelector("slot");this.firstImage=s.assignedElements()[0],this.secondImage=s.assignedElements()[1],this.style.setProperty("--width",`${this.firstImage.width}px`),this.style.setProperty("--height",`${this.firstImage.height}px`),this.beforeText=this.firstImage.alt||this.firstImage.title||"BEFORE",this.afterText=this.secondImage.alt||this.secondImage.title||"AFTER",this.style.setProperty("--before-text",l(this.beforeText)),this.style.setProperty("--after-text",l(this.afterText)),this.style.setProperty("--percent",this.initialValue)}onMouseMove(s){const o=s.clientX,r=Math.floor(o/this.firstImage.width*100);this.style.setProperty("--percent",`${r}%`)}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="container">
      <slot></slot>
      <div class="separator"></div>
    </div>`}}customElements.define("compare-slider",n);
