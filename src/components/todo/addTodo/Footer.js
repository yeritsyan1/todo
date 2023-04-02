import React from "react";

export default function Footer(props) {
  const { todos } = props;
  return (
    <>
      {todos && (
        <p style={{ textAlign: "end", marginRight: "5%" }}>
          Todos ({todos.length})
        </p>
      )}
    </>
  );
}
