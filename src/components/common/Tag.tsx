import { Flex } from "./Flex";

export const Tag = ({
  onClick,
  children,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <button
      style={{
        borderRadius: "50px",
        backgroundColor: active ? "rgb(232, 232, 232)" : "rgb(255, 255, 255)",
        padding: "4px 8px",
        width: "fit-content",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
