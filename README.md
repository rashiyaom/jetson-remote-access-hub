# Jetson Remote Access Hub

A practical field guide for reaching an NVIDIA Jetson Xavier NX over a private Tailscale network. It covers SSH for terminal access and x11vnc for sharing the existing Ubuntu desktop, with client instructions for macOS, Windows and Ubuntu.

![Jetson remote-access field guide](screenshots/jetson-guide-home.png)

## Why this setup

The guide adds remote access on top of an existing Jetson installation. It avoids public port forwarding and keeps VNC bound to the private tailnet interface. SSH is the default for routine development; VNC is available when a graphical session is needed.

The reference hardware is a Jetson Xavier NX 8GB running Ubuntu 20.04 on ARM64. The machine is used for robotics work with Docker, ROS 2 Humble and NVIDIA's JetPack stack. The steps avoid broad system upgrades and unnecessary packages because the reference eMMC has limited free space.

## What the guide covers

1. Inspect the running OS, kernel, disk space, SSH service, Tailscale and desktop session.
2. Install and authenticate Tailscale on the Jetson and client.
3. Connect over the tailnet with SSH.
4. Find the active X11 session and its display credentials.
5. Install x11vnc with a narrow package install.
6. Bind VNC to the Jetson's Tailscale address and protect it with a VNC password.
7. Run x11vnc as a systemd service after the network is ready.
8. Connect from macOS, Windows or Ubuntu.
9. Verify the VNC listener is not exposed on all network interfaces.
10. Troubleshoot network, SSH, X11, service and display issues.
11. Check the final reboot and reconnect flow.

The commands use example addresses and usernames. Replace them with values from your own Jetson and tailnet before running anything.

## Security and compatibility

- Do not forward ports 22 or 5900 from a router.
- Keep x11vnc bound to the Jetson's Tailscale interface.
- Set a strong VNC password and restrict tailnet access to trusted devices.
- Confirm the active desktop is X11; this guide attaches to an existing Xorg session.
- Do not reflash JetPack or replace CUDA, cuDNN, Docker or ROS packages as part of remote-access setup.
- Review every command for your JetPack and Ubuntu release before applying it.

The reference setup includes device-specific details in the interactive guide; replace those with your own session ID, username and tailnet IP.

## Read the interactive guide

Open [the complete step-by-step guide](public/site/index.html). It includes copy-ready commands, expected output, platform-specific VNC clients and troubleshooting notes.

## Author

Written by [Om Rashiya](https://github.com/rashiyaom).
