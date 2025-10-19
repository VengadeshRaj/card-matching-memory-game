import { ReactNode } from "react";

const CardSubContainer = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex">{children}</div>;
};

export default CardSubContainer
