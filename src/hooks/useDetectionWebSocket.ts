import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../config";
import type { DetectionPayload } from "../types/detection";

type ConnectionState = "connecting" | "connected" | "disconnected" | "error";

export function useDetectionWebSocket() {
  const [payload, setPayload] = useState<DetectionPayload | null>(null);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("connecting");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    setConnectionState("connecting");

    ws.onopen = () => {
      setConnectionState("connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as DetectionPayload;
        setPayload(data);
      } catch (error) {
        console.error("WebSocket JSON parse error:", error);
      }
    };

    ws.onerror = () => {
      setConnectionState("error");
    };

    ws.onclose = () => {
      setConnectionState("disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return { payload, connectionState };
}