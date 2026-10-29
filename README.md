\# Festa – AI Celebration \& Event Planner



GenAI planning assistant for weddings, birthdays and community events (Challenge 5).



\*\*Live app:\*\* add your Vercel URL here

\*\*Demo video:\*\* add your link here



\## Features

\- Event setup: type, date, city, guests, budget (INR), style, free-text preferences

\- Budget planner: AI category split with amounts, per-guest cost and saving tips

\- Timeline: week-by-week task schedule scaled to the days left, with checkboxes

\- Vendor checklist: status tracking (To contact, Quote received, Booked, Paid)

\- Personalised ideas: themes, menu and activities

\- Progress saved in the browser, print or save as PDF, offline template fallback



\## Gen AI usage

Google Gemini API (gemini-2.5-flash) is called from api/plan.js. One structured prompt returns JSON for the budget, timeline, vendors and ideas, tailored to the user's inputs. The API key stays server-side.



\## Tech stack

Vanilla HTML/CSS/JS frontend, Vercel serverless function (Node), Gemini API.



\## Run / deploy

1\. Get a free key at https://aistudio.google.com/apikey

2\. Push this repo to GitHub, then import it at vercel.com

3\. Add env var GEMINI\_API\_KEY in Project Settings, then redeploy

