import type { Detection } from "../types/detection";

export function getFinalStatus(detections: Detection[]): "normal" | "defect" {
  return detections.length === 0 ? "normal" : "defect";
}

export function clampThreshold(value: number) {
  if (Number.isNaN(value)) return 0.5;
  return Math.min(1, Math.max(0, value));
}

export function classColor(defectClass: string) {
  switch (defectClass) {
    case "dent":
      return "#f59e0b";
    case "scratch":
      return "#0ea5e9";
    case "stain":
      return "#6b7280";
    case "smash":
      return "#ef4444";
    default:
      return "#22c55e";
  }
}