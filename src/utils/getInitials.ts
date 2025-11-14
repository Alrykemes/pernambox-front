export const getInitials = (name: string | undefined) => {
  if(name) {
    const names = name.split(" ").slice(0, 2);
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
    return initials;
  } else {
    return "fp";
  }
};
