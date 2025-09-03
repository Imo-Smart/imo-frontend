import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../service/api"
import { Bed, Bath, CarFront, Star } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/api/properties")
        setFeaturedProperties(res.data)
      } catch (error) {
        console.error("Erro ao buscar imóveis em destaque:", error)
      }
    }
    fetchFeatured()
  }, [])

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          fill="yellow"
          key={i}
          size={16}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      )
    }
    return stars
  }

  return (
    <section id="imoveis" className="max-w-7xl mx-auto py-16 px-4 md:px-6">
      <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Imóveis em Destaque
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.length > 0 ? (
          featuredProperties.map((prop) => {
            const averageRating =
              prop.reviews && prop.reviews.length > 0
                ? Math.round(
                    prop.reviews.reduce((sum, r) => sum + r.rating, 0) /
                      prop.reviews.length
                  )
                : 0

            return (
              <div
                key={prop._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                {/* Carrossel de imagens */}
                <div className="relative h-56 sm:h-64 md:h-56">
                  {prop.images && prop.images.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      className="h-full w-full"
                    >
                      {prop.images.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={img}
                            alt={`${prop.name} - foto ${index + 1}`}
                            className="w-full h-56 sm:h-64 md:h-56 object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      Imagem não disponível
                    </div>
                  )}

                  {/* Badge tipo */}
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                    {prop.type === "sale" ? "À Venda" : "Para Alugar"}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                      {prop.name}
                    </h4>

                    <p className="text-gray-500 text-sm mb-2 line-clamp-3">
                      {prop.description}
                    </p>

                    {/* Stars rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(averageRating)}
                    </div>

                    {/* Infos com icons */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Bed size={18} className="text-blue-600" />
                        <span>{prop.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={18} className="text-blue-600" />
                        <span>{prop.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CarFront size={18} className="text-blue-600" />
                        <span>{prop.parking}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preço e botão detalhes */}
                  <div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold text-blue-600">
                        {prop.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                      {prop.offer && (
                        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                          {prop.offer}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/property/${prop._id}`)}
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            Nenhum imóvel em destaque no momento.
          </p>
        )}
      </div>
    </section>
  )
}

export default FeaturedProperties
