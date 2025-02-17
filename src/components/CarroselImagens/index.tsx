import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Img } from "@chakra-ui/react";
import notfound from '../../assets/images/not-found.jpg'

interface ImagemProps {
  id: string;
  image: string;
  obra: string;
}

interface ImageCarouselProps {
  obraId: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ obraId }) => {
  const [images, setImages] = useState<ImagemProps[]>([]);

  useEffect(() => {
    fetch("https://dadosadm.mogidascruzes.sp.gov.br/api/imagens_obras/")
      .then((response) => response.json())
      .then((data) => {
        const filteredImages = data.filter((image: ImagemProps) => image.obra === obraId);
        setImages(filteredImages);
      })
      .catch((error) => console.error("Erro ao buscar imagens:", error));
  }, [obraId]);

  return (
    <Box width="100%">
      {images.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <Img src={image.image} alt={`Obra ${image.obra}`} width="100%" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Img
          src={notfound}
          alt="Imagem não encontrada"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
          borderRadius="10px"
          border="2px white solid"
          width="100%"
        />
      )}
    </Box>
  );
};

export default ImageCarousel;
