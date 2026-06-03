function BarRow(props) {
  let roundedPercent = Math.round(props.percent / 10) * 10;

  if (roundedPercent < 0) {
    roundedPercent = 0;
  }

  if (roundedPercent > 100) {
    roundedPercent = 100;
  }

  const barClass = 'bar-fill bar-fill-' + roundedPercent;

  return (
    <div className="bar-row">
      <p className="bar-label">{props.label} — {props.percent}%</p>
      <div className="bar-track">
        <span className={barClass}></span>
      </div>
    </div>
  );
}

export default BarRow;
