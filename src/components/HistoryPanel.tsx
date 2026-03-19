import StatusBadge from "./StatusBadge";
import type { SavedHistoryItem } from "../types/detection";

type Props = {
  items: SavedHistoryItem[];
};

export default function HistoryPanel({ items }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>History</h2>
      </div>

      <div className="panel-body">
        {items.length === 0 ? (
          <p className="empty-state">No saved snapshots yet.</p>
        ) : (
          <ul className="history-list">
            {items.map((item) => (
              <li key={item.id} className="history-item">
                <div className="history-top">
                  <strong>{item.savedAt}</strong>
                  <StatusBadge
                    label={item.finalStatus === "normal" ? "PASS" : "FAIL"}
                    tone={item.finalStatus === "normal" ? "success" : "danger"}
                  />
                </div>

                <div className="history-sub">
                  Frame #{item.frameId}
                </div>

                <div className="history-tags">
                  {item.detections.length === 0 ? (
                    <span className="tag tag-normal">normal</span>
                  ) : (
                    item.detections.map((d, idx) => (
                      <span key={idx} className={`tag tag-${d.class}`}>
                        {d.class}
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