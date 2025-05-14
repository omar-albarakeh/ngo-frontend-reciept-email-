import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./CameraRoll.css";

const loadIndex = (folder) =>
  import(`./Data/${folder}.json`)
    .then((mod) => mod.default || mod)
    .catch((err) => {
      console.error(`Could not load index for ${folder}:`, err);
      return { images: [] };
    });

const AutoScrollingRoll = ({ folder }) => {
  const stripRef = useRef(null);
  const tlRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let cancelled = false;

    loadIndex(folder).then((index) => {
      if (cancelled) return;

      const urls = index.images.map((rawPath) => {
        const fileName = rawPath.replace(/^.*[\\/]/, "");
        return `/images/${folder}/${fileName}`;
      });

      setImages(urls);
    });

    return () => {
      cancelled = true;
    };
  }, [folder]);

  useEffect(() => {
    if (!images.length) return;
    const stripEl = stripRef.current;
    tlRef.current?.kill();

    requestAnimationFrame(() => {
      const totalWidth = stripEl.scrollWidth / 2;
      tlRef.current = gsap.to(stripEl, {
        x: `-=${totalWidth}`,
        duration: 300,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    });

    return () => tlRef.current?.kill();
  }, [images]);

  const pause = () => tlRef.current?.pause();
  const play = () => tlRef.current?.play();

  return (
    <div
      className="camera-roll-container"
      onMouseEnter={pause}
      onMouseLeave={play}>
      <div className="image-strip" ref={stripRef}>
        {[...images, ...images].map((src, i) => (
          <img src={src} key={i} className="roll-image" alt={`Slide ${i}`} />
        ))}
      </div>
    </div>
  );
};

export default AutoScrollingRoll;
