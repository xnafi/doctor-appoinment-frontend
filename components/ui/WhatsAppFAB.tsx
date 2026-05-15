import Link from "next/link";

/**
 * WhatsApp floating action button.
 * Opens a pre-filled WhatsApp message to the doctor's number.
 * Position: bottom-left, so it doesn't clash with ScrollToTop (bottom-right).
 */
export function WhatsAppFAB() {
  const phone = "8801312612890"; // international format, no +
  const message = encodeURIComponent(
    "Hello Dr. Tirthankar, I would like to book an appointment."
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dr. Tirthankar on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white text-body-sm font-semibold transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
      style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.526 5.854L0 24l6.335-1.498A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.965 0-3.8-.535-5.373-1.464l-.385-.228-3.991.943.96-3.894-.251-.402A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </Link>
  );
}
