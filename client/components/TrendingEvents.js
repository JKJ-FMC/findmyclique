import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import FeaturedEvent from './Events/FeaturedEvent';

import './TrendingEvents.css';

const TrendingEvents = () => {
  const events = useSelector((state) => state.events) || [];

  const nycEvents = events.filter((ev) => ev.city === 'nyc').slice(0, 2);
  const laEvents = events.filter((ev) => ev.city === 'la').slice(0, 1);
  const chicEvents = events.filter((ev) => ev.city === 'chicago').slice(0, 1);
  const bostEvents = events.filter((ev) => ev.city === 'boston').slice(0, 1);
  const phillyEvents = events.filter((ev) => ev.city === 'philly').slice(0, 1);

  const items = [
    ...nycEvents,
    ...laEvents,
    ...chicEvents,
    ...bostEvents,
    ...phillyEvents,
  ];

  return (
    <div className="trending">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide className="swiper-slide" key={idx}>
              <FeaturedEvent event={item} className="trendEvent" key={idx} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TrendingEvents;
