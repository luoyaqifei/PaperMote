import Image from "next/image";

export default function Logo() {
  return (
    <section style={{ width: "50px", height: "50px", position: "relative" }}>
      <Image
        src="/logo.svg"
        alt="PaperMote Logo"
        fill={true}
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "contain",
        }}
      />
    </section>
  );
}
