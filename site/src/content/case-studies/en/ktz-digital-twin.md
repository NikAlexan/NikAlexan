---
tag: "PET_02 / HackNU · KTZ challenge"
title: "Locomotive Digital Twin"
subtitle: "Fleet telemetry"
version: "April 2026"
roleLabel: "My role"
role: "Team of two. I built the onboard simulator, wear model, dispatch server and dashboard; my teammate built the LocoPanel onboard UI"
timelineLabel: "Timeline"
timeline: "April 2026, HackNU hackathon"
deliverablesLabel: "Delivered"
deliverables: "3 Dockerized services, 4 simulated locomotives, a fleet dashboard"
challengeLabel: "Problem"
challengeTitle: "Spot component wear before a breakdown"
challengeBody: "Kazakhstan Railways (KTZ) asked for a digital twin of the KZ8A electric and TE33A diesel locomotives. The twin had to take in telemetry continuously, estimate accumulated wear per component, and warn the dispatcher early about overheating, catenary voltage drops or a turbocharger failure."
challengeMetrics:
  - value: "4"
    label: "simulated locomotives"
  - value: "2"
    label: "series: KZ8A and TE33A"
  - value: "60 s"
    label: "aggregation interval"
stackLabel: "Stack"
stackTitle: "Onboard unit, broker and dispatch"
stackBody: "Each locomotive runs in its own container: a FastAPI service simulates sensors, scores risk per component and publishes packets to MQTT. The dispatch server subscribes to an EMQX broker, aggregates data into PostgreSQL once a minute, and serves REST and WebSocket to the dashboard."
stack:
  - "Python"
  - "FastAPI"
  - "MQTT (EMQX)"
  - "WebSocket"
  - "PostgreSQL"
  - "Docker"
outcomeLabel: "Decisions"
outcomes:
  - title: "MQTT between locomotive and dispatch"
    text: "A locomotive publishes to loco/{id}/telemetry and does not know who reads it. A new consumer connects to the broker with no change on board."
  - title: "Component thresholds in config"
    text: "Thresholds and risk type for each component live in YAML: rising above normal, falling below it, or leaving a band. An exponent shapes the curve, so small deviations barely count toward wear."
  - title: "Aggregates instead of the raw stream"
    text: "The dashboard gets a live WebSocket stream, while the database stores one aggregate every 60 seconds. History stays compact."
console:
  filename: "LocoAppBack/app/telemetry/risk.py"
  languageTag: "python"
  code: |
    if risk_type == "linear_hi":
        warn: float = comp_cfg["warn"]
        crit: float = comp_cfg["crit"]
        if value <= warn:
            return 0.0
        if value >= crit:
            return 1.0
        return _curve((value - warn) / (crit - warn), exponent)
  statusLabel: "risk ∈ [0.0, 1.0]"
  statusState: "info"
outcome:
  metric: "Lesson"
  title: "What I would do differently"
  body: "I never found the locomotives' technical documentation, although it was publicly available, so I set the thresholds without it. Competing teams went deeper into how the locomotives work and had stronger visuals. Next time I will start with the domain documentation and only then write code."
  ctaLabel: "Code on GitHub"
  ctaHref: "https://github.com/NikAlexan/-HackNU-KTZ"
---
