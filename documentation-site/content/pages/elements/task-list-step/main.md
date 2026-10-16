---
layout: layouts/element-page.njk
title: Task List Step
permalink: /elements/task-list/task-list-step/
description: A single step within a Task List. Each Task List Step is rendered as a list item with a title, a status badge, and optional supporting content.
storybook_url: TKTKTK
background_research_url: TKTKTK
---

## Example

<div class="element-example">
    <ogds-task-list-step status="in-progress" url="/some-task">
        <span slot="title">Tell us about your employer</span>
        <span slot="description">We need a few details to verify your business registration.</span>
    </ogds-task-list-step>
</div>

### Example Code

```html
<ogds-task-list-step status="in-progress" url="/some-task">
    <span slot="title">Tell us about your employer</span>
    <span slot="description">
        We need a few details to verify your business registration.
    </span>
</ogds-task-list-step>
```

For more code examples, see Storybook (link at the top of this page).

## Guidance

`<ogds-task-list-step>` elements are meant to be used as children of an [`<ogds-task-list>`](?path=/docs/components-task-list--docs), which counts completed steps and renders them in an accessible list. The stories on this page render steps outside of that context to preview each variation in isolation.
