import { classNames } from "@/lib/classUtil";

export default function AddTask({ close }: { close: () => void }) {
  return (
    <div
      className={
        "fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      }
    >
      <div
        data-dialog="sign-in-modal"
        className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm"
      >
        <div className="relative flex flex-col bg-white">
          <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
            <h3 className="text-2xl">Create Task</h3>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Title</label>
              <input
                type="email"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter a title"
              />
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
              className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
