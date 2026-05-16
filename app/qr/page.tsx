import type { Metadata } from "next";
import QRCode from "qrcode";

export const metadata: Metadata = {
  title: "Journey Projects — QR Code",
  robots: { index: false },
};

const SITE_URL = "https://journeyprojects.co";

export default async function QRPage() {
  const svg = await QRCode.toString(SITE_URL, {
    type: "svg",
    width: 320,
    margin: 0,
    color: { dark: "#000000", light: "#ffffff" },
  });

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div
        className="w-80 h-80"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="mt-6 text-sm text-neutral-500">{SITE_URL}</p>
    </div>
  );
}
