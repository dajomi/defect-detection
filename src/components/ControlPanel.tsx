type Props = {
  showBoxes: boolean;
  setShowBoxes: (value: boolean) => void;
  onSaveSnapshot: () => void;
};

export default function ControlPanel({
  showBoxes,
  setShowBoxes,
  onSaveSnapshot
}: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>제어 패널</h2>
      </div>

      <div className="panel-body controls">
        <div className="section-box">
          <label className="toggle-row">
            <span>바운딩 박스 표시</span>
            <input
              type="checkbox"
              checked={showBoxes}
              onChange={(e) => setShowBoxes(e.target.checked)}
            />
          </label>
        </div>

        <button className="primary-btn" onClick={onSaveSnapshot}>
          현재 상황 저장
        </button>
      </div>
    </section>
  );
}