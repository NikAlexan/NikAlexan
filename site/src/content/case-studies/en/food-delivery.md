---
tag: "PET_01 / Team project"
title: "Food Delivery Service"
description: "Case study by Nikita Vassilenko: how a payment event overtook order creation in Go microservices on NATS JetStream, and how I fixed it."
subtitle: "Event race"
version: "May 2026"
roleLabel: "My role"
role: "User Service, Nuxt frontend, Kubernetes deployment, fixing event consumers in the Delivery Service"
timelineLabel: "Timeline"
timeline: "May 2026, university trimester"
deliverablesLabel: "Delivered"
deliverables: "4 microservices, 34 gRPC endpoints, a DigitalOcean cluster"
challengeLabel: "Problem"
challengeTitle: "The payment event arrived before the order existed"
challengeBody: "The Order Service publishes order.created and order.paid to NATS JetStream. The Delivery Service creates a delivery on the first and assigns a driver on the second. Once it ran in two pods, order.paid was sometimes handled before order.created. The handler found no delivery, treated the message as invalid and dropped it for good. The order stayed paid, and no driver ever got it."
challengeMetrics:
  - value: "34"
    label: "gRPC endpoints"
  - value: "8"
    label: "User Service methods"
  - value: "2–6"
    label: "API Gateway pods (HPA)"
stackLabel: "Stack"
stackTitle: "Go microservices and infrastructure as code"
stackBody: "Services talk over gRPC, async events go through NATS JetStream. Each service follows Clean Architecture and owns its PostgreSQL database. A two-node DOKS cluster is provisioned with Terraform, and a Locust scenario covers load testing."
stack:
  - "Go"
  - "gRPC"
  - "NATS JetStream"
  - "PostgreSQL"
  - "Redis"
  - "Nuxt"
  - "Kubernetes"
  - "Terraform"
outcomeLabel: "Decisions"
outcomes:
  - title: "A queue group instead of an exclusive subscription"
    text: "Switched js.Subscribe to QueueSubscribe with the delivery-workers group, so several pods share one event stream."
  - title: "Permanent and transient errors handled apart"
    text: "An invalid message is dropped with Term(). \"Delivery not found\" is now transient: Nak() puts the message back, and it returns once order.created has been processed."
  - title: "Retry cap and async email"
    text: "MaxDeliver(10) stops a message from looping forever. Customer emails moved to a goroutine, so SMTP no longer blocks the event handler."
console:
  filename: "delivery-service/internal/nats/client.go"
  languageTag: "go"
  code: |
    // Term = don't redeliver; Nak = retry.
    // ErrNotFound is retried: order.paid can arrive
    // before order.created is processed.
    if errors.Is(err, usecase.ErrInvalidDelivery) {
        _ = msg.Term()
    } else {
        _ = msg.Nak()
    }
  statusLabel: "commit 02acc4f"
  statusState: "success"
outcome:
  metric: "5 commits"
  title: "What I would do differently"
  body: "Event order is not guaranteed once there is more than one consumer. I only found the race once the service ran in two pods. Next time I would make handlers idempotent and model order states explicitly from the start."
  ctaLabel: "Code on GitHub"
  ctaHref: "https://github.com/NikAlexan/Food-Delivery-project-Go"
---
