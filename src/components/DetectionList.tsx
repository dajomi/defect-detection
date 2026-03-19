import StatusBadge from "./StatusBadge";
import type { DetectionPayload } from "../types/detection";

type Props = {
  payload: DetectionPayload | null;
};

const defectLabelMap: Record<string, string> = {
  dent: "찍힘",
  scratch: "스크래치",
  stain: "오염",
  smash: "우그러짐",
  normal: "정상",
};

export default function DetectionList({ payload }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>현재 탐지 결과</h2>
      </div>

      <div className="panel-body">
        {!payload || payload.detections.length === 0 ? (
          <div className="empty-state-box">
            <div className="section-chip-row">
              <StatusBadge label="정상" tone="success" />
            </div>
            <p className="section-desc">현재 프레임에서 결함이 탐지되지 않았습니다.</p>
          </div>
        ) : (
          <ul className="detection-list">
            {payload.detections.map((det, idx) => (
              <li key={`${det.class}-${idx}`} className="detection-item">
                <div className="detection-row">
                  <strong>{defectLabelMap[det.class] ?? det.class}</strong>
                  <span>{(det.score * 100).toFixed(1)}%</span>
                </div>

                <div className="detection-info-box">
                  <div className="info-line">
                    <span className="info-label">클래스</span>
                    <span>{defectLabelMap[det.class] ?? det.class}</span>
                  </div>
                  <div className="info-line">
                    <span className="info-label">신뢰도</span>
                    <span>{(det.score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="info-line">
                    <span className="info-label">bbox</span>
                    <span>[{det.bbox.join(", ")}]</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}