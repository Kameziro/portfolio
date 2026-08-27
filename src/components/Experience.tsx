"use client";

import { Flex, Typography } from "antd";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Experience({ copy }: Props) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="mx-auto max-w-5xl border-t border-line px-6 py-24 md:px-10 md:py-28"
    >
      <Typography.Text className="!text-sm !uppercase !tracking-[0.2em] !text-accent">
        {copy.experience.title}
      </Typography.Text>
      <Typography.Title
        id="experiencia-title"
        level={2}
        className="!mt-4 !mb-0 !font-[family-name:var(--font-display)] !text-3xl !tracking-tight !text-fg md:!text-4xl"
      >
        Trajetória
      </Typography.Title>

      <ol className="mt-12 list-none space-y-10 p-0">
        {copy.experience.roles.map((role) => (
          <li key={`${role.title}-${role.period}`} className="max-w-2xl">
            <Flex
              vertical
              gap={4}
              className="sm:!flex-row sm:!items-baseline sm:!justify-between"
            >
              <Typography.Title level={3} className="!mb-0 !text-lg !font-semibold !text-fg md:!text-xl">
                {role.title}
              </Typography.Title>
              <Typography.Text className="!shrink-0 !text-sm !text-fg-muted">
                {role.period}
              </Typography.Text>
            </Flex>
            <Typography.Text className="!text-sm !text-accent">{role.org}</Typography.Text>
            <Typography.Paragraph className="!mt-3 !mb-0 !text-base !leading-relaxed !text-fg-muted">
              {role.summary}
            </Typography.Paragraph>
          </li>
        ))}
      </ol>

      <div className="mt-16 max-w-2xl border-t border-line pt-10">
        <Typography.Text className="!text-sm !uppercase !tracking-[0.2em] !text-fg-muted">
          {copy.experience.education.title}
        </Typography.Text>
        <ul className="mt-6 list-none space-y-5 p-0">
          {copy.experience.education.items.map((item) => (
            <li key={item.title}>
              <Flex
                vertical
                gap={4}
                className="sm:!flex-row sm:!items-baseline sm:!justify-between"
              >
                <Typography.Text className="!font-medium !text-fg">{item.title}</Typography.Text>
                <Typography.Text className="!shrink-0 !text-sm !text-fg-muted">
                  {item.period}
                </Typography.Text>
              </Flex>
              <Typography.Text className="!text-sm !text-fg-muted">{item.org}</Typography.Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
