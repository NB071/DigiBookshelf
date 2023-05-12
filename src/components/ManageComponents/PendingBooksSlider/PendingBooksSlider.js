import "./PendingBooksSlider.scss";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import Swiper styles
import "swiper/css";

export default function PendingBooksSlider() {
  const [pendingBooks, setPendingBooks] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/books?recent`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then(({ data }) => {
        setPendingBooks(data);
      });
  }, [token]);
  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  if (!pendingBooks) {
    return null;
  }
  return (
    <section className="recent-added">
      {pendingBooks[currentSlideIndex] && (
        <div
          className="recent-added__blur-overlay"
          style={{
            backgroundImage: `url(${pendingBooks[currentSlideIndex].cover_image})`,
          }}
        ></div>
      )}
      <div className="recent-added__left">
        <h2 className="recent-added__heading">Readings</h2>
      </div>
      <div className="recent-added__right-container">
        <div className="recent-added__right">
          {pendingBooks.length !== 0 ? (
            <Swiper
              className={"recent-added__slider-wrapper"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={4}
              onSlideChangeTransitionEnd={handleSlideChange}
            >
              {pendingBooks &&
                pendingBooks.map((book, index) => (
                  <SwiperSlide
                    className={`recent-added__slide ${
                      index !== currentSlideIndex
                        ? "recent-added__non-selected"
                        : "recent-added__selected"
                    }`}
                  >
                    <Link to={`/user/books/${book.book}`}>
                      <article key={book.id}>
                        <img
                          src={book.cover_image}
                          alt={book.book_name}
                          title={book.book_name}
                        />
                        <div className="recent-added__book-card-info">
                          <h3 className="recent-added__book-title">
                            {book.book_name}
                          </h3>

                          <Link
                            className="recent-added__CTA"
                            to={`/user/books/${book.book}`}
                          >
                            More info
                          </Link>
                        </div>
                      </article>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <p>Currently, there's no book in you're shelf...</p>
          )}
        </div>
      </div>
    </section>
  );
}
