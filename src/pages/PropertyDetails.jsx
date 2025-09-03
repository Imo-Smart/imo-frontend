// src/pages/PropertyDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { BedDouble, Bath, Car, Sofa, Share2 } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "leaflet/dist/leaflet.css";

import api from "../service/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await api.get(`/api/properties/${id}`);
        setProperty(data);
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center py-10 text-lg">Carregando imóvel...</p>;
  if (!property) return <p className="text-center py-10 text-red-500">Imóvel não encontrado.</p>;

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
  });

  const whatsappNumber = property.contactPhone || "554191043191";
  const whatsappMessage = `Olá, tenho interesse no imóvel ${property.name} em ${property.address}. Poderia me passar mais informações?`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.name,
        text: `Confira este imóvel: ${property.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para área de transferência!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-24 space-y-8">
      {/* Carrossel + Galeria */}
      <div className="space-y-4">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          className="rounded-2xl shadow-lg"
        >
          {property.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={`${img}?w=1200&h=800&c=fill&q=auto:best`}
                alt={`${property.name} - ${idx + 1}`}
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover rounded-2xl"
                Loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          slidesPerView={4}
          spaceBetween={10}
          watchSlidesProgress
          className="rounded-xl"
        >
          {property.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={`${img}?w=200&h=150&c=fill&q=auto`}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-[80px] object-cover rounded-lg cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mapa */}
      {property.location?.lat && property.location?.lng && (
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
          <MapContainer
            center={[property.location.lat, property.location.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker
              position={[property.location.lat, property.location.lng]}
              icon={customIcon}
            >
              <Popup>{property.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* Informações principais */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{property.name}</h1>
            <p className="text-gray-500">{property.address}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={shareProperty}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Share2 size={18} /> Compartilhar
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Detalhes do imóvel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <BedDouble className="w-6 h-6 text-gray-600 mb-1" />
            <p className="text-lg font-semibold">{property.bedrooms}</p>
            <span className="text-gray-500">Quartos</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-6 h-6 text-gray-600 mb-1" />
            <p className="text-lg font-semibold">{property.bathrooms}</p>
            <span className="text-gray-500">Banheiros</span>
          </div>
          <div className="flex flex-col items-center">
            <Car className="w-6 h-6 text-gray-600 mb-1" />
            <p className="text-lg font-semibold">{property.parking}</p>
            <span className="text-gray-500">Vagas</span>
          </div>
          <div className="flex flex-col items-center">
            <Sofa className="w-6 h-6 text-gray-600 mb-1" />
            <p className="text-lg font-semibold">{property.furnished ? "Sim" : "Não"}</p>
            <span className="text-gray-500">Mobiliado</span>
          </div>
        </div>

        {/* Preço */}
        <div>
          {property.type === "sale" ? (
            <p className="text-2xl font-bold text-green-600">
              R$ {property.price.toLocaleString("pt-BR")}
            </p>
          ) : (
            <p className="text-2xl font-bold text-blue-600">
              R$ {property.rentalDetails?.monthlyRent?.toLocaleString("pt-BR")} / mês
            </p>
          )}
          {property.offer && <p className="text-sm text-red-500 mt-1">Oferta: {property.offer}</p>}
        </div>

        {/* Descrição */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700">{property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
