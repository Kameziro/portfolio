"use client";

import { Button, Flex, Typography } from "antd";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Hero({ copy }: Props) {
  return (
    <section
      id="topo"
      aria-label="Hero"
      className="mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-end px-6 pb-24 pt-28 md:px-10 md:pb-32"
    >
      <Typography.Text className="rise !text-sm !uppercase !tracking-[0.22em] !text-accent">
        Portfólio
      </Typography.Text>
      <Typography.Title
        level={1}
        className="rise rise-delay-1 !mt-5 !mb-0 max-w-3xl !font-[family-name:var(--font-display)] !text-5xl !leading-[0.95] !tracking-tight !text-fg sm:!text-6xl md:!text-7xl lg:!text-8xl"
      >
        {copy.hero.name}
      </Typography.Title>
      <Typography.Paragraph className="rise rise-delay-2 !mt-6 !mb-0 max-w-xl !text-lg !text-fg-muted md:!text-xl">
        {copy.hero.role}
      </Typography.Paragraph>
      <Typography.Paragraph className="rise rise-delay-3 !mt-4 !mb-0 max-w-2xl !text-base !leading-relaxed !text-fg/90 md:!text-lg">
        {copy.hero.lead}
      </Typography.Paragraph>
      <Flex className="rise rise-delay-3 !mt-10" gap="middle" wrap>
        <Button type="primary" size="large" href="#projetos">
          Ver projetos
        </Button>
        <Button size="large" href="#contato" ghost>
          Contato
        </Button>
      </Flex>
    </section>
  );
}
