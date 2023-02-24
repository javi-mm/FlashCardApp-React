function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${"customClass"} ${"right_arrow"}`}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${"customClass"} ${"left_arrow"}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export { NextArrow, PrevArrow };
