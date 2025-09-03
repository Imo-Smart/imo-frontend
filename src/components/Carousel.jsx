import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importando imagens locais
import imgHouse1 from "../assets/imgHouse.jpg";
import imgHouse2 from "../assets/imgHouse2.jpg";
import imgHouse3 from "../assets/imgHouse3.jpg";

export default function Carousel() {
  const featured = [
    { id: 1, img: imgHouse1, title: "Casa moderna com jardim" },
    { id: 2, img: imgHouse2, title: "Apartamento no centro" },
    { id: 3, img: imgHouse3, title: "Chácara espaçosa para família" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="mt-16">
      <Slider {...settings}>
        {featured.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
