---
tag: "PET_03 / Blockchain course"
title: "Solidity Smart Contracts"
subtitle: "From voting to an AMM"
version: "2026"
roleLabel: "My role"
role: "Contracts, tests and deploy scripts in all three assignments"
timelineLabel: "Timeline"
timeline: "Spring and summer 2026, university course"
deliverablesLabel: "Delivered"
deliverables: "3 Foundry repositories, CI with Slither in the DeFi assignment"
challengeLabel: "Problem"
challengeTitle: "Money in a contract leaves no room for bugs"
challengeBody: "A deployed contract cannot be patched, and a calculation bug turns straight into lost tokens. So in every assignment, from voting to a liquidity pool, tests were the main part of the work: unit, fuzz, invariant and tests on an Ethereum mainnet fork."
challengeMetrics:
  - value: "55"
    label: "tests in the DeFi assignment"
  - value: "9"
    label: "voting scenarios"
  - value: "0.3%"
    label: "AMM fee"
stackLabel: "Stack"
stackTitle: "Foundry and OpenZeppelin"
stackBody: "Voting: an admin adds candidates and controls the phases, and each address votes once. Tokens: ERC-20 for rewards and ERC-721 for badges, with a shop that swaps one for the other through AccessControl roles. DeFi: an x·y=k AMM, an LP token and a lending pool simulation."
stack:
  - "Solidity"
  - "Foundry"
  - "OpenZeppelin"
  - "Slither"
outcomeLabel: "Decisions"
outcomes:
  - title: "Fork tests pinned to a block"
    text: "Fork tests fix chain state with vm.createSelectFork(rpc, blockNumber), so every run gives the same result."
  - title: "Checks-effects-interactions"
    text: "RewardShop checks balance and allowance before calling transferFrom and mint. Authorization goes through msg.sender and roles everywhere; tx.origin is never used."
  - title: "immutable instead of storage"
    text: "Token addresses in the shop are immutable: the value is inlined into bytecode, so claimBadge spends no gas reading storage."
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
  metric: "3 assignments"
  title: "Result"
  body: "Each assignment ships with tests, a deploy script and a report. In the DeFi assignment, GitHub Actions CI builds the contracts, runs the tests, produces a gas report and runs Slither static analysis."
  ctaLabel: "DeFi assignment code"
  ctaHref: "https://github.com/NikAlexan/blockchain-foundry-assignment2"
---
