---
title: "Homelab Journey: Choosing the Right Hardware"
summary: "The first step in building a homelab is picking the right hardware. Here's how I chose my server components and what I'd do differently."
date: 2025-10-01
tags:
  - homelab
  - hardware
  - self-hosting
keywords:
  - homelab hardware
  - server build
  - self-hosting
  - mini PC
  - home server
published: true
featured: false
aiAssisted: true
author: Ziang Ren
collection: homelab-journey
episode: 1
---

# Homelab Journey: Choosing the Right Hardware

Building a homelab starts with a fundamental question: what hardware should you use? After weeks of research and comparison, I settled on a setup that balances performance, power consumption, and noise levels.

## Requirements

Before looking at specific hardware, I defined what I needed:

- **Low power consumption** — this will run 24/7, so electricity costs matter
- **Quiet operation** — it lives in my apartment, not a data center
- **Enough RAM** — Docker containers add up fast
- **Expandable storage** — room to grow as I add services

## Options I Considered

### Option 1: Repurposed Desktop

The cheapest path is an old desktop PC. Pros: readily available, easy to upgrade. Cons: power hungry, noisy fans, large footprint.

### Option 2: Mini PC (Winner)

Mini PCs like the Intel NUC or Beelink models hit the sweet spot. Modern CPUs with low TDP, passive or near-silent cooling, and small form factor.

### Option 3: Rack Server

Tempting for the "real homelab" feel, but way overkill for my needs. The noise alone ruled it out for an apartment setup.

## What I Chose

I went with a mini PC featuring:

- **CPU**: 16 cores for comfortable container hosting
- **RAM**: 32GB DDR5 — more than enough headroom
- **Storage**: 1TB NVMe SSD for the OS and containers
- **Network**: Gigabit Ethernet with wake-on-LAN support

## Lessons Learned

1. **Don't overbuy** — start small and scale up. You can always add an external drive or more RAM later.
2. **Check power draw** — a 15W idle draw vs 65W makes a real difference over a year.
3. **Consider noise** — read reviews specifically about fan noise under load.

## What's Next

With hardware in hand, the next step is installing the operating system and setting up the virtualization layer. That's covered in the next episode of this series.
