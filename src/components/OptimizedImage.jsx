import { useState, useEffect, memo } from "react";
import { Image as BootstrapImage } from "react-bootstrap";
import "./OptimizedImage.css";

/**
 * OptimizedImage component with lazy loading and placeholder support
 *
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.placeholderSrc - Placeholder image URL (optional)
 * @param {boolean} props.roundedCircle - Whether to make the image rounded (optional)
 * @param {string} props.variant - Image variant (optional)
 * @param {Object} props.style - Additional inline styles (optional)
 * @param {Function} props.onLoad - Callback when image loads (optional)
 * @param {Function} props.onError - Callback when image fails to load (optional)
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23cccccc'/%3E%3C/svg%3E",
  roundedCircle = false,
  variant,
  style = {},
  onLoad,
  onError,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    if (src !== imgSrc && !isLoaded) {
      setImgSrc(placeholderSrc);
      setIsLoaded(false);
      setError(false);
    }

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setError(true);
      if (onError) onError();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholderSrc, onLoad, onError]);

  const imageStyle = {
    transition: "opacity 0.3s, filter 0.3s",
    opacity: isLoaded ? 1 : 0.5,
    filter: isLoaded ? "none" : "blur(8px)",
    ...style,
  };

  return (
    <BootstrapImage
      src={error ? placeholderSrc : imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "loaded" : "loading"}`}
      roundedCircle={roundedCircle}
      variant={variant}
      style={imageStyle}
      loading="lazy"
      {...rest}
    />
  );
};

export default memo(OptimizedImage);
