export default function Home() {
  return (
    <div className="p-8">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Attaques réussies</div>
          <div className="stat-value">10</div>
          <div className="stat-desc">25 %</div>
        </div>

        <div className="stat">
          <div className="stat-title">Attaques échouées</div>
          <div className="stat-value">20</div>
          <div className="stat-desc">75 %</div>
        </div>
      </div>
    </div>
  );
}
