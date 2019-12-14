import React from "react";

export default function CheckPassword(props) {
  const { min, searchTerm, children } = props;
  const remaining = min - searchTerm.length;
  if (typeof children === "function") {
    return children(remaining);
  } else {
    return <>Enter {remaining} more characters</>;
  }
}
