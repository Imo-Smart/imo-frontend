import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
  const featured = [
    { id: 1, title: "Casa de luxo em São Paulo", img: "https://picsum.photos/1200/400?1" },
    { id: 2, title: "Apartamento moderno no Rio", img: "https://picsum.photos/1200/400?2" },
    { id: 3, title: "Chácara ampla em Minas", img: "https://picsum.photos/1200/400?3" },
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
            <img src={item.img} alt={item.title} className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-bold text-white">{item.title}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
