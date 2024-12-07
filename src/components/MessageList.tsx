import { memo } from "react";

function MessageList() {
  return (
    <div className="flex min-h-screen">
      <h1>This is the messages list</h1>
    </div>
  );
}

export default memo(MessageList);
