type ProgressCardProps = {
  value: number; // 0 to 100
  label?: string;
  className?: string; // use for positioning, e.g. "absolute right-0 top-24"
};

export default function ProgressCard({
  value,
  label = "Learning Progress",
  className = "",
}: ProgressCardProps) {
  const percent = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-54 rounded-2xl bg-base-100 p-6 text-left shadow-lg ${className}`}
    >
      <p className="text-xs text-base-content/60">{label}</p>
      <p className="mt-1 text-3xl font-semibold">{percent}%</p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-base-200"
      >
        <div
          className="h-full rounded-full bg-[#C6F432]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}