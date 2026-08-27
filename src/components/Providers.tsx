"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import type { ReactNode } from "react";

const editorialTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#d4a017",
    colorInfo: "#d4a017",
    colorBgBase: "#0b0c0a",
    colorBgContainer: "#12140f",
    colorBgElevated: "#161912",
    colorText: "#ece7dc",
    colorTextSecondary: "#a39e91",
    colorTextTertiary: "#8a857a",
    colorBorder: "rgba(236, 231, 220, 0.12)",
    colorBorderSecondary: "rgba(236, 231, 220, 0.08)",
    colorLink: "#ece7dc",
    colorLinkHover: "#d4a017",
    borderRadius: 2,
    fontFamily: "var(--font-sans), system-ui, sans-serif",
    fontSize: 16,
    controlHeight: 44,
  },
  components: {
    Button: {
      primaryShadow: "none",
      defaultShadow: "none",
      fontWeight: 600,
      defaultGhostBorderColor: "rgba(236, 231, 220, 0.35)",
      defaultGhostColor: "#ece7dc",
      ghostBg: "transparent",
    },
    Menu: {
      darkItemBg: "transparent",
      darkSubMenuItemBg: "transparent",
      itemBg: "transparent",
      darkItemSelectedBg: "transparent",
      darkItemHoverBg: "transparent",
      itemSelectedColor: "#d4a017",
      horizontalItemSelectedColor: "#d4a017",
      horizontalItemHoverColor: "#ece7dc",
    },
    Form: {
      labelColor: "#a39e91",
    },
    Input: {
      activeShadow: "0 0 0 1px #d4a017",
    },
    Typography: {
      titleMarginBottom: "0.35em",
      titleMarginTop: "0",
    },
  },
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={editorialTheme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
