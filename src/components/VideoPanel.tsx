import { classColor } from "../utils/status";
import type { DetectionPayload } from "../types/detection";

type Props = {
  payload: DetectionPayload | null;
  showBoxes: boolean;
};

const defectLabelMap: Record<string, string> = {
  dent: "찍힘",
  scratch: "스크래치",
  stain: "오염",
  smash: "우그러짐",
};

export default function VideoPanel({ payload, showBoxes }: Props) {
  const imageSrc =
    payload?.image ? `data:image/jpeg;base64,${payload.image}` : null;

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>실시간 검사 이미지</h2>
      </div>

      <div className="video-wrapper">
        {imageSrc ? (
          <img className="video-stream" src={imageSrc} alt="검사 이미지" />
        ) : (
          <div className="video-paused">
            이미지 수신 대기 중
          </div>
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
                  borderColor: classColor(det.class),
                }}
              >
                <span
                  className="bbox-label"
                  style={{ backgroundColor: classColor(det.class) }}
                >
                  {defectLabelMap[det.class] ?? det.class}{" "}
                  {(det.score * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}

        <div className="frame-info">
          프레임: {payload?.frame_id ?? "-"} | 시간:{" "}
          {payload ? new Date(payload.timestamp).toLocaleTimeString() : "-"}
        </div>
      </div>
    </section>
  );
}