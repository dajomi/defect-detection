# Defect Detection UI

Jetson Nano + Docker + SSD MobileNet V2 결과를 받아서
실시간으로 결함을 표시하는 React 웹앱입니다.

---

## 1. 프로젝트 목적

이 UI는 다음 기능을 제공합니다.

- 실시간 영상 표시
- detection bbox 오버레이
- 결함 종류 및 confidence 표시
- PASS / FAIL 상태 표시
- snapshot history 저장

결함 클래스:
- normal
- dent
- smash
- stain
- scratch

---

## 2. 폴더 구조

```text
ui/
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ index.html
├─ .env.example
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ index.css
│  ├─ config.ts
│  ├─ types/
│  │  └─ detection.ts
│  ├─ hooks/
│  │  └─ useDetectionWebSocket.ts
│  ├─ components/
│  │  ├─ Header.tsx
│  │  ├─ StatusBadge.tsx
│  │  ├─ VideoPanel.tsx
│  │  ├─ DetectionList.tsx
│  │  ├─ ControlPanel.tsx
│  │  └─ HistoryPanel.tsx
│  └─ utils/
│     └─ status.ts
└─ README.md