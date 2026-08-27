"use client";

import { Flex, Menu, Typography } from "antd";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function SiteHeader({ copy }: Props) {
  const items = [
    { key: "sobre", label: <a href="#sobre">{copy.nav.about}</a> },
    { key: "projetos", label: <a href="#projetos">{copy.nav.projects}</a> },
    { key: "experiencia", label: <a href="#experiencia">{copy.nav.experience}</a> },
    { key: "contato", label: <a href="#contato">{copy.nav.contact}</a> },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-bg/75 backdrop-blur-md">
      <Flex
        align="center"
        justify="space-between"
        gap="middle"
        className="mx-auto max-w-5xl px-6 py-3 md:px-10"
      >
        <Typography.Link
          href="#topo"
          className="!font-[family-name:var(--font-display)] !text-lg !tracking-tight !text-fg hover:!text-accent"
        >
          {copy.hero.name}
        </Typography.Link>
        <Menu
          mode="horizontal"
          theme="dark"
          selectable={false}
          items={items}
          className="hidden !min-w-0 !flex-1 !justify-end !border-none !bg-transparent sm:!flex"
          style={{ lineHeight: "40px" }}
        />
      </Flex>
    </header>
  );
}
