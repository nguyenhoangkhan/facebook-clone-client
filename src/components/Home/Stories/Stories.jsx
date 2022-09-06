import { useEffect, useState, memo } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import "@splidejs/splide/css/core";

import { stories } from "../../../assets/data/home";
import { Plus } from "../../../assets/svg";
import Story from "./Components/Story";
import { useMediaQuery } from "react-responsive";

const Stories = () => {
  const [isHide, setIsHide] = useState(0);

  const isOnMobile = useMediaQuery({
    query: "max-width: 640px",
  });

  useEffect(() => {
    new Splide(".splide", {
      focus: "center",
      perPage: 6,
      pagination: false,
      gap: "10px",
      drag: false,
      slideFocus: false,
      breakpoints: {
        850: {
          perPage: 5,
        },
        640: {
          perPage: 4,
          arrows: false,
        },
      },
      slideFocus: true,
      focus: 0,
    }).mount();
  }, []);

  useEffect(() => {
    const prevBtn = document.querySelector(".splide__arrow--prev") ?? "";
    const nextBtn = document.querySelector(".splide__arrow--next") ?? "";

    if (!isOnMobile) {
      prevBtn.onclick = () => {
        setIsHide((prev) => prev - 1);
      };
      nextBtn.onclick = () => {
        setIsHide((prev) => prev + 1);
      };

      if (isHide < 1) {
        prevBtn.classList.add("hide");
      } else {
        prevBtn.classList.remove("hide");
      }
      if (isHide === stories.length - 5) {
        nextBtn.classList.add("hide");
      } else {
        nextBtn.classList.remove("hide");
      }
    }
  }, [isHide]);

  return (
    <section className="splide">
      <div className="splide__track">
        <ul className="splide__list">
          <div className="create_story_card splide__slide">
            <img
              src="../../../images/default_pic.png"
              alt=""
              className="create_story_img"
            />
            <div className="plus_story">
              <Plus color="#fff" />
            </div>
            <div className="story_create_text">Tạo tin</div>
          </div>
          {stories.map((story, i) => (
            <Story story={story} key={i} />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default memo(Stories);
