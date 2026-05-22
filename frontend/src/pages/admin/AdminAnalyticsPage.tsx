import { Clock, DollarSign, Star, Users } from "lucide-react";
import Topbar from "../../components/layout/Topbar";
import StatCard from "../../components/common/StatCard";

const AdminAnalyticsPage = () => {
  return (
    <>
      <Topbar title="Analytics" />

      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-blue-300">Parking statistics and trends</p>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          <StatCard title="Weekly Revenue" value="৳1,009" subtitle="↗ +18% vs last week" icon={ DollarSign } color="green" />
          <StatCard title="Total Users" value="342" subtitle="+5 new today" icon={ Users } color="blue" />
          <StatCard title="Avg Duration" value="2h 18m" subtitle="↘ -4m vs yesterday" icon={ Clock } color="purple" />
          <StatCard title="Satisfaction" value="4.8/5" subtitle="128 reviews" icon={ Star } color="yellow" />
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex justify-between">
            <h2 className="font-bold text-white">Weekly Revenue</h2>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-blue-300">
              Export
            </button>
          </div>

          <div className="flex h-64 items-end gap-8 border-b border-l border-slate-800 px-6">
            { [ 125, 90, 155, 110, 200, 240, 85 ].map( ( value, index ) => (
              <div key={ index } className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-lg bg-blue-500"
                  style={ { height: `${ value }px` } }
                />
                <span className="text-sm text-slate-500">
                  { [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ][ index ] }
                </span>
              </div>
            ) ) }
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 font-bold text-white">Today&apos;s Occupancy</h2>
            <div className="flex h-52 items-end gap-5 border-b border-l border-slate-800 px-4">
              { [ 90, 60, 30, 70, 50, 80 ].map( ( value, index ) => (
                <div key={ index } className="flex flex-1 flex-col items-center">
                  <div className="w-full rounded-t-lg bg-cyan-500" style={ { height: `${ value }%` } } />
                </div>
              ) ) }
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 font-bold text-white">Peak Hours</h2>

            <div className="space-y-5">
              { [
                [ "6am", "11%", "৳3" ],
                [ "8am", "44%", "৳12" ],
                [ "10am", "67%", "৳18" ],
                [ "12pm", "83%", "৳23" ],
                [ "2pm", "61%", "৳17" ],
                [ "4pm", "72%", "৳20" ],
              ].map( ( [ time, percent, amount ] ) => (
                <div key={ time } className="grid grid-cols-[50px_1fr_50px_50px] items-center gap-4 text-sm">
                  <span className="text-blue-300">{ time }</span>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-blue-500" style={ { width: percent } } />
                  </div>
                  <span className="font-bold text-white">{ percent }</span>
                  <span className="text-blue-300">{ amount }</span>
                </div>
              ) ) }
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminAnalyticsPage;