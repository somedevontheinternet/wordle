type RowProps = React.PropsWithChildren<object>;

export const Row = ({ children }: RowProps) => {
  return <div style={{ display: "flex", marginTop: "5px" }}>{children}</div>;
};
