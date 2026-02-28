import { siteContent } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-8 px-6 text-center">
      <p className="text-white/20 text-sm">
        © {new Date().getFullYear()} {siteContent.name}. All rights reserved.
      </p>
    </footer>
  );
}
