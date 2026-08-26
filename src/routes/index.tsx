import { createFileRoute, redirect } from "@tanstack/react-router";

// The guide is a standalone HTML/CSS/JS site served from /site/.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jetson Xavier NX Remote Access — x11vnc + Tailscale Guide" },
      {
        name: "description",
        content:
          "Copy-paste guide to remotely access a Jetson Xavier NX terminal and Ubuntu desktop over Tailscale with x11vnc. Windows, macOS and Ubuntu steps plus troubleshooting.",
      },
      { property: "og:title", content: "Jetson Xavier NX Remote Access — x11vnc + Tailscale" },
      {
        property: "og:description",
        content: "SSH + full Ubuntu desktop from any network, free and open source. By Om Rashiya.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/site/index.html" });
  },
  component: () => null,
});
