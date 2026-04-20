const images = [
  { src: "../../../hero1.png", rotate: "rotate-30"},
  { src: "../../../hero2.png", rotate: "rotate-20"},
  { src: "../../../hero3.png", rotate: "rotate-10"},
  { src: "../../../hero4.png", rotate: "rotate-0"},
];

export default function HeroImages() {
  return (
    <div className="relative lg:max-w-lg md:w-1/2 w-5/6 aspect-square group mr-2 lg:mr-6 xl:mr-10">
      
      {/* Background Circle */}
      {/* <div className="absolute inset-0 bg-indigo-500/60 rounded-full blur-2xl scale-90"></div> */}

      {images.map((img, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 
            ${img.rotate}
            transition-transform
            duration-500 
            ease-in-out 
            delay-75
            transform-gpu
            hover:z-40
            group-hover:rotate-0
            hover:scale-105
            ${index === 3 ? "relative z-30" : "z-10"}
          `}
        >
          <img
            src={img.src}
            alt="hero"
            className="w-full h-full object-cover rounded-xl shadow-2xl"
          />
        </div>
      ))}
    </div>
  );
}
