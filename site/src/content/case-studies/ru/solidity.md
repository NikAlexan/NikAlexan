---
tag: "PET_03 / Курс по блокчейну"
title: "Смарт-контракты на Solidity"
subtitle: "От голосования до AMM"
version: "2026"
roleLabel: "Моя роль"
role: "Контракты, тесты и деплой-скрипты во всех трёх заданиях"
timelineLabel: "Сроки"
timeline: "Весна и лето 2026, университетский курс"
deliverablesLabel: "Результат"
deliverables: "3 репозитория на Foundry, CI с Slither в DeFi-задании"
challengeLabel: "Задача"
challengeTitle: "Деньги в контракте не прощают ошибок"
challengeBody: "Задеплоенный контракт нельзя поправить, а ошибка в расчёте сразу превращается в потерю токенов. Поэтому в каждом задании курса, от голосования до пула ликвидности, главной частью работы были тесты: unit, fuzz, инварианты и тесты на форке основной сети Ethereum."
challengeMetrics:
  - value: "55"
    label: "тестов в DeFi-задании"
  - value: "9"
    label: "сценариев голосования"
  - value: "0.3%"
    label: "комиссия AMM"
stackLabel: "Стек"
stackTitle: "Foundry и OpenZeppelin"
stackBody: "Голосование: админ добавляет кандидатов и управляет этапами, каждый адрес голосует один раз. Токены: ERC-20 для наград и ERC-721 для бейджей, магазин обменивает одно на другое через роли AccessControl. DeFi: AMM по формуле x·y=k, LP-токен и симуляция кредитного пула."
stack:
  - "Solidity"
  - "Foundry"
  - "OpenZeppelin"
  - "Slither"
outcomeLabel: "Решения"
outcomes:
  - title: "Тесты на форке с фиксированным блоком"
    text: "Форк-тесты закрепляют состояние сети через vm.createSelectFork(rpc, blockNumber), поэтому дают одинаковый результат при каждом запуске."
  - title: "Checks-effects-interactions"
    text: "RewardShop проверяет баланс и allowance до вызовов transferFrom и mint. Авторизация везде идёт через msg.sender и роли, tx.origin не используется."
  - title: "immutable вместо storage"
    text: "Адреса токенов в магазине объявлены immutable: значение попадает в байткод, и claimBadge не тратит газ на чтение из storage."
console:
  filename: "src/AMM.sol"
  languageTag: "solidity"
  code: |
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut)
        public pure returns (uint256)
    {
        uint256 amountInWithFee = amountIn * FEE_NUMERATOR; // 997
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = reserveIn * FEE_DENOMINATOR + amountInWithFee;
        return numerator / denominator;
    }
  statusLabel: "forge test"
  statusState: "success"
outcome:
  metric: "3 задания"
  title: "Итог"
  body: "Каждое задание доведено до тестов, деплой-скрипта и отчёта. В DeFi-задании CI на GitHub Actions собирает контракты, гоняет тесты, строит отчёт по газу и запускает статический анализ Slither."
  ctaLabel: "Код DeFi-задания"
  ctaHref: "https://github.com/NikAlexan/blockchain-foundry-assignment2"
---
