import React, { useState, useRef } from "react";
import Image from "next/image";

const WatchDetails: React.FC = () => {
  const thumbnails = [
    "/zaar-raffle/rolex.jpg",
    "/zaar-raffle/rolex-2.png",
    "/zaar-raffle/rolex-3.png",
    "/zaar-raffle/rolex-4.png",
    "/zaar-raffle/rolex-5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomPosition({ x, y });
    }
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + thumbnails.length) % thumbnails.length
    );
  };

  const leftColumnData = [
    {
      header: "Basic Info",
      items: [
        { label: "Listing code", value: "LEI3A4" },
        { label: "Brand", value: "Rolex" },
        { label: "Model", value: "Oyster Perpetual Day-Date" },
        { label: "Reference number", value: "116610LV" },
        { label: "Movement", value: "Automatic" },
        { label: "Case material", value: "Steel" },
        { label: "Bracelet material", value: "Steel" },
        { label: "Year of production", value: "2010" },
        { label: "Condition", value: "Used (Very good)" },
        {
          label: "Scope of delivery",
          value: "No original box, no original papers",
        },
        { label: "Gender", value: "Men's watch/Unisex" },
        { label: "Value", value: "$10,490" },
      ],
    },
    {
      header: "Caliber",
      items: [
        { label: "Movement", value: "Automatic" },
        { label: "Caliber/movement", value: "3135" },
        { label: "Base caliber", value: "cal. 3135" },
        { label: "Power reserve", value: "48 h" },
        { label: "Number of jewels", value: "31" },
      ],
    },
    {
      header: "Case",
      items: [
        { label: "Case material", value: "Steel" },
        { label: "Case diameter", value: "40 mm Try it on" },
        { label: "Water resistance", value: "30 ATM" },
        { label: "Bezel material", value: "Ceramic" },
        { label: "Crystal", value: "Sapphire crystal" },
        { label: "Dial", value: "Green" },
        { label: "Dial numerals", value: "No numerals" },
      ],
    },
    {
      header: "Bracelet/strap",
      items: [
        { label: "Bracelet material", value: "Steel" },
        { label: "Bracelet color", value: "Steel" },
        { label: "Clasp", value: "Fold clasp" },
        { label: "Clasp material", value: "Steel" },
      ],
    },
    { header: "Functions", items: [{ label: "", value: "Date" }] },
  ];

  const rightColumnData = `Explore the world of Rolex watches with us, where luxury meets authenticity. This timepiece is offered watch only and does not come with its original box or papers. This watch contains a G series serial which dates it a 2010 year of production.

This watch is in excellent pre-owned condition. There are some barely visible signs of wear. None of the marks are anything more than superficial marks that can be easily buffed out. The crystal and insert are clean.

The watch comes with ten links on the bracelet. With the glide lock adjustment fully extended, the bracelet will fit most, if not all, wrist sizes. For your convenience, we can size the bracelet for a perfect fit. If you already own another Rolex watch, simply inform us of how many links are on each side of your current watch, and we will match it for you. Alternatively, if this is your first Rolex watch, share your wrist size with us, and we will expertly size it to your specifications. Any removed links will be included in the package.

We commit to making your purchase experience seamless, providing personalization and care at every step. Should you have any questions about the watch or the buying process, please do not hesitate contacting us. Embark on your journey with Rolex, where sophistication and luxury are timelessly encapsulated.

Our Guarantee

We uphold an unwavering commitment to authenticity. Every timepiece in our curated collection undergoes rigorous scrutiny by our team of watch experts, leaving no room for doubt regarding their authenticity. We take pride in standing behind the quality of our timepieces, which is why we offer a one-year limited warranty on all purchases.

The Warranty

We do not hold authorized dealer status for any of the brands we offer. Consequently, we are unable to make any legal claims or representations regarding the original manufacturer's warranty for the timepieces in our collection.`;

  return (
    <div className="bg-dark-gray p-6 rounded-sm shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-lime-green uppercase">
        Rolex Oyster Perpetual Day-Date
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div
            ref={imageRef}
            className="relative w-full h-80 md:h-96 cursor-zoom-in overflow-hidden rounded-sm group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={thumbnails[currentIndex]}
              alt="Rolex Submariner Date"
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-200 ${isZoomed ? "scale-150" : ""}`}
              style={{
                transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
              }}
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              &#10094;
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              &#10095;
            </button>
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`cursor-pointer flex-shrink-0 w-[120px] h-[80px] relative ${
                  currentIndex === index ? "border-2 border-light-green" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <Image
                  src={thumb}
                  alt={`Rolex Submariner Date thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-sm"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 text-light-green">
          <div className="h-[480px] overflow-y-auto pr-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                {leftColumnData.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold text-light-gray mb-2">
                      {section.header}
                    </h3>
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="mb-1 pb-1 border-b border-zinc-700"
                      >
                        <span className="font-bold text-gray-400">
                          {item.label}
                        </span>
                        {item.label && ": "}
                        <span className="text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                {rightColumnData.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
