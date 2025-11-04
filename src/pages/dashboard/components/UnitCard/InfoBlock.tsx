interface InfoBlockProps {
  label: string;
  children: React.ReactNode;
}

export function InfoBlock({ label, children }: InfoBlockProps) {
  return (
    <div className="flex flex-col">
      <span className="text-base font-bold">{label}:</span>
      <span className="text-muted-foreground">{children}</span>
    </div>
  );
}
