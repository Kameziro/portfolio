"use client";

import { Flex, Typography } from "antd";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Projects({ copy }: Props) {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="mx-auto max-w-5xl border-t border-line px-6 py-24 md:px-10 md:py-28"
    >
      <Typography.Text className="!text-sm !uppercase !tracking-[0.2em] !text-accent">
        {copy.projects.title}
      </Typography.Text>
      <Typography.Title
        id="projetos-title"
        level={2}
        className="!mt-4 !mb-0 !font-[family-name:var(--font-display)] !text-3xl !tracking-tight !text-fg md:!text-4xl"
      >
        Trabalho em destaque
      </Typography.Title>
      <ul className="mt-12 list-none space-y-0 p-0">
        {copy.projects.items.map((project) => (
          <li
            key={project.name}
            className="group border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <Flex
              vertical
              gap={12}
              className="md:!flex-row md:!items-baseline md:!justify-between"
            >
              <Typography.Title
                level={3}
                className="!mb-0 !font-[family-name:var(--font-display)] !text-2xl !text-fg transition-colors group-hover:!text-accent md:!text-3xl"
              >
                {project.name}
              </Typography.Title>
              <Typography.Text className="!text-sm !uppercase !tracking-[0.14em] !text-fg-muted md:!text-right">
                {project.stack}
              </Typography.Text>
            </Flex>
            <Typography.Paragraph className="!mt-3 !mb-0 max-w-2xl !text-base !leading-relaxed !text-fg-muted md:!text-lg">
              {project.summary}
            </Typography.Paragraph>
          </li>
        ))}
      </ul>
    </section>
  );
}
