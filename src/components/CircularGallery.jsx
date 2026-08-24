import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function debounce(fn, wait) {
  let timeout;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

function lerp(from, to, t) {
  return from + (to - from) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

const PX_SIZE_PATTERN = /(\d+(?:\.\d+)?)px/;

function createTextTexture(gl, text, font, color) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Read the size out of the shorthand explicitly — parsing the whole string
  // would pick up the numeric font-weight instead.
  const fontSize = Number(font.match(PX_SIZE_PATTERN)?.[1] ?? 30);

  context.font = font;
  const textWidth = Math.ceil(context.measureText(text).width);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  // Resizing the canvas resets the 2D context, so restate the draw settings.
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width: canvas.width, height: canvas.height };
}

/* ── Caption plane ───────────────────────────────────────────────────────── */

class Title {
  constructor({ gl, plane, text, textColor, font }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
    );

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });

    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;

    this.mesh.scale.set(textHeight * aspect, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

/* ── Image plane ─────────────────────────────────────────────────────────── */

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    reduceMotion,
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.reduceMotion = reduceMotion;

    this.extra = 0;
    this.widthTotal = 0;
    this.width = 0;
    this.x = 0;
    this.scale = 1;
    this.padding = 2;
    this.speed = 0;
    this.isBefore = false;
    this.isAfter = false;

    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);

          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfViewport = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.bend);
      const radius = (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);
      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);

      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / radius);
      }
    }

    this.speed = scroll.current - scroll.last;

    if (!this.reduceMotion) {
      this.program.uniforms.uTime.value += 0.04;
      this.program.uniforms.uSpeed.value = this.speed;
    }

    const planeOffset = this.plane.scale.x / 2;
    this.isBefore = this.plane.position.x + planeOffset < -halfViewport;
    this.isAfter = this.plane.position.x - planeOffset > halfViewport;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }

    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = false;
      this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;

    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

/* ── Scene controller ────────────────────────────────────────────────────── */

class App {
  constructor(container, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, reduceMotion }) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.reduceMotion = reduceMotion;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.isDown = false;
    this.start = 0;
    this.lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    // Rendering is gated on visibility so the RAF loop stays idle while the
    // section is off-screen.
    this.isVisible = true;

    autoBind(this);

    this.onCheckDebounce = debounce(this.onCheck, 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100,
    });
  }

  createMedias(items, bend, textColor, borderRadius, font) {
    const galleryItems = items && items.length > 0 ? items : [];
    if (galleryItems.length === 0) {
      this.medias = [];
      return;
    }

    // Duplicated so the loop has enough planes to wrap seamlessly.
    const looped = [...galleryItems, ...galleryItems];

    this.medias = looped.map((data, index) => new Media({
      geometry: this.planeGeometry,
      gl: this.gl,
      image: data.image,
      index,
      length: looped.length,
      scene: this.scene,
      screen: this.screen,
      text: data.text,
      viewport: this.viewport,
      bend,
      textColor,
      borderRadius,
      font,
      reduceMotion: this.reduceMotion,
    }));
  }

  onTouchDown(event) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in event ? event.touches[0].clientX : event.clientX;
  }

  onTouchMove(event) {
    if (!this.isDown) return;
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    if (!this.isDown) return;
    this.isDown = false;
    this.onCheck();
  }

  onWheel(event) {
    const delta = event.deltaY || event.wheelDelta || event.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onPageScroll() {
    const deltaY = window.scrollY - this.lastScrollY;
    this.lastScrollY = window.scrollY;
    if (!this.isVisible || deltaY === 0) return;
    this.scroll.target += deltaY * this.scrollSpeed * 0.025;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const { width } = this.medias[0];
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: Math.max(this.container.clientWidth, 1),
      height: Math.max(this.container.clientHeight, 1),
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach((media) => media.onResize({
        screen: this.screen,
        viewport: this.viewport,
      }));
    }
  }

  update() {
    this.raf = window.requestAnimationFrame(this.update);
    if (!this.isVisible) return;

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';

    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);

    // Scoped to the container so scrolling the rest of the page does not
    // drive the carousel.
    this.container.addEventListener('wheel', this.onWheel, { passive: true });
    this.container.addEventListener('mousedown', this.onTouchDown);
    this.container.addEventListener('touchstart', this.onTouchDown, { passive: true });

    // Drag tracking has to live on the window so it survives the pointer
    // leaving the container mid-drag.
    window.addEventListener('mousemove', this.onTouchMove);
    window.addEventListener('mouseup', this.onTouchUp);
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchUp);
    window.addEventListener('scroll', this.onPageScroll, { passive: true });

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
        },
        { rootMargin: '200px 0px' },
      );
      this.observer.observe(this.container);
    }
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);

    window.removeEventListener('resize', this.onResize);
    this.container.removeEventListener('wheel', this.onWheel);
    this.container.removeEventListener('mousedown', this.onTouchDown);
    this.container.removeEventListener('touchstart', this.onTouchDown);
    window.removeEventListener('mousemove', this.onTouchMove);
    window.removeEventListener('mouseup', this.onTouchUp);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchUp);
    window.removeEventListener('scroll', this.onPageScroll);

    this.observer?.disconnect();

    const canvas = this.renderer?.gl?.canvas;
    canvas?.parentNode?.removeChild(canvas);

    // Free the GPU context — browsers cap how many can be live at once.
    this.gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }
}

/* ── React wrapper ───────────────────────────────────────────────────────── */

export default function CircularGallery({
  items,
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  className = '',
  ...props
}) {
  const containerRef = useRef(null);
  // Normalised because the hook reports null before it resolves, which would
  // otherwise rebuild the WebGL context on the following render.
  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    // The caption colour and font are read off the element so the WebGL text
    // inherits the same Tailwind theme as the rest of the page.
    const style = getComputedStyle(container);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    const app = new App(container, {
      items,
      bend,
      textColor: style.color,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      reduceMotion,
    });

    return () => app.destroy();
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, reduceMotion]);

  return (
    <div className={`relative h-full w-full ${className}`} {...props}>
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{ touchAction: 'pan-y' }}
        className="h-full w-full cursor-grab overflow-hidden font-sans text-[26px] font-bold text-ink-100 active:cursor-grabbing md:text-[30px]"
      />

      {/* Text equivalent of the canvas content for assistive tech. */}
      <ul className="sr-only">
        {(items ?? []).map((item) => (
          <li key={item.text}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
