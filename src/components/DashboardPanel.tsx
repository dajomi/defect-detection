import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { classColor } from "../utils/status";

type DashboardStats = {
  totalFrames: number;
  normalFrames: number;
  defectFrames: number;
  totalDetections: number;
  defectCounts: Record<string, number>;
  defectRatios: Record<string, number>;
};

type Props = {
  stats: DashboardStats;
};

const defectLabelMap: Record<string, string> = {
  dent: "찍힘",
  scratch: "스크래치",
  stain: "오염",
  smash: "우그러짐",
};

export default function DashboardPanel({ stats }: Props) {
  const defectOrder = ["dent", "scratch", "stain", "smash"];

  const maxCount = Math.max(
    1,
    ...defectOrder.map((key) => stats.defectCounts[key] ?? 0)
  );

  const donutData = defectOrder.map((key) => ({
    key,
    name: defectLabelMap[key],
    value: stats.defectCounts[key] ?? 0,
  }));

  const hasDetections = donutData.some((item) => item.value > 0);

  return (
    <main className="dashboard-layout">
      {/* 요약 카드 */}
      <section className="dashboard-summary-grid">


        <div className="summary-card">
          <p className="summary-label">불량 프레임</p>
          <h3 className="summary-value">{stats.defectFrames}</h3>
        </div>

        <div className="summary-card">
          <p className="summary-label">총 결함 탐지 수</p>
          <h3 className="summary-value">{stats.totalDetections}</h3>
        </div>
      </section>

      {/* 메인 영역 */}
      <section className="dashboard-grid">
        {/* 결함별 개수 */}
        <section className="panel">
          <div className="panel-header">
            <h2>결함별 개수</h2>
          </div>

          <div className="panel-body chart-list">
            {defectOrder.map((key) => {
              const count = stats.defectCounts[key] ?? 0;
              const width = `${(count / maxCount) * 100}%`;

              return (
                <div key={key} className="chart-row">
                  <div className="chart-row-top">
                    <span className="chart-label">
                      {defectLabelMap[key]}
                    </span>
                    <span className="chart-value">{count}개</span>
                  </div>

                  <div className="chart-bar-bg">
                    <div
                      className={`chart-bar chart-bar-${key}`}
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 결함별 비율 (도넛 차트) */}
        <section className="panel">
          <div className="panel-header">
            <h2>결함별 비율</h2>
          </div>

          <div className="panel-body donut-panel">
            {hasDetections ? (
              <div className="donut-chart-wrapper">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={2}
                    >
                      {donutData.map((entry) => (
                        <Cell
                          key={entry.key}
                          fill={classColor(entry.key)}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}개`,
                        name,
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>

                <div className="donut-center-label">
                  <div className="donut-center-title">총 결함</div>
                  <div className="donut-center-value">
                    {stats.totalDetections}
                  </div>
                </div>
              </div>
            ) : (
              <div className="donut-empty">
                아직 집계된 결함이 없습니다.
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}