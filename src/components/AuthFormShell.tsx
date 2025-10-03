export function AuthFormShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="w-full max-w-11/12 sm:max-w-sm md:max-w-md">
      {title && description ? (
        <h1 className="mb-2 text-3xl font-bold text-orange-500">{title}</h1>
      ) : (
        <h1 className="mb-12 text-3xl font-bold text-orange-500">{title}</h1>
      )}
      {description && (
        <p className="mb-12 max-w-md text-gray-600">{description}</p>
      )}
      <div>{children}</div>
    </div>
  );
}
