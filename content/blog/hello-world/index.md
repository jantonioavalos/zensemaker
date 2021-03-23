---
title: Hello World
date: "2021-03-23T09:00:00.000Z"
description: "This is my first post on this self-made platform. Read what to expect on this publication and some details about how it was done."
---

**TL;DR:** This blog was built from scratch, so I could control the technical constraints, the visual interactions and the content publication. It'll offer a daily post about productivity, creative strategy, and communication skills.

---

<br />

Today's writing platforms are great but attached to a generic free template. And that's fine to be focused in content. But as a Product designer and Software developer, embracing those constraints behind a paywall awakes my _maker's spirit_ to wireframe and code the things as I'd like.

For my blog, I wanted to write about my everyday work problems, ideas, solutions, resources and interesting people on the Product field. So I needed a place to publish very often, easy to manage, and own the reading experience. After using Medium, Substack, and several editing apps, I felt ready to build my own blogging platform.

> Zensemaker is a blog about productivity, creative strategy and communication skills.

## Owning constraints and tech debt

An important part of any product is considering the technical and experience debt. To reduce that, I build the platform using the JAMstack.

- **Gatsby** (ReactJS) for the front-end
- **GraphQL** for data management
- **DatoCMS** as the headless CMS
- **Markdown** as the input for my writting
- **Gatsby Cloud** to serve the CI/CD and hosting
- **Google Domains** to connect a subdomain to [jantonioavalos.com](https://jantonioavalos.com)
- **Github** to manage my code repository

So I'd write content in **Markdown**, pasting it at **DatoCMS**, to be deploy in **Gatsby Cloud** and refresh this Website. Besides when redesigning the UI or upgrading features, I'd use **ReactJS**, then push changes to **Github**, later deployed with **Gatsby Cloud** and served to the Website

## Managing side-project as a product

I build this blog as a product so I'm managing a backlog of user stories and tasks grouped by epics. I'm using Notion for the project management, document my code and placeholder for my upcomming design system.

About the content publication, within the same Notion Space I built a table to queue articles and keep working on them, editing, producing media and publishing.

## To come

I want to include some features to improve the reading and make of this space a place to come, share and discuss with the Product and UX communities. So, some features in the backlog are:

- SEO strategy
- Newsletters
- Dark mode
- Readable (typography) library
- Tags and Category pages
- Table of contents as navigational bar
- Comments
- Audio posts
- Analytics setup
- Twitter plugins
