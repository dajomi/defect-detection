type Props = {
  threshold: number;
  setThreshold: (value: number) => void;
  showBoxes: boolean;
  setShowBoxes: (value: boolean) => void;
  paused: boolean;
  setPaused: (value: boolean) => void;
  onSaveSnapshot: () => void;
};

export default function ControlPanel({
  threshold,
  setThreshold,
  showBoxes,
  setShowBoxes,
  paused,
  setPaused,
  onSaveSnapshot
}: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Controls</h2>
      </div>

      <div className="panel-body controls">
        <label className="field">
          <span>Confidence Threshold</span>
          <input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </label>

        <label className="toggle-row">
          <span>Show Bounding Boxes</span>
          <input
            type="checkbox"
            checked={showBoxes}
            onChange={(e) => setShowBoxes(e.target.checked)}
          />
        </label>

        <label className="toggle-row">
          <span>Pause Stream</span>
          <input
            type="checkbox"
            checked={paused}
            onChange={(e) => setPaused(e.target.checked)}
          />
        </label>

        <button className="primary-btn" onClick={onSaveSnapshot}>
          Save Snapshot
        </button>
      </div>
    </section>
  );
}