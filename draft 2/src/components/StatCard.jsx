function StatCard(props) {
  return (
    <article className="card metric-card">
      <strong>{props.value}</strong>
      <span>{props.label}</span>
    </article>
  );
}

export default StatCard;
