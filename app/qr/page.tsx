import type { Metadata } from "next";
import QrCodeSvg from "./qr-code-svg";
import { BackButton } from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Journey Projects — QR Code",
  robots: { index: false },
};

const SITE_URL = "https://journeyprojects.co";

export default function QRPage() {
  return (
    <>
      {/* /qr had no way back — the header wordmark links home but reads as a
          brand mark (Jack ruling, #915 sitting). Same sticky bar the project
          pages use, arrow only ("just the arrow is enough"), destination
          home rather than /#work. */}
      <BackButton href="/" visibleText={null} srLabel="Back to home" />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        {/* Visually-hidden h1 so the page has a heading outline (SD F7, same
            class as finding 2.1.1 / SC 1.3.1). sr-only keeps the deliberately
            minimal visual design untouched — semantics only. */}
        <h1 className="sr-only">Journey Projects QR code</h1>
        {/* max-w-full lets the QR scale down on <352px viewports instead of overflowing (bug-tester BUG 1) */}
        <div className="aspect-square w-80 max-w-full">
          <QrCodeSvg />
        </div>
        <p className="mt-6 text-sm text-neutral-500">{SITE_URL}</p>
      </div>
    </>
  );
}
