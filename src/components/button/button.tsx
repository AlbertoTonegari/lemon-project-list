import "./button.css";

type Props = {
  title: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ title, ...props }: Props) {
  return (
    <button className="stylish-button" {...props}>
      {title}
    </button>
  );
}
