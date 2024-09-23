import Logo from "../../assets/icon.svg";

type Props = {
  isOpen: boolean;
};

export function MenuToggle({
  isOpen,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <Logo
      style={{
        transform: isOpen ? "rotate(90deg)" : undefined,
      }}
      {...props}
    />
  );
}
