import React from "react";

/**
 * Linha divisória entre as seções da landing — alinhada ao container central
 * (mesma largura/recuo das seções) para separar os tópicos com sutileza.
 */
export function Divider() {
  return (
    <div aria-hidden style={{ padding: "0 clamp(18px,5vw,72px)" }}>
      <div className="mx-auto border-t border-line" style={{ maxWidth: 1240 }} />
    </div>
  );
}
