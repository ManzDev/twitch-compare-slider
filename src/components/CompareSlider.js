const escape = (text) => `'${text}'`;

class CompareSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
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

        content: "◀ ▶";
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
    `;
  }

  connectedCallback() {
    this.initialValue = this.getAttribute("initial-value") || "0%";
    this.render();
    this.init();
    this.addEventListener("mousemove", (ev) => this.onMouseMove(ev));
  }

  init() {
    const slot = this.shadowRoot.querySelector("slot");
    this.firstImage = slot.assignedElements()[0];
    this.secondImage = slot.assignedElements()[1];
    this.style.setProperty("--width", `${this.firstImage.width}px`);
    this.style.setProperty("--height", `${this.firstImage.height}px`);
    this.beforeText = this.firstImage.alt || this.firstImage.title || "BEFORE";
    this.afterText = this.secondImage.alt || this.secondImage.title || "AFTER";
    this.style.setProperty("--before-text", escape(this.beforeText));
    this.style.setProperty("--after-text", escape(this.afterText));
    this.style.setProperty("--percent", this.initialValue);
  }

  onMouseMove(ev) {
    const x = ev.clientX;
    const percent = Math.floor(x / this.firstImage.width * 100);
    this.style.setProperty("--percent", `${percent}%`);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CompareSlider.styles}</style>
    <div class="container">
      <slot></slot>
      <div class="separator"></div>
    </div>`;
  }
}

customElements.define("compare-slider", CompareSlider);
