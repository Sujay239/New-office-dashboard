import React, { useState } from "react";

const UserHome: React.FC = () => {
  const [tasks, setTasks] = useState('');

  const Tasks = [{
    
  }];
  return (
    <div className="space-y-6 mt-8 max-lg:ml-4">
      {/* Welcome header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening today
        </p>
      </div>

      {/* Stats / Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Assigned Tasks
          </p>
          <h2 className="text-2xl font-bold text-blue-600">8</h2>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completed
          </p>
          <h2 className="text-2xl font-bold text-green-600">5</h2>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">Pending</p>
          <h2 className="text-2xl font-bold text-orange-500">3</h2>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Attendance
          </p>
          <h2 className="text-2xl font-bold text-indigo-500">Present</h2>
        </div>
      </div>

      {/* Employee Schedule */}
      <div className="rounded-xl p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
          Today&apos;s Schedule
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full md:text-sm text-[8.5px]">
            <thead>
              <tr className="text-center text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 pr-4 md:text-sm text-[8.5px]">Meeting</th>
                <th className="py-2 pr-4 md:text-sm text-[8.5px]">Date</th>
                <th className="py-2 pr-4 md:text-sm text-[8.5px]">Time</th>
                <th className="py-2 md:text-sm text-[8.5px]">Join</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/60">
                <td className="py-3 pr-4 text-slate-800 dark:text-slate-100">
                  Daily Standup
                </td>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  29 Nov 2025
                </td>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  10:00 AM – 10:15 AM
                </td>
                <td className="py-3">
                  <a
                    href="https://meet.example.com/standup"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-md:text-[10px] items-center rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-medium hover:bg-blue-500 transition-colors"
                  >
                    Join Meeting
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/60">
                <td className="py-3 pr-4 text-slate-800 dark:text-slate-100">
                  Client Sync
                </td>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  29 Nov 2025
                </td>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  2:30 PM – 3:15 PM
                </td>
                <td className="py-3">
                  <a
                    href="https://meet.example.com/client-sync"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center max-md:text-[10px] rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-medium hover:bg-blue-500 transition-colors"
                  >
                    Join Meeting
                  </a>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/60">
                <td className="py-3 pr-4 text-slate-800 dark:text-slate-100">
                  1:1 with Manager
                </td>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  29 Nov 2025
                </td>
                <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                  5:00 PM – 5:30 PM
                </td>
                <td className="py-3">
                  <a
                    href="https://meet.example.com/one-on-one"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center max-md:text-[10px] rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-medium hover:bg-blue-500 transition-colors"
                  >
                    Join Meeting
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent tasks preview */}
      <div className="rounded-xl p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">
          Recent Tasks
        </h3>

        <ul className="space-y-3">
          <li className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
            <span className=" text-slate-800 dark:text-white md:text-sm text-[13px]">
              Prepare weekly performance report
            </span>
            <span className="md:text-xs text-[10px] px-2 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-600 dark:text-white">
              In Progress
            </span>
          </li>

          <li className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
            <span className="text-sm text-slate-800 dark:text-white">
              Client presentation preparation
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-500 dark:text-white">
              Completed
            </span>
          </li>

          <li className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
            <span className="text-sm text-slate-800 dark:text-white">
              Send follow-up emails
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-600 dark:text-white">
              Pending
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
