"use client";

import { Space, Typography } from "antd";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function About({ copy }: Props) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="mx-auto max-w-5xl border-t border-line px-6 py-24 md:px-10 md:py-28"
    >
      <Typography.Text className="!text-sm !uppercase !tracking-[0.2em] !text-accent">
        {copy.about.title}
      </Typography.Text>
      <Typography.Title
        id="sobre-title"
        level={2}
        className="!mt-4 !mb-0 !font-[family-name:var(--font-display)] !text-3xl !tracking-tight !text-fg md:!text-4xl"
      >
        {copy.about.fullName}
      </Typography.Title>
      <Space direction="vertical" size="middle" className="!mt-8 max-w-2xl">
        {copy.about.body.map((paragraph) => (
          <Typography.Paragraph
            key={paragraph.slice(0, 24)}
            className="!mb-0 !text-base !leading-relaxed !text-fg-muted md:!text-lg"
          >
            {paragraph}
          </Typography.Paragraph>
        ))}
      </Space>
    </section>
  );
}
