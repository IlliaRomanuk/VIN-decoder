import "./DecoderHistory.css";

type Props = {
  history: string[];
  disabled: boolean;
  onSelect: (vin: string) => void;
};

function DecoderHistory({ history, disabled, onSelect }: Props) {
  return (
    <section className="card">
      <h2>Recent history</h2>

      {history.length === 0 ? (
        <p className="muted">No lookups yet.</p>
      ) : (
        <ul className="history-list">
          {history.map((vin) => (
            <li key={vin}>
              <button
                type="button"
                className="history-item"
                disabled={disabled}
                onClick={() => onSelect(vin)}
                title="Decode again"
              >
                <span>{vin}</span>
                <span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DecoderHistory;
