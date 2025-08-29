import { createPortal } from "react-dom";

function Screen7Modal({
  open,
  onChoose,
}: {
  open: boolean;
  onChoose: (skipToAdvanced: boolean) => void;
}) {
  if (!open) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 relative">
        {/* Duo Character */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 object-contain"
            alt="Excited Duo"
            src="/excited-owl.gif"
          />
        </div>

        {/* Text Block */}
        <div className="text-center mb-6 max-w-[36ch] mx-auto">
          <p
            className="font-global-tokens-headings-h-7 
                       font-[number:var(--global-tokens-headings-h-7-font-weight)] 
                       text-[#4b4b4b] 
                       text-[length:var(--global-tokens-headings-h-7-font-size)] 
                       tracking-[var(--global-tokens-headings-h-7-letter-spacing)] 
                       leading-[var(--global-tokens-headings-h-7-line-height)] 
                       [font-style:var(--global-tokens-headings-h-7-font-style)]"
          >
            <span>Wow, your Spanish is so good!</span>
            <br />
            <span>Should we skip to more</span>
            <br />
            <span>advanced?</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onChoose(false)}
            className="h-12 rounded-xl border-2 border-gray-300 bg-white 
                       shadow-[0_3px_0_#d1d5db] text-gray-600 
                       active:translate-y-[2px] active:shadow-none 
                       transition-all hover:bg-gray-50 text-sm 
                       font-global-tokens-headings-h-7 
                       font-[number:var(--global-tokens-headings-h-7-font-weight)] 
                       tracking-[var(--global-tokens-headings-h-7-letter-spacing)] 
                       [font-style:var(--global-tokens-headings-h-7-font-style)]"
          >
            NO, KEEP LEARNING
          </button>

          <button
            onClick={() => onChoose(true)}
            className="h-12 rounded-xl text-white 
                       bg-[#2ec748] shadow-[0_3px_0_#27aa3d] 
                       active:translate-y-[2px] transition-all text-sm 
                       font-global-tokens-headings-h-7 
                       font-[number:var(--global-tokens-headings-h-7-font-weight)] 
                       tracking-[var(--global-tokens-headings-h-7-letter-spacing)] 
                       [font-style:var(--global-tokens-headings-h-7-font-style)]"
          >
            YES, SKIP
            <br />
            AHEAD
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export { Screen7Modal };
