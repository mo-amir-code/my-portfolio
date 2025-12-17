import React, { ReactNode } from "react";

const Error = ({ children }: { children: ReactNode }) => {
  return <span className="text-red-600 font-bold">{children}</span>;
};

export default Error;
