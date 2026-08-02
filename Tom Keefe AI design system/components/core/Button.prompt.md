Action button; use `primary` for the single most important action on a view, `secondary` for the rest, `ghost` for inline text actions.

```jsx
<Button variant="primary">View projects</Button>
<Button variant="secondary" href="mailto:x">Email</Button>
<Button variant="ghost" icon={<ArrowRight size={16} />}>LinkedIn</Button>
```

Variants: primary (accent fill), secondary (outlined), ghost (accent text), icon (36×36). `block` makes it full-width with the label still flush left — never center labels.
