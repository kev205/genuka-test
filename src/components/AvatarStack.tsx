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
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
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
