import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import VideoPanel from "./components/VideoPanel";
import DetectionList from "./components/DetectionList";
import ControlPanel from "./components/ControlPanel";
import DashboardPanel from "./components/DashboardPanel";
import { useDetectionWebSocket } from "./hooks/useDetectionWebSocket";
import type { DetectionPayload } from "./types/detection";

type TabType = "monitor" | "dashboard";

export default function App() {
  const { payload, connectionState } = useDetectionWebSocket();
  const [showBoxes, setShowBoxes] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("monitor");
  const [logs, setLogs] = useState<DetectionPayload[]>([]);

  useEffect(() => {
    if (!payload) return;

    setLogs((prev) => {
      const isDuplicate =
        prev.length > 0 && prev[prev.length - 1].frame_id === payload.frame_id;

      if (isDuplicate) return prev;

      return [...prev, payload];
    });
  }, [payload]);

  const finalStatus = payload?.final_status ?? "normal";

  const dashboardStats = useMemo(() => {
    const defectKeys = ["dent", "scratch", "stain", "smash"] as const;

    const defectCounts: Record<string, number> = {
      dent: 0,
      scratch: 0,
      stain: 0,
      smash: 0,
    };

    let totalFrames = logs.length;
    let normalFrames = 0;
    let defectFrames = 0;
    let totalDetections = 0;

    logs.forEach((frame) => {
      if (!frame.detections || frame.detections.length === 0) {
        normalFrames += 1;
      } else {
        defectFrames += 1;
      }

      frame.detections.forEach((det) => {
        if (defectKeys.includes(det.class as (typeof defectKeys)[number])) {
          defectCounts[det.class] += 1;
          totalDetections += 1;
        }
      });
    });

    const defectRatios: Record<string, number> = {};
    defectKeys.forEach((key) => {
      defectRatios[key] =
        totalDetections === 0 ? 0 : (defectCounts[key] / totalDetections) * 100;
    });

    return {
      totalFrames,
      normalFrames,
      defectFrames,
      totalDetections,
      defectCounts,
      defectRatios,
    };
  }, [logs]);

  return (
    <div className="app-shell">
      <Header connectionState={connectionState} finalStatus={finalStatus} />

      <div className="top-tabs">
        <button
          className={`tab-btn ${activeTab === "monitor" ? "tab-btn-active" : ""}`}
          onClick={() => setActiveTab("monitor")}
        >
          실시간 모니터링
        </button>
        <button
          className={`tab-btn ${activeTab === "dashboard" ? "tab-btn-active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          통계 대시보드
        </button>
      </div>

      {activeTab === "monitor" ? (
        <main className="layout">
          <div className="left-column">
            <VideoPanel
              payload={payload}
              showBoxes={showBoxes}
            />
          </div>

          <div className="right-column">
            <DetectionList payload={payload} />
            <ControlPanel
              showBoxes={showBoxes}
              setShowBoxes={setShowBoxes}
            />
          </div>
        </main>
      ) : (
        <DashboardPanel stats={dashboardStats} />
      )}
    </div>
  );
}