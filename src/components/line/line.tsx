type Props = {
  isOpen: boolean;
};

export function Line({ isOpen }: Props) {
  return (
    <div
      style={{
        display: !isOpen ? "none" : "initial",
        position: "absolute",
        bottom: -30,
        left: 5.5,
        width: "1px",
        height: "100%",
        backgroundColor: "grey",
      }}
    />
  );
}
