export default function AvatarStack({
  items,
  remaining,
}: {
  items?: any[];
  remaining: number;
}) {
  return (
    <div className="flex items-center -space-x-4">
      {items?.map((user) => (
        <img
          key={user}
          alt="user 1"
          src={user}
          className="relative inline-block h-12 w-12 !rounded-full  border-2 border-white object-cover object-center hover:z-10 focus:z-10"
        />
      ))}
      {remaining > 0 && (
        <span className="flex items-center justify-center text-sm font-medium text-white bg-blue-400 relative h-12 w-12 rounded-full border-2 border-white hover:z-10 focus:z-10">
          +{remaining}
        </span>
      )}
    </div>
  );
}
