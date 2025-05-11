import { useState, useRef, useEffect, useCallback, memo } from "react";

/**
 * VirtualList component for efficiently rendering large lists
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to render
 * @param {Function} props.renderItem - Function to render each item
 * @param {number} props.itemHeight - Height of each item in pixels
 * @param {number} props.height - Height of the virtual list container
 * @param {number} props.width - Width of the virtual list container
 * @param {number} props.overscan - Number of items to render outside of the visible area (default: 3)
 * @param {string} props.className - Additional CSS classes for the container
 * @param {Object} props.style - Additional inline styles for the container
 */
const VirtualList = ({
  items = [],
  renderItem,
  itemHeight,
  height,
  width = "100%",
  overscan = 3,
  className = "",
  style = {},
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Calculate the range of visible items
  const getVisibleRange = useCallback(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + height) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, height, itemHeight, items.length, overscan]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  // Calculate visible items
  const { startIndex, endIndex } = getVisibleRange();
  const visibleItems = items.slice(startIndex, endIndex + 1);

  // Calculate total height of all items
  const totalHeight = items.length * itemHeight;

  // Calculate offset for visible items
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      className={`virtual-list-container ${className}`}
      style={{
        height,
        width,
        overflow: "auto",
        position: "relative",
        ...style,
      }}
    >
      <div
        className="virtual-list-total-height"
        style={{
          height: totalHeight,
          width: "100%",
          position: "relative",
        }}
      >
        <div
          className="virtual-list-items"
          style={{
            position: "absolute",
            top: offsetY,
            width: "100%",
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={actualIndex}
                className="virtual-list-item"
                style={{
                  height: itemHeight,
                  width: "100%",
                }}
              >
                {renderItem(item, actualIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(VirtualList);
