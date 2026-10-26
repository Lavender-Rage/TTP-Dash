export default function HelpButton() {
  return (
    <button
      className="fixed bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 text-xl font-medium text-white shadow-lg ring-2 ring-white/70 hover:bg-navy-800"
      aria-label="Help"
    >
      ?
    </button>
  );
}
