import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-2xl w-full mx-auto">{children}</div>;
};

export default layout;
