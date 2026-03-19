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

  return (
    <header className="header">
      <div>
        <h1 className="title">Defect Detection Dashboard</h1>
        <p className="subtitle">Jetson Nano · Docker · SSD MobileNet V2</p>
      </div>

      <div className="header-badges">
        <StatusBadge
          label={`WS: ${connectionState}`}
          tone={connectionTone as "success" | "warning" | "danger"}
        />
        <StatusBadge
          label={finalStatus === "normal" ? "PASS" : "FAIL"}
          tone={resultTone}
        />
      </div>
    </header>
  );
}