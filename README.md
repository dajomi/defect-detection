🚀 불량 검출 실시간 대시보드
📌 프로젝트 개요
Jetson 기반의 머신비전 시스템을 활용하여  
실시간으로 제품 결함을 탐지하고 웹 대시보드로 시각화하는 시스템입니다.
카메라에서 입력된 영상은 OpenCV로 처리되고,  
AI 모델을 통해 결함을 탐지한 뒤 WebSocket으로 프론트엔드에 전달됩니다.
---
🎯 주요 기능
📷 실시간 영상 스트리밍
🧠 AI 기반 결함 탐지 (SSD / YOLO 등)
🟥 Bounding Box 시각화
📊 결함 통계 대시보드
결함별 개수
결함 비율
🔄 실시간 데이터 전송 (WebSocket)
---
🏗️ 시스템 아키텍처
    [Camera]
       ↓
    [Jetson + OpenCV]
       ↓ (frame)
    [AI Model Inference]
       ↓ (detection result)
    [WebSocket Server]
       ↓
    [React Dashboard]

---
⚙️ 기술 스택
🔹 Backend (Jetson)
Python
OpenCV
PyTorch / ONNX Runtime
WebSocket (FastAPI or asyncio)
🔹 Frontend
React + TypeScript
CSS (Custom UI)
Recharts (통계 시각화)
---
📦 프로젝트 구조
    project/
    │
    ├── backend/
    │   ├── camera.py
    │   ├── inference.py
    │   ├── websocket.py
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── VideoPanel.tsx
    │   │   │   ├── DashboardPanel.tsx
    │   │   │   └── ControlPanel.tsx
    │   │   ├── App.tsx
    │   │   └── styles.css
    │
    └── README.md

---
🔌 실행 방법
    cd frontend
    npm install
    npm run dev

---
🔗 환경 변수 설정
.env
    VITE_WS_URL=ws://<JETSON_IP>:8000/ws/detections

---
📡 데이터 형식 (WebSocket)
    {
      "timestamp": 1710000000,
      "detections": [
        {
          "class": "scratch",
          "confidence": 0.92,
          "bbox": [x, y, w, h]
        }
      ]
    }

---
🧪 결함 클래스
클래스	설명
dent	찍힘
scratch	스크래치
stain	오염
smash	우그러짐
---
📊 대시보드 구성
실시간 영상 + Bounding Box
현재 탐지 결과
결함별 개수
결함 비율 그래프
---

> Jetson + AI + Web 기반 실시간 스마트팩토리 불량 검출 시스템
