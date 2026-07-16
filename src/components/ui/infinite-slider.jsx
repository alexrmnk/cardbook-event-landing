import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'framer-motion';

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className = '',
}) {
  const [isHovering, setIsHovering] = useState(false);
  const currentSpeed = isHovering && speedOnHover ? speedOnHover : speed;
  const ref = useRef(null);
  const [size, setSize] = useState(0);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const updateSize = () => {
      setSize(direction === 'horizontal' ? element.offsetWidth : element.offsetHeight);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [children, direction]);

  useEffect(() => {
    if (!size) return undefined;

    let controls;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      const distanceToTravel = Math.abs(to - from);
      const duration = distanceToTravel / currentSpeed;

      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentSpeed, size, gap, isTransitioning, direction, reverse]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setIsHovering(true);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setIsHovering(false);
        },
      }
    : {};

  return (
    <div className={`overflow-hidden ${className}`.trim()}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
