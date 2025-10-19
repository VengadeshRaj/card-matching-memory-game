import { ReactNode } from "react";

const CardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col flex-wrap w-xs">
       {children}
    </div>
  );
};

export default CardContainer;