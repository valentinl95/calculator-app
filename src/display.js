import { useRef, useState, useEffect } from "react";

function Display({ value }) {
  const labelRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (labelRef.current) {
      setIsOverflowing(labelRef.current.offsetWidth < labelRef.current.scrollWidth);
    }
  }, [value]);

  return (
    <label
      className="display"
      ref={labelRef}
      style={{
        textOverflow: isOverflowing ? "ellipsis" : "clip",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {value}
    </label>
  );
}

export default Display;
