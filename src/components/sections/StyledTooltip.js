import React from "react";
import { Tooltip } from "@chakra-ui/react";

export default function StyledTooltip({
  label,
  position,
  disabled = false,
  children,
}) {
  return (
    <Tooltip
      hasArrow
      label={label}
      placement={position}
      isDisabled={disabled}
      bg={"brandGray.darkest"}
      color={"white"}
      fontWeight={"semibold"}
      py={1}
      px={3}
    >
      {children}
    </Tooltip>
  );
}
