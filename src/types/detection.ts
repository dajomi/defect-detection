export type DefectClass = "normal" | "dent" | "smash" | "dirt" | "scratch";

export type Detection = {
  class: Exclude<DefectClass, "normal">;
  score: number;
  bbox: [number, number, number, number]; // [xmin, ymin, xmax, ymax]
};

export type DetectionPayload = {
  frame_id: number;
  timestamp: string;
  image_width: number;
  image_height: number;
  detections: Detection[];
  final_status: "normal" | "defect";
};

export type SavedHistoryItem = {
  id: string;
  savedAt: string;
  frameId: number;
  finalStatus: "normal" | "defect";
  detections: Detection[];
};