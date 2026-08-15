# 🐳 Dockerized Microservice Starter

[![Build Status](https://github.com/msyahirmahmud/dockerized-microservice-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/msyahirmahmud/dockerized-microservice-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker Image](https://img.shields.io/badge/Docker-Multi--stage-blue.svg)](https://www.docker.com/)
[![Tests Passing](https://img.shields.io/badge/Tests-100%25-brightgreen.svg)]()

> Production-ready Microservice Boilerplate featuring multi-stage Alpine Docker builds, HTTP HealthCheck endpoints, and automated CI container validation.

---

## 🌟 Features

- **🐳 Multi-Stage Alpine Build**: Minimal final container image size (~50MB).
- **🩺 Native HealthCheck**: Built-in container health monitor (`/health`).
- **🛡️ Non-Root Security**: Enforces unprivileged `node` user execution inside container.

---

## 🚀 Quick Start

### 1. Build & Run Container
```bash
docker build -t microservice-starter .
docker run -p 8080:8080 microservice-starter
```

### 2. Run Test Suite
```bash
npm test
```

---

## 📄 License

[MIT License](LICENSE)
