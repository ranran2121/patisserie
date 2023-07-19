import React from "react";

const Message = (props: { message: string }) => {
  const { message } = props;
  return (
    <div className="height flex flex-col justify-center">
      <p className="capitalize font-bold text-3xl bg-color2 p-4">{message}</p>
    </div>
  );
};

export default Message;
