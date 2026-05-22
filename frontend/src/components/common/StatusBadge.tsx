type StatusBadgeProps = {
  status: "Active" | "Available" | "Occupied" | "Reserved" | "Upcoming" | "Completed" | "Cancelled" | "Maintenance";
};

const styles = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Occupied: "bg-red-500/15 text-red-400 border-red-500/30",
  Reserved: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Upcoming: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Completed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  Maintenance: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const StatusBadge = ( { status }: StatusBadgeProps ) => {
  return (
    <span className={ `rounded-full border px-3 py-1 text-xs font-bold ${ styles[ status ] }` }>
      { status }
    </span>
  );
};

export default StatusBadge;