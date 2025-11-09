export const getInitials = (name: string) => {
  const names = name.split(" ").slice(0, 2);
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
  return initials;
};
