"use client";

import { tabs } from "@/lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function onClick(tab: string) {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set("tab", tab);
    } else {
      params.delete("tab");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full">
      <div className="relative right-0">
        <ul
          className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
          data-tabs="tabs"
          role="list"
        >
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className="z-30 flex-auto text-center"
              onClick={() => onClick(tab.id)}
            >
              <span className="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit">
                {tab.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
