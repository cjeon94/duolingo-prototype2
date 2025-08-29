import React from "react";

interface Screen7Props {
  onResponse: (skipToAdvanced: boolean) => void;
}

export default function Screen7({ onResponse }: Screen7Props): JSX.Element {
  return (
    <div className="absolute inset-0 bg-[#000000b2] z-50 flex items-center justify-center p-4">
      {/* Centered Modal */}
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 relative">
        {/* Duo Character */}
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 object-contain animate-sway"
            alt="Excited Duo"
            src="/excited-owl.gif"
          />
        </div>

        {/* Centered Text Block */}
        <div className="text-center mb-6 max-w-[36ch] mx-auto">
          <p className="font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] text-[#4b4b4b] text-[length:var(--global-tokens-headings-h-7-font-size)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] leading-[var(--global-tokens-headings-h-7-line-height)] [font-style:var(--global-tokens-headings-h-7-font-style)]">
            Wow, your Spanish is so good! Should we skip to more advanced?
          </p>
        </div>

        {/* Two-Column Button Grid */}
        <div className="grid grid-cols-2 gap-3">
         <button
  onClick={() => onResponse(false)}
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
            onClick={() => onResponse(true)}
            className="h-12 rounded-xl text-white active:translate-y-[2px] transition-all bg-[#2ec748] shadow-[0_3px_0_#27aa3d] text-sm font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] [font-style:var(--global-tokens-headings-h-7-font-style)]"
          >
            YES, SKIP<br/>AHEAD
          </button>
        </div>
      </div>
    </div>
  );
}

export { Screen7 };