import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  color?: "blue" | "green" | "yellow" | "purple" | "red" | "cyan";
  onClick?: () => void;
};

const colorMap = {
  blue: "bg-blue-500/15 text-blue-500 dark:text-blue-400",
  green: "bg-emerald-500/15 text-emerald-500 dark:text-emerald-400",
  yellow: "bg-yellow-500/15 text-yellow-500 dark:text-yellow-400",
  purple: "bg-purple-500/15 text-purple-500 dark:text-purple-400",
  red: "bg-red-500/15 text-red-500 dark:text-red-400",
  cyan: "bg-cyan-500/15 text-cyan-500 dark:text-cyan-400",
};

const StatCard = ( {
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
  onClick,
}: StatCardProps ) => {
  const clickable = Boolean( onClick );

  return (
    <button
      type="button"
      onClick={ onClick }
      disabled={ !clickable }
      className={ `w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 sm:p-6 ${ clickable
          ? "cursor-pointer hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 active:scale-[0.98]"
          : "cursor-default hover:border-slate-300 dark:hover:border-slate-700"
        }` }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
            { title }
          </p>

          <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:mt-5 sm:text-3xl">
            { value }
          </h3>

          { subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              { subtitle }
            </p>
          ) }
        </div>

        { Icon && (
          <div className={ `rounded-2xl p-3 ${ colorMap[ color ] }` }>
            <Icon size={ 22 } />
          </div>
        ) }
      </div>
    </button>
  );
};

export default StatCard;