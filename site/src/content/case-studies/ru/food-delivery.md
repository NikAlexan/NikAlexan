---
tag: "PET_01 / Командный проект"
title: "Сервис доставки еды"
subtitle: "Гонка событий"
version: "май 2026"
roleLabel: "Моя роль"
role: "User Service, фронтенд на Nuxt, деплой в Kubernetes, исправление потребителей событий в Delivery Service"
timelineLabel: "Сроки"
timeline: "Май 2026, учебный триместр"
deliverablesLabel: "Результат"
deliverables: "4 микросервиса, 34 gRPC-эндпоинта, кластер в DigitalOcean"
challengeLabel: "Задача"
challengeTitle: "Событие об оплате приходило раньше, чем заказ успевал создаться"
challengeBody: "Order Service публикует order.created и order.paid в NATS JetStream, а Delivery Service создаёт доставку по первому и назначает курьера по второму. Когда сервис запустили в двух подах, order.paid иногда обрабатывался раньше order.created. Обработчик не находил доставку, помечал сообщение как ошибочное и отбрасывал его навсегда. Заказ оставался оплаченным, но курьер его не получал."
challengeMetrics:
  - value: "34"
    label: "gRPC-эндпоинта"
  - value: "8"
    label: "методов в User Service"
  - value: "2–6"
    label: "подов API Gateway (HPA)"
stackLabel: "Стек"
stackTitle: "Go-микросервисы и инфраструктура как код"
stackBody: "Сервисы общаются по gRPC, асинхронные события идут через NATS JetStream. Каждый сервис по Clean Architecture со своей PostgreSQL. Кластер DOKS из двух узлов поднимается через Terraform, для нагрузочного теста есть сценарий на Locust."
stack:
  - "Go"
  - "gRPC"
  - "NATS JetStream"
  - "PostgreSQL"
  - "Redis"
  - "Nuxt"
  - "Kubernetes"
  - "Terraform"
outcomeLabel: "Решения"
outcomes:
  - title: "Очередь потребителей вместо эксклюзивной подписки"
    text: "Перевёл js.Subscribe на QueueSubscribe с группой delivery-workers, чтобы несколько подов делили один поток событий."
  - title: "Разделение постоянных и временных ошибок"
    text: "Невалидное сообщение отбрасывается через Term(). «Доставка не найдена» теперь временная ошибка: Nak() возвращает сообщение в очередь, и оно приходит снова, когда order.created уже обработан."
  - title: "Лимит повторов и асинхронная почта"
    text: "MaxDeliver(10) не даёт сообщению крутиться бесконечно. Письма клиенту ушли в отдельную горутину, чтобы SMTP не держал обработчик событий."
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
  metric: "5 коммитов"
  title: "Что бы сделал иначе"
  body: "Порядок событий нельзя считать гарантированным, как только потребителей больше одного. Гонку я нашёл, только когда сервис запустили в двух подах. Сейчас я бы с самого начала сделал обработчики идемпотентными и описал состояния заказа явно."
  ctaLabel: "Код на GitHub"
  ctaHref: "https://github.com/NikAlexan/Food-Delivery-project-Go"
---
