import logo from "@/assets/images/logo.png";

export function Header() {
  return (
    <header className="fixed top-0 left-0 h-16">
      <a href="/">
        <img
          src={logo}
          alt="Pernambox Logo"
          className="mx-6 my-4"
          height={64}
          width={64}
        />
      </a>
    </header>
  );
}
