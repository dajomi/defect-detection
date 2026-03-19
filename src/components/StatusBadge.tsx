type Props = {
  label: string;
  tone?: "default" | "success" | "danger" | "warning";
};

export default function StatusBadge({ label, tone = "default" }: Props) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}