'use client'

import React from "react";
import Image from "next/image";
import { Screen3 } from "./Screen3";

type OptionKey = "one" | "man" | "cat" | "boy";

const options: { key: OptionKey; label: string; imageSrc: string }[] = [
  { key: "one", label: "one", imageSrc: "/images/one.png" },
  { key: "man", label: "the man", imageSrc: "/images/the-man.png" },
  { key: "cat", label: "the cat", imageSrc: "/images/the-cat.png" },
  { key: "boy", label: "the boy", imageSrc: "/images/the-boy.png" },
];

export const Screen2 = (): JSX.Element => {
  const [selected, setSelected] = React.useState<OptionKey | null>(null);
  const [checked, setChecked] = React.useState(false);
  const [showScreen3, setShowScreen3] = React.useState(false);

  // Auto-play audio when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance("uno");
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const correctKey: OptionKey = "one";
  const isCorrect = checked && selected === correctKey;
  const isWrong = checked && selected && selected !== correctKey;

  const handleCheck = () => {
    setChecked(true);
    if (selected === correctKey) {
      setTimeout(() => {
        setShowScreen3(true);
      }, 1500);
    }
  };

  if (showScreen3) {
    return <Screen3 />;
  }

  return (
    <div className="w-full h-[844px] bg-white relative overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 h-[54px]">
        <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
          <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-4 px-4 mb-6">
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#6b7280]">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div className="w-[18%] h-full bg-[#58cc02] rounded-full"></div>
        </div>
      </div>

      {/* Level Indicator */}
      <div className="flex items-center gap-3 px-6 mb-8">
        <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">1</span>
        </div>
        <span className="text-[#ce82ff] font-bold text-sm tracking-wider">
          LEVEL 1
        </span>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-32">
        {/* Title */}
        <h1 className="text-2xl font-bold text-[#4b4b4b] mb-6">
          Select the correct image
        </h1>

        {/* Audio Row */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="w-12 h-12 rounded-xl border-0 p-0 shadow-md bg-[#1cb0f6] flex items-center justify-center"
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance("uno");
              utterance.lang = 'es-ES';
              utterance.rate = 0.8;
              speechSynthesis.speak(utterance);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.07 4.93A10 10 0 0 1 19.07 19.07M15.54 8.46A5 5 0 0 1 15.54 15.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="underline decoration-dotted text-[#ce82ff]">
            uno
          </span>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {options.map(({ key, label, imageSrc }) => {
            const active = selected === key;
            const correct = checked && key === correctKey;
            const wrong = checked && active && key !== correctKey;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelected(key);
                  setChecked(false);
                }}
                className={[
                  "rounded-2xl p-4 text-left bg-white shadow-sm border transition",
                  active ? "ring-2 ring-sky-400 border-sky-300" : "border-[#e6e6e6]",
                  correct ? "ring-2 ring-emerald-500" : "",
                  wrong ? "ring-2 ring-rose-500" : "",
                ].join(" ")}
              >
                <div className="grid gap-2 place-items-center">
                  <Image
                    width={64}
                    height={64}
                    src={imageSrc}
                    alt={label}
                    className="w-16 h-16 object-contain"
                  />
                  <div
                    className={
                      key === "one" ? "text-sm font-medium text-[#1cb0f6]" : "text-sm text-slate-600"
                    }
                  >
                    {label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isCorrect && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <span className="text-green-700 font-semibold">¡Correcto! Great job!</span>
          </div>
        )}
        {isWrong && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <span className="text-red-700 font-semibold">Not quite right. Try again!</span>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute left-4 right-4 bottom-[48px]">
        <button
          className="w-full h-12 rounded-xl text-white font-semibold tracking-wide disabled:opacity-60 bg-[#58cc02]"
          disabled={!selected}
          onClick={handleCheck}
        >
          CHECK
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[139px] h-[5px] rounded-full bg-black/90" />
    </div>
  );
};