import StatusBadge from "./StatusBadge";

type Props = {
  connectionState: "connecting" | "connected" | "disconnected" | "error";
  finalStatus: "normal" | "defect";
};

export default function Header({ connectionState, finalStatus }: Props) {
  const connectionTone =
    connectionState === "connected"
      ? "success"
      : connectionState === "connecting"
      ? "warning"
      : "danger";

  const resultTone = finalStatus === "normal" ? "success" : "danger";

  const connectionLabel =
    connectionState === "connected"
      ? "WS 연결됨"
      : connectionState === "connecting"
      ? "WS 연결 중"
      : connectionState === "error"
      ? "WS 오류"
      : "WS 연결 끊김";

  return (
    <header className="header">
      <div>
        <h1 className="title">🔍 불량 검출 대시보드</h1>
      </div>

      <div className="header-badges">
        <StatusBadge
          label={connectionLabel}
          tone={connectionTone as "success" | "warning" | "danger"}
        />
        <StatusBadge
          label={finalStatus === "normal" ? "정상" : "불량"}
          tone={resultTone}
        />
      </div>
    </header>
  );
}