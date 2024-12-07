import Header from "@/components/Header";
import ListContainer from "@/components/ListContainer";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] min-h-screen p-2 bg-gray-100">
      <main className="flex flex-col px-8 gap-4 row-start-1">
        <Header />
        <div className="w-full">
          <ListContainer />
        </div>
      </main>
    </div>
  );
}
