function BarRow(props) {
  return (
    <div className="bar-row">
      <p className="bar-label">{props.label} — {props.percent}%</p>
      <div className="bar-track">
        <span className="bar-fill" style={{ width: props.percent + '%' }}></span>
      </div>
    </div>
  );
}

export default BarRow;
