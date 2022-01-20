import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

/**
 * Custom Link Component
 */
export function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      style={{
        textDecoration: match ? "none" : "none",
        color: "white",
        fontSize: "18px",
      }}
      to={to}
      {...props}
    >
      {match && "[ "}
      {children}
      {match && " ]"}
    </Link>
  );
}
