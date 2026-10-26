type Props = { command: string; title: string }

// Renders a section title as a shell prompt, e.g. "~/portfolio $ cat about.md"
export function SectionHeading({ command, title }: Props) {
  return (
    <div className="mb-10">
      <p className="text-xs text-fg-muted">
        <span className="text-accent">~/portfolio</span> $ {command}
      </p>
      <h2 className="mt-1 text-2xl font-bold text-fg">
        <span className="mr-2 text-accent">##</span>
        {title}
      </h2>
    </div>
  )
}
