import { Outlet, useMatches } from "react-router-dom";

type CenteredLayoutHandle = {
  centeredLayout?: {
    imgSrc?: string;
    imgAlt?: string;
    formTitle?: string;
    formDescription?: string;
  };
};

export function CenteredLayout() {
  const matches = useMatches() as Array<{ handle?: CenteredLayoutHandle }>;
  const handle = [...matches]
    .reverse()
    .find((match) => match.handle?.centeredLayout)?.handle?.centeredLayout;

  const imgSrc = handle?.imgSrc;
  const imgAlt = handle?.imgAlt ?? "";
  const formTitle = handle?.formTitle;
  const formDescription = handle?.formDescription;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="hidden lg:block lg:w-1/2">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imgAlt}
            loading="lazy"
            className="h-125 w-125 object-contain"
          />
        ) : null}
      </div>
      <main className="w-full max-w-11/12 sm:max-w-lg">
        {formTitle && (
          <h1
            className={
              formDescription
                ? "mb-2 text-3xl font-bold text-orange-500"
                : "mb-12 text-3xl font-bold text-orange-500"
            }
          >
            {formTitle}
          </h1>
        )}
        {formDescription && (
          <p className="mb-12 max-w-md text-gray-600">{formDescription}</p>
        )}

        <Outlet />
      </main>
    </div>
  );
}
