import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Screen5 } from "../Screen5/Screen5";

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const statsData = [
  {
    icon: "/auto-layout-horizontal-2.svg",
    value: "1",
    color: "text-[#ff9600]",
  },
  {
    icon: "/auto-layout-horizontal.svg",
    value: "505",
    color: "text-[#5acd05]",
  },
  {
    icon: "/auto-layout-horizontal-3.svg",
    value: "5",
    color: "text-[#ff4b4b]",
  },
];

const languageOptions = [
  {
    name: "Spanish",
    flag: "/image-spanish.png",
    bgColor: "bg-[#d2effd]",
    borderColor: "border-[#77d0fa]",
    shadowColor: "shadow-[0px_2px_0px_#77d0fa]",
    textColor: "text-[#1cb0f6]",
    isSelected: true,
  },
  {
    name: "French",
    flag: "/image-3.png",
    bgColor: "bg-white",
    borderColor: "border-[#ebebeb]",
    shadowColor: "shadow-[0px_2px_0px_#ebebeb]",
    textColor: "text-[#4b4b4b]",
    isSelected: false,
  },
  {
    name: "German",
    flag: "/image-5.png",
    bgColor: "bg-white",
    borderColor: "border-[#ebebeb]",
    shadowColor: "shadow-[0px_2px_0px_#ebebeb]",
    textColor: "text-[#4b4b4b]",
    isSelected: false,
  },
];

export const Element = (): JSX.Element => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("Spanish");
  const [isExiting, setIsExiting] = React.useState(false);
  const [showLanguageButtons, setShowLanguageButtons] = React.useState(true);
  const [showExcitedMessage, setShowExcitedMessage] = React.useState(false);
  const [isScreen4, setIsScreen4] = React.useState(false);
  const [isScreen5, setIsScreen5] = React.useState(false);

  const handleLanguageSelect = (languageName: string) => {
    setSelectedLanguage(languageName);
    if (languageName === "Spanish") {
      setIsExiting(true);
      setShowExcitedMessage(true); // Show excited message immediately with excited owl
    }
  };

  const handleScreen3Click = () => {
    if (showExcitedMessage && !isScreen4) {
      setIsScreen4(true);
    }
  };

  const handleStartClick = () => {
    setIsScreen5(true);
  };

  if (isScreen5) {
    return <Screen5 />;
  }

  return (
    <div className="bg-white grid justify-items-center [align-items:start] w-screen" onClick={handleScreen3Click}>
      <div className="bg-white overflow-hidden w-[390px] h-[844px]">
        <div className="relative w-[392px] h-[844px] -left-px">
          <header className="absolute w-[390px] h-[54px] top-0 left-px">
            <div className="absolute w-[139px] h-[54px] top-0 left-0">
              <div className="absolute w-[37px] top-[17px] left-[52px] [font-family:'SF_Pro-Semibold',Helvetica] font-normal text-[#454a53] text-[17px] text-center tracking-[0] leading-[22px] whitespace-nowrap">
                9:41
              </div>
            </div>

            <img
              className="absolute w-[139px] h-[54px] top-0 left-[251px]"
              alt="Levels"
              src="/levels.svg"
            />
          </header>

          <nav className="inline-flex items-center gap-[65px] px-4 py-0 absolute top-16 left-0">
            <div className="relative w-[35.57px] h-[25.14px] rounded-lg -rotate-1 [background:url(..//image-4.png)_50%_50%_/_cover]" />

            <div className="inline-flex items-center gap-[63px] relative flex-[0_0_auto]">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 relative flex-[0_0_auto]"
                >
                  <img
                    className="relative flex-[0_0_auto]"
                    alt="Auto layout"
                    src={stat.icon}
                  />

                  <div className="inline-flex items-start pl-0 pr-[0.39px] py-0 relative flex-[0_0_auto]">
                    <div
                      className={`mt-[-0.87px] ${stat.color} relative w-fit font-global-tokens-body-b-5 font-[number:var(--global-tokens-body-b-5-font-weight)] text-[length:var(--global-tokens-body-b-5-font-size)] tracking-[var(--global-tokens-body-b-5-letter-spacing)] leading-[var(--global-tokens-body-b-5-line-height)] whitespace-nowrap [font-style:var(--global-tokens-body-b-5-font-style)]`}
                    >
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <Card className="inline-flex items-center gap-0.5 absolute top-[106px] left-[17px] rounded-[14px] overflow-hidden shadow-[0px_4px_0px_#48a502] border-0">
            <CardContent className="flex flex-col w-[307px] items-start gap-2.5 px-4 py-[15px] relative mt-[-2.00px] mb-[-2.00px] ml-[-2.00px] bg-[#5acd05] border-r-2 [border-right-style:solid] border-[#43a601]">
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative self-stretch mt-[-1.00px] font-global-tokens-body-b-7 font-[number:var(--global-tokens-body-b-7-font-weight)] text-[#cef2ad] text-[length:var(--global-tokens-body-b-7-font-size)] tracking-[var(--global-tokens-body-b-7-letter-spacing)] leading-[var(--global-tokens-body-b-7-line-height)] [font-style:var(--global-tokens-body-b-7-font-style)]">
                  SECTION ?, UNIT ?
                </div>

                <div className="relative self-stretch font-global-tokens-headings-h-4 font-[number:var(--global-tokens-headings-h-4-font-weight)] text-[#fffdfe] text-[length:var(--global-tokens-headings-h-4-font-size)] tracking-[var(--global-tokens-headings-h-4-letter-spacing)] leading-[var(--global-tokens-headings-h-4-line-height)] [font-style:var(--global-tokens-headings-h-4-font-style)]">
                  Find your level
                </div>
              </div>
            </CardContent>

            <img
              className="relative self-stretch flex-[0_0_auto]"
              alt="Frame"
              src="/frame-1000005935.svg"
            />
          </Card>

          <main className="absolute w-[390px] h-[587px] top-48 left-px">
            <div className="absolute w-[301px] h-[261px] top-[146px] left-[83px]">
              <div className="absolute w-[271px] h-[261px] top-0 left-[30px]">
                <div className="absolute w-[205px] h-[205px] top-7 left-[66px]">
                  <img
                    className="w-full h-full"
                    alt="Duo the owl - excited to welcome you!"
                    src="/mask-group.png"
                  />
                </div>

                <div className="absolute w-[70px] h-[65px] top-0 left-0">
                  <img
                    className="w-full h-full"
                    alt="Duo's hand waving"
                    src="/frame-4.svg"
                  />
                </div>

                <div className="absolute w-[70px] h-[65px] top-[196px] left-0">
                  <img
                    className="w-full h-full"
                    alt="Duo's other hand"
                    src="/frame.svg"
                  />
                </div>
              </div>

              <div className="absolute w-20 h-[95px] top-[85px] left-0">
                <img
                  className="w-full h-full"
                  alt="Duo's wing"
                  src="/frame-1.svg"
                />
              </div>
            </div>

            <div className={`flex w-[98px] h-[93px] items-start absolute top-[42px] left-36 ${isScreen4 ? 'z-50' : ''}`}>
              <div className="inline-flex items-start p-3.5 relative flex-[0_0_auto]">
                <img
                  className="absolute w-[98px] h-[93px] top-0 left-0"
                  alt="Auto layout"
                  src="/auto-layout-horizontal-1.svg"
                />

                <div className="relative w-[70px] h-[65px] bg-[url(/frame-3.svg)] bg-[100%_100%]">
                  <div className="relative w-px h-px -top-px left-[35px]">
                    <div className="flex w-[81px] items-start pt-[1.67px] pb-0 px-0 relative -top-12 left-[-41px]">
                      <Button 
                        className={`flex w-[81.24px] items-start justify-center pl-3.5 pr-[15.24px] pt-[14.6px] pb-[13.4px] relative mr-[-0.01px] bg-white rounded-[10px] overflow-hidden border-2 border-solid border-neutral-200 h-auto hover:bg-white ${isScreen4 ? 'animate-pulse-glow hover:scale-110 transition-transform duration-200' : ''}`}
                        onClick={handleStartClick}
                      >
                        <div className="relative w-fit mt-[-2.00px] [font-family:'Nunito',Helvetica] font-black text-[#58cc02] text-[15px] text-center tracking-[0] leading-5 whitespace-nowrap">
                          START
                        </div>
                      </Button>

                      <div className="absolute w-5 h-2.5 top-12 left-[31px] rotate-180">
                        <div className="relative w-3.5 h-3.5 top-[-7px] left-[3px] bg-white rounded-sm border-2 border-solid border-neutral-200 rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute w-[134px] h-[159px] top-[419px] left-[158px]">
              <img
                className="absolute w-20 h-[95px] top-16 left-[54px]"
                alt="Frame"
                src="/frame-1.svg"
              />

              <img
                className="absolute w-[70px] h-[65px] top-0 left-0"
                alt="Frame"
                src="/frame-5.svg"
              />
            </div>
          </main>

          <div className="flex w-[205px] items-start absolute top-[341px] left-[180px]">
            <div className="flex items-start justify-center relative flex-1 grow">
              <div className="relative w-[205px] h-[260.75px]" />
            </div>
          </div>

          <footer className="flex flex-col w-[390px] items-start gap-2.5 px-3 py-[11px] absolute top-[755px] left-px bg-white border-t-2 [border-top-style:solid] border-[#e6e3e6]">
            <img
              className="relative self-stretch w-full flex-[0_0_auto]"
              alt="Frame"
              src="/frame-1000005944.svg"
            />
          </footer>

          <div className="absolute w-[390px] h-[21px] top-[823px] left-px">
            <div className="relative w-[139px] h-[5px] top-2 left-[125px] bg-black rounded-full rotate-180" />
          </div>

          <div className="absolute w-[390px] h-[844px] top-0 left-px bg-[#000000b2]">
            {isExiting && !isScreen4 && <Confetti />}
            
            {!isScreen4 && (
              <img
                className="absolute w-48 h-[179px] top-[248px] left-[118px] object-cover animate-sway hover:animate-pulse transition-transform duration-300 hover:scale-105"
                alt="Image"
                src={isExiting ? "/excited-owl.gif" : "/Duolingo Hello.gif"}
              />
            )}

            {/* Screen 4: Owl moving down below start button */}
            {isScreen4 && (
              <img
                className="absolute w-48 h-[179px] top-[450px] left-[98px] object-cover animate-bounce-gentle transition-all duration-1000 ease-out"
                style={{
                  transform: 'translateX(-300px)',
                  animation: 'moveOwlFromLeft 1s ease-out forwards'
                }}
                alt="Cheer owl"
                src="/cheer-owl.gif"
              />
            )}

            {/* Screen 4 Message Bubble */}
            {isScreen4 && (
              <Card className="absolute w-[246px] h-[111px] top-[360px] left-[73px] border-0">
                <CardContent className="relative w-[244px] h-[111px] bg-[url(/union.svg)] bg-[100%_100%] p-0">
                  <div className="absolute w-[219px] h-[78px] top-[16px] left-[19px] font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] text-[#4b4b4b] text-[length:var(--global-tokens-headings-h-7-font-size)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] leading-[var(--global-tokens-headings-h-7-line-height)] [font-style:var(--global-tokens-headings-h-7-font-style)]">
                    <div>
                      <div className="typewriter-screen4-line1">OK, now...</div>
                      <div className="typewriter-screen4-line2">Let's start and find your</div>
                      <div className="typewriter-screen4-line3">level!</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isScreen4 && (
              <Card className="absolute w-[246px] h-[111px] top-[142px] left-[73px] border-0">
                <CardContent className="relative w-[244px] h-[111px] bg-[url(/union.svg)] bg-[100%_100%] p-0">
                  {!showExcitedMessage ? (
                    <div className="absolute w-[219px] h-[52px] top-[27px] left-[19px] font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] text-[#4b4b4b] text-[length:var(--global-tokens-headings-h-7-font-size)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] leading-[var(--global-tokens-headings-h-7-line-height)] [font-style:var(--global-tokens-headings-h-7-font-style)]">
                      <div className="typewriter-line1">What would you like</div>
                      <div className="typewriter-line2">to learn?</div>
                    </div>
                  ) : (
                    <div className="absolute w-[219px] h-[78px] top-[16px] left-[19px] font-global-tokens-headings-h-7 font-[number:var(--global-tokens-headings-h-7-font-weight)] text-[#4b4b4b] text-[length:var(--global-tokens-headings-h-7-font-size)] tracking-[var(--global-tokens-headings-h-7-letter-spacing)] leading-[var(--global-tokens-headings-h-7-line-height)] [font-style:var(--global-tokens-headings-h-7-font-style)]">
                      <div>
                        <div className="typewriter-excited-line1">Yay! Get ready to join 10</div>
                        <div className="typewriter-excited-line2">million people learning</div>
                        <div className="typewriter-excited-line3">Spanish with Duolingo.</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {showLanguageButtons && languageOptions.map((language, index) => (
              <div
                key={language.name}
                className={`absolute w-[390px] h-[66px] ${index === 0 ? "top-[430px]" : index === 1 ? "top-[497px]" : "top-[564px]"} left-0 ${index === 2 ? "opacity-80" : ""} ${
                  isExiting ? "animate-fade-out" : "animate-fade-in"
                } ${
                  isExiting ? `opacity-0` : ""
                }`}
                style={{ 
                  animationDelay: !isExiting ? `${index * 150}ms` : `${index * 100}ms`
                }}
              >
                <Button
                  className={`flex w-[389px] h-[66px] items-center gap-2 px-4 py-1.5 absolute top-0 left-0 bg-transparent hover:bg-transparent h-auto transition-all duration-200`}
                  onClick={() => handleLanguageSelect(language.name)}
                >
                  <Card
                    className={`flex items-center gap-3.5 px-3.5 py-2 relative flex-1 grow rounded-xl border-2 border-solid transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      selectedLanguage === language.name 
                        ? 'bg-[#d2effd] border-[#77d0fa] shadow-[0px_2px_0px_#77d0fa]' 
                        : 'bg-white border-[#ebebeb] shadow-[0px_2px_0px_#ebebeb] hover:bg-[#f8f9fa] hover:border-[#d0d7de]'
                    }`}
                  >
                    <div
                      className={`relative w-[46px] h-[38px] rounded-lg bg-[url(${language.flag})] bg-cover bg-[50%_50%]`}
                    >
                      {language.name === "Spanish" && (
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                          <div className="w-full h-1/3 bg-red-600"></div>
                          <div className="w-full h-1/3 bg-yellow-400"></div>
                          <div className="w-full h-1/3 bg-red-600"></div>
                        </div>
                      )}
                      {language.name === "French" && (
                        <div className="absolute inset-0 rounded-lg overflow-hidden flex">
                          <div className="w-1/3 h-full bg-blue-600"></div>
                          <div className="w-1/3 h-full bg-white"></div>
                          <div className="w-1/3 h-full bg-red-600"></div>
                        </div>
                      )}
                      {language.name === "German" && (
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                          <div className="w-full h-1/3 bg-black"></div>
                          <div className="w-full h-1/3 bg-red-600"></div>
                          <div className="w-full h-1/3 bg-yellow-400"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start justify-center gap-0.5 relative flex-1 grow">
                      <div
                        className={`relative w-fit mt-[-1.00px] font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-[length:var(--global-tokens-headings-h-5-font-size)] tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] whitespace-nowrap [font-style:var(--global-tokens-headings-h-5-font-style)] transition-colors duration-200 ${
                          selectedLanguage === language.name 
                            ? 'text-[#1cb0f6]' 
                            : 'text-[#4b4b4b]'
                        }`}
                      >
                        {language.name}
                      </div>
                    </div>
                  </Card>
                </Button>

              </div>
            ))}

            <img
              className={`absolute w-[370px] h-[30px] top-[630px] left-[9px] object-cover ${
                !isExiting ? 'animate-fade-in' : 'animate-fade-out'
              }`}
              style={{
                animationDelay: !isExiting ? '450ms' : '300ms'
              }}
              alt="Image"
              src="/image-115.png"
            />

          </div>

        </div>
      </div>
    </div>
  );
};