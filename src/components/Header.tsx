"use client";

import { tabs } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h1 className="text-2xl font-semibold">
          {
            tabs.find(
              (tab) =>
                tab.id === (searchParams.get("tab")?.toString() ?? "today")
            )?.label
          }
        </h1>
        <h2 className="text-gray-500">{new Date().toDateString()}</h2>
      </div>
      <button
        style={{ backgroundColor: "#E5ECF9" }}
        className="flex items-center justify-center hadow-md rounded-md py-3 px-4 text-center text-sm transition-all shadow-sm focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#4E71D8"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p style={{ color: "#4E71D8" }}>New Task</p>
      </button>
    </div>
  );
}
