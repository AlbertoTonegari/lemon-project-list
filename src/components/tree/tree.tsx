import { ReactNode, useState } from "react";
import { MenuToggle } from "../menu-toggle/menu-toggle";
import { Line } from "../line/line";

type Props = {
  children?: ReactNode;
  title: string | number;
};

export function Tree({ children, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Line isOpen={isOpen} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          gap: 5,
        }}
        onClick={handleOnClick}
      >
        <MenuToggle isOpen={isOpen} />
        <p>{title}</p>
      </div>

      <div
        style={{
          paddingLeft: "30px",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
