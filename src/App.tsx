import { useMemo, useState } from "react";
import Header from "./components/Header";
import VideoPanel from "./components/VideoPanel";
import DetectionList from "./components/DetectionList";
import ControlPanel from "./components/ControlPanel";
import HistoryPanel from "./components/HistoryPanel";
import { useDetectionWebSocket } from "./hooks/useDetectionWebSocket";
import { clampThreshold, getFinalStatus } from "./utils/status";
import type { Detection, SavedHistoryItem } from "./types/detection";

export default function App() {
  const { payload, connectionState } = useDetectionWebSocket();

  const [showBoxes, setShowBoxes] = useState(true);
  const [history, setHistory] = useState<SavedHistoryItem[]>([]);


const filteredPayload = payload;


  const saveSnapshot = () => {
    if (!filteredPayload) return;

    const item: SavedHistoryItem = {
      id: `${filteredPayload.frame_id}-${Date.now()}`,
      savedAt: new Date().toLocaleString(),
      frameId: filteredPayload.frame_id,
      finalStatus: filteredPayload.final_status,
      detections: filteredPayload.detections
    };

    setHistory((prev) => [item, ...prev].slice(0, 10));
  };

  const finalStatus = filteredPayload?.final_status ?? "normal";

  return (
    <div className="app-shell">
      <Header connectionState={connectionState} finalStatus={finalStatus} />

      <main className="layout">
        <div className="left-column">
          <VideoPanel
            payload={filteredPayload}
            showBoxes={showBoxes}
          />
        </div>

        <div className="right-column">
          <DetectionList payload={filteredPayload} />
          <ControlPanel
            showBoxes={showBoxes}
            setShowBoxes={setShowBoxes}
            onSaveSnapshot={saveSnapshot}
          />
          <HistoryPanel items={history} />
        </div>
      </main>
    </div>
  );
}