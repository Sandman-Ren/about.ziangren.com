---
title: "Homelab Journey: Installing and Configuring the OS"
summary: "With hardware ready, it's time to install the operating system. I walk through my Ubuntu Server setup, initial configuration, and security hardening."
date: 2025-10-15
tags:
  - homelab
  - linux
  - ubuntu
  - self-hosting
keywords:
  - Ubuntu Server
  - homelab OS
  - server setup
  - SSH hardening
  - self-hosting
published: true
featured: false
aiAssisted: assisted
author: Ziang Ren
collection: homelab-journey
episode: 2
---

# Homelab Journey: Installing and Configuring the OS

With the hardware assembled and tested, the next step is getting an operating system installed and properly configured. I chose Ubuntu Server 24.04 LTS for its stability, community support, and long-term maintenance.

## Why Ubuntu Server?

I considered several options:

- **Proxmox VE** — great for full virtualization, but overkill when Docker handles everything I need
- **Debian** — rock solid but slower package updates
- **Ubuntu Server** — best of both worlds: stable LTS releases with reasonably current packages

Since I planned to run everything in Docker containers, a full hypervisor wasn't necessary. Ubuntu Server gives me a clean, minimal base to build on.

## Installation

The installation process is straightforward:

1. Download the Ubuntu Server 24.04 LTS ISO
2. Flash it to a USB drive using Balena Etcher
3. Boot from USB and follow the guided installer
4. Choose minimal installation — no snaps, no desktop environment

## Initial Configuration

### SSH Setup

First priority: secure SSH access so I can manage the server headlessly.

```bash
# Generate an SSH key pair on my workstation
ssh-keygen -t ed25519 -C "homelab"

# Copy the public key to the server
ssh-copy-id sandman@192.168.0.105
```

Then lock down SSH in `/etc/ssh/sshd_config`:

- Disable password authentication
- Disable root login
- Change the default port (security through obscurity, but it reduces noise)

### Firewall

Ubuntu comes with `ufw` — simple and effective:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
```

### Automatic Updates

For security patches, unattended upgrades are a must:

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

## Networking

I assigned a static IP via my router's DHCP reservation rather than configuring it on the server. This keeps the server's network config simple and the router as the single source of truth for IP assignments.

## What's Next

With a secure, minimal OS in place, the next episode covers setting up Docker and Docker Compose — the foundation for all the services we'll deploy.
