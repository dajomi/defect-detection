import StatusBadge from "./StatusBadge";
import type { SavedHistoryItem } from "../types/detection";

type Props = {
  items: SavedHistoryItem[];
};

const defectLabelMap: Record<string, string> = {
  dent: "찍힘",
  scratch: "스크래치",
  stain: "오염",
  smash: "우그러짐",
  normal: "정상",
};

export default function HistoryPanel({ items }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>검사 이력</h2>
      </div>

      <div className="panel-body">
        {items.length === 0 ? (
          <div className="empty-state-box">
            <p className="section-desc">아직 저장된 상황이 없습니다.</p>
          </div>
        ) : (
          <ul className="history-list">
            {items.map((item) => (
              <li key={item.id} className="history-item">
                <div className="history-top">
                  <strong>{item.savedAt}</strong>
                  <StatusBadge
                    label={item.finalStatus === "normal" ? "정상" : "불량"}
                    tone={item.finalStatus === "normal" ? "success" : "danger"}
                  />
                </div>

                <div className="history-sub">
                  프레임 #{item.frameId}
                </div>

                <div className="history-tags">
                  {item.detections.length === 0 ? (
                    <span className="tag tag-normal">정상</span>
                  ) : (
                    item.detections.map((d, idx) => (
                      <span key={idx} className={`tag tag-${d.class}`}>
                        {defectLabelMap[d.class] ?? d.class}
                      </span>
                    ))
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}