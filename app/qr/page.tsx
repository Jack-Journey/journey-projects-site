import type { Metadata } from "next";
import QrCodeSvg from "./qr-code-svg";

export const metadata: Metadata = {
  title: "Journey Projects — QR Code",
  robots: { index: false },
};

const SITE_URL = "https://journeyprojects.co";

export default function QRPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      {/* max-w-full lets the QR scale down on <352px viewports instead of overflowing (bug-tester BUG 1) */}
      <div className="aspect-square w-80 max-w-full">
        <QrCodeSvg />
      </div>
      <p className="mt-6 text-sm text-neutral-500">{SITE_URL}</p>
    </div>
  );
}
