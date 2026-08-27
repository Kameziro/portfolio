"use client";

import { LinkedinOutlined, MailOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

type ContactFormValues = {
  name?: string;
  email?: string;
  message?: string;
};

export function Contact({ copy }: Props) {
  const [form] = Form.useForm<ContactFormValues>();

  function onFinish(_values: ContactFormValues) {
    // UI-only in v1 — no real delivery (T1/T3)
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="mx-auto max-w-5xl border-t border-line px-6 py-24 md:px-10 md:py-28"
    >
      <Typography.Text className="!text-sm !uppercase !tracking-[0.2em] !text-accent">
        {copy.contact.title}
      </Typography.Text>
      <Typography.Title
        id="contato-title"
        level={2}
        className="!mt-4 !mb-0 max-w-xl !font-[family-name:var(--font-display)] !text-3xl !tracking-tight !text-fg md:!text-4xl"
      >
        {copy.contact.lead}
      </Typography.Title>

      <Space wrap size="middle" className="!mt-8">
        <Button
          type="link"
          icon={<MailOutlined />}
          href={`mailto:${copy.contact.email}`}
          className="!px-0"
        >
          {copy.contact.email}
        </Button>
        <Button
          type="link"
          icon={<LinkedinOutlined />}
          href={copy.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="!px-0"
        >
          {copy.contact.linkedinLabel}
        </Button>
        <Button
          type="link"
          icon={<FilePdfOutlined />}
          href={copy.contact.pdfHref}
          download
          className="!px-0"
        >
          {copy.contact.pdfLabel}
        </Button>
      </Space>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="!mt-12 max-w-xl"
      >
        <Typography.Paragraph type="secondary" className="!mb-6">
          {copy.contact.form.note}
        </Typography.Paragraph>
        <Form.Item name="name" label={copy.contact.form.name}>
          <Input size="large" autoComplete="name" />
        </Form.Item>
        <Form.Item name="email" label={copy.contact.form.email}>
          <Input size="large" type="email" autoComplete="email" />
        </Form.Item>
        <Form.Item name="message" label={copy.contact.form.message}>
          <Input.TextArea rows={4} size="large" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" size="large" ghost>
            {copy.contact.form.submit}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
