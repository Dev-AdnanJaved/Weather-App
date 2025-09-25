import React from "react";
import { useState, useEffect } from "react";

const usePreLoadImage = (src) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    setLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return loaded;
};

export default usePreLoadImage;
