import StatusBadge from "./StatusBadge";
import type { DetectionPayload } from "../types/detection";

type Props = {
  payload: DetectionPayload | null;
};

export default function DetectionList({ payload }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Current Detections</h2>
      </div>

      <div className="panel-body">
        {!payload || payload.detections.length === 0 ? (
          <div className="empty-state">
            <StatusBadge label="normal" tone="success" />
            <p>No defect detected in current frame.</p>
          </div>
        ) : (
          <ul className="detection-list">
            {payload.detections.map((det, idx) => (
              <li key={`${det.class}-${idx}`} className="detection-item">
                <div className="detection-row">
                  <strong>{det.class}</strong>
                  <span>{(det.score * 100).toFixed(1)}%</span>
                </div>
                <div className="detection-bbox">
                  bbox: [{det.bbox.join(", ")}]
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}