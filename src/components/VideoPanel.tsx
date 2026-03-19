import { STREAM_URL } from "../config";
import { classColor } from "../utils/status";
import type { DetectionPayload } from "../types/detection";

type Props = {
  payload: DetectionPayload | null;
  showBoxes: boolean;
  paused: boolean;
};

export default function VideoPanel({ payload, showBoxes, paused }: Props) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Live Stream</h2>
      </div>

      <div className="video-wrapper">
        {!paused ? (
          <img className="video-stream" src={STREAM_URL} alt="Live stream" />
        ) : (
          <div className="video-paused">Stream Paused</div>
        )}

        {showBoxes &&
          payload &&
          payload.detections.map((det, idx) => {
            const [xmin, ymin, xmax, ymax] = det.bbox;
            const left = (xmin / payload.image_width) * 100;
            const top = (ymin / payload.image_height) * 100;
            const width = ((xmax - xmin) / payload.image_width) * 100;
            const height = ((ymax - ymin) / payload.image_height) * 100;

            return (
              <div
                key={`${det.class}-${idx}`}
                className="bbox"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${width}%`,
                  height: `${height}%`,
                  borderColor: classColor(det.class)
                }}
              >
                <span
                  className="bbox-label"
                  style={{ backgroundColor: classColor(det.class) }}
                >
                  {det.class} {(det.score * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}

        <div className="frame-info">
          Frame: {payload?.frame_id ?? "-"} | Time:{" "}
          {payload ? new Date(payload.timestamp).toLocaleTimeString() : "-"}
        </div>
      </div>
    </section>
  );
}