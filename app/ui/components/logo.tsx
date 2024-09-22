import Image from "next/image";

export default function Logo() {
  return (
    <div style={{ width: '50px', height: '50px', position: 'relative' }}>
      <Image
        src="/logo.svg"
        alt="PaperMote Logo"
        fill={true}
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "contain"
        }} />
    </div>
  );
}
