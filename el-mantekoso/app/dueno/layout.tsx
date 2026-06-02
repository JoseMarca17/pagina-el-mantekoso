import NavbarDueno from "./NavbarDueno";

export default function DuenoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ paddingBottom: 72 }}>{children}</div>
      <NavbarDueno />
    </>
  );
}
