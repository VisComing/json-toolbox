import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSON 工具箱 - 在线 JSON 格式化、验证、压缩工具",
  description: "免费在线 JSON 工具箱，支持 JSON 格式化、验证、压缩、转义、树形视图、对比等功能。无需安装，即开即用。",
  keywords: ["JSON", "JSON格式化", "JSON验证", "JSON压缩", "JSON转义", "JSON工具"],
  authors: [{ name: "JSON Toolbox" }],
  openGraph: {
    title: "JSON 工具箱 - 在线 JSON 处理工具",
    description: "免费、快速、安全的 JSON 在线工具箱",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
