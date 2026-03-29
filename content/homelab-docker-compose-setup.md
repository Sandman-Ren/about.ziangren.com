---
title: "Homelab Journey: Docker Compose for Everything"
summary: "Docker Compose is the backbone of my homelab. Here's how I structure my deployments, manage configurations, and keep services running smoothly."
date: 2025-11-01
tags:
  - homelab
  - Docker
  - self-hosting
  - devops
keywords:
  - Docker Compose
  - homelab deployment
  - container management
  - self-hosting
  - Docker networking
published: true
featured: false
aiAssisted: assisted
author: Ziang Ren
collection: homelab-journey
episode: 3
---

# Homelab Journey: Docker Compose for Everything

Docker Compose is the glue that holds my homelab together. Every service — from the reverse proxy to monitoring dashboards — is defined in a `docker-compose.yaml` file. This makes deployments reproducible, portable, and easy to manage.

## Why Docker Compose?

Compared to running raw Docker commands or using Kubernetes:

- **Simple** — YAML files are easy to read and version control
- **Self-contained** — each service gets its own directory with its own compose file
- **Reproducible** — `docker compose up -d` and you're done
- **No orchestration overhead** — K8s is amazing but wildly overkill for a single-node homelab

## Directory Structure

I organize services under `~/deployments/`:

```
~/deployments/
├── traefik/
│   └── docker-compose.yaml
├── portainer/
│   └── docker-compose.yaml
├── vault/
│   └── docker-compose.yaml
├── stirling-pdf/
│   └── docker-compose.yaml
└── uptime-kuma/
    └── docker-compose.yaml
```

Each service is independent. I can start, stop, or update any service without affecting the others.

## Networking

All services share a Docker network called `proxy` so Traefik can route traffic to them:

```bash
docker network create proxy
```

In each compose file, services join this external network:

```yaml
networks:
  proxy:
    external: true
```

## Common Patterns

### Health Checks

Every service gets a health check so Docker knows when it's actually ready:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Restart Policies

Always set `restart: unless-stopped` for services that should survive reboots.

### Volume Mounts

I prefer named volumes for data persistence and bind mounts only for configuration files that I want to edit directly.

## Managing Updates

My update workflow is simple:

1. `docker compose pull` — fetch the latest images
2. `docker compose up -d` — recreate containers with new images
3. `docker image prune -f` — clean up old images

## Lessons Learned

- **Pin image versions** in production-like setups. Using `latest` is fine for experimenting but risky for services you depend on.
- **Back up volumes** before major updates. A quick `docker run --rm -v data:/data -v $(pwd):/backup busybox tar czf /backup/data.tar.gz /data` saves headaches.
- **Use `.env` files** for secrets instead of hardcoding them in compose files.

## What's Next

With Docker Compose handling deployments, the homelab is fully operational. Future episodes will cover specific services like Traefik for reverse proxying, Vault for secrets management, and monitoring with Uptime Kuma.
