import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  BedDouble,
  Bath,
  Car,
  Sofa,
} from "lucide-react"; // ícones
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

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

  if (loading) {
    return <p className="text-center py-10 text-lg">Carregando imóvel...</p>;
  }

  if (!property) {
    return (
      <p className="text-center py-10 text-red-500">Imóvel não encontrado.</p>
    );
  }

  // Ícone customizado para o marcador no mapa
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
  });

  // WhatsApp link com mensagem pré-pronta
  const whatsappNumber = property.contactPhone || "554191043191";
  const message = `Olá, tenho interesse no imóvel ${property.name} em ${property.address}. Poderia me passar mais informações?`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="max-w-6xl mx-auto p-4 pt-24">
      {/* Carrossel + Galeria + Mapa lado a lado */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Carrossel */}
        <div>
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-2xl shadow-lg mb-4"
          >
            {property.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Galeria de miniaturas */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress
            className="rounded-xl"
          >
            {property.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-[100px] object-cover rounded-lg cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mapa */}
        {property.location?.lat && property.location?.lng && (
          <div className="h-[510px] rounded-2xl overflow-hidden shadow-md">
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
      </div>

      {/* Informações principais */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-8">
        <h1 className="text-2xl font-bold mb-2">{property.name}</h1>
        <p className="text-gray-500 mb-4">{property.address}</p>

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
            <p className="text-lg font-semibold">
              {property.furnished ? "Sim" : "Não"}
            </p>
            <span className="text-gray-500">Mobiliado</span>
          </div>
        </div>

        {/* Preço */}
        <div className="mt-6">
          {property.type === "sale" ? (
            <p className="text-2xl font-bold text-green-600">
              R$ {property.price.toLocaleString()}
            </p>
          ) : (
            <p className="text-2xl font-bold text-blue-600">
              R$ {property.rentalDetails?.monthlyRent?.toLocaleString()} / mês
            </p>
          )}
          {property.offer && (
            <p className="text-sm text-red-500 mt-1">Oferta: {property.offer}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700">{property.description}</p>
        </div>
      </div>

      {/* Botão WhatsApp */}
      <div className="mt-6 flex justify-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6"
          />
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PropertyDetails;
