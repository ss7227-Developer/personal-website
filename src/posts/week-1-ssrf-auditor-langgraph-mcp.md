---
slug: week-1-ssrf-auditor-langgraph-mcp
title: "Week 1: Building an SSRF Auditor with LangGraph and MCP"
date: 2025-05-01
excerpt: "What I learned building an agentic security tool that actually finds SSRF vulnerabilities — and the messy parts nobody talks about."
---

When I set out to build an SSRF auditor using LangGraph and the Model Context Protocol, I thought the hard part would be getting the LLM to reason correctly about HTTP redirect chains.

I was wrong. The hard part was everything else.

## The Setup

The tool works like this: you give it a target URL, it spins up a LangGraph agent with three tools — a URL fetcher, a redirect follower, and a payload generator. The agent decides what to try, observes the response, and iterates. MCP handles the tool schema so the LLM gets clean, typed inputs.

Simple enough on paper.

## What Actually Happened

The first version worked perfectly in testing. It found every SSRF I planted. I felt good about it.

Then I pointed it at a real application.

The agent got stuck in a loop. It kept generating payloads for the same endpoint, convinced (correctly) that something was off but unable to find the right payload to confirm it. After 47 iterations it hit the token limit and gave up.

The bug was in how I designed the tool outputs. The redirect follower returned raw HTTP responses — all 8,000 characters of them. The agent was reading the full response on every turn, burning context. By iteration 20, it had forgotten what it already tried.

## The Fix

I added two things:

1. A response summarizer tool that strips the response to the parts the agent actually needs: status code, final URL after redirects, and whether any internal hostnames appeared in headers or body.

2. A memory tool that writes each tried payload and its outcome to a structured log. The agent reads this at the start of each turn instead of re-reading raw responses.

After these changes: 6 iterations, found the vulnerability.

## What This Taught Me

Agentic tools fail in boring ways. Not because the LLM is bad at reasoning — it was fine. They fail because the information architecture is wrong. Too much noise, not enough signal. The agent can't do good work if every tool call buries it in unstructured data.

The fix isn't a better model. It's better tool design.

This is the thing nobody writes about: the work in agentic AI is mostly data plumbing. Deciding what each tool returns, what gets summarized, what gets remembered. The LLM is the easy part.

More next week.
