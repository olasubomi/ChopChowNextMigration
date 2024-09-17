import heroImage1 from "../public/assets/home/hero-image.png";
import heroImage2 from "../public/assets/home/page-2.png";
import heroImage3 from "../public/assets/home/page-3.png";
import heroImage4 from "../public/assets/home/page-4.png";
import heroImage4Sug from "../public/assets/home/page-4-suggest.png";
import heroImage5 from "../public/assets/home/page-5.png";
import heroImage5Sug from "../public/assets/home/page-5-suggest.png";

import arrow from "../public/assets/home/arrow.svg";
import meal from "../public/assets/home/meal.svg";
import plus from "../public/assets/home/plus.svg";
import icon1 from "../public/assets/home/icon-1.svg";
import icon2 from "../public/assets/home/icon-2.svg";
import icon3 from "../public/assets/home/icon-3.svg";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import locationPin from "../public/assets/home/location.svg";
import "react-multi-carousel/lib/styles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "../src/util/Api";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import Link from "next/link";


const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

export default function HomePage() {
  const [active, setActive] = useState(1);
  const [locations, setLocations] = useState([])
  const router = useRouter();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([])

  const handleQuery = useCallback(async (name) => {
    try {
      const response = await axios.get(`/items/filterstore/${name}`)
      setUsers(Array.isArray(response.data?.data) ? response.data.data : [])
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/stores/getallstores/1?withPaginate=false')
        if (Array.isArray(response.data.data)) {
          const mapped = response.data.data.map((ele) => ele?.supplier_address?.city);
          const arr = []
          for (let entry of mapped) {
            if (!arr.includes(mapped[mapped.lastIndexOf(entry)])) {
              arr.push(mapped[mapped.lastIndexOf(entry)])
            }
          }
          setLocations(arr.filter((ele) => Boolean(ele)))
        }

      } catch (e) {
        console.log(e)
      }
    })()
  }, [])
  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsOpen(false);
        }
      },
      true
    );
  }, []);


  return (
    <div>
      <div className="home_page_container">
        <Carousel
          showDots
          responsive={responsive}
          infinite={true}
          autoPlay
          autoPlaySpeed={7000}
          className="home_page_container"
          customRightArrow={
            <div
              className="arrow-right arrow"
              style={{
                backgroundImage: `url(${arrow.src})`,
              }}
            />
          }
          customLeftArrow={
            <div
              className="arrow-left arrow"
              style={{
                backgroundImage: `url(${arrow.src})`,
              }}
            />
          }
        >
          <div
            className="hero"
            style={{
              backgroundImage: `url(${heroImage1.src})`,
            }}
          >
            <div className="overlay">
              <h1>Chop Chow Marketplace is your new go-to when deciding what to cook</h1>
              <button>Get Started</button>
            </div>
          </div>
          <div
            className="hero hero-2"

          >
            <div className="overlay">
              <h1>Decide, in advance, what to eat with Chop Chow subscriptions</h1>
              <button>Subscribe now</button>
            </div>
          </div>

          <div
            className="hero hero-4"

          >
            <div className="overlay">
              <h1>Share your go to meals with friends on Chop Chow</h1>
              <button>Suggest a meal</button>
            </div>
          </div>

          <div
            className="hero "
            style={{
              backgroundImage: `url(${heroImage4.src})`,
            }}
          >
            <div className="overlay overlay_flex">
              <div className="overlay_flex_1">
                <h1>Suggest your
                  meal with our
                  new AI feature</h1>
                <button>Suggest a meal</button>
              </div>
              <div
                className="overlay_flex_2"
                style={{
                  backgroundImage: `url(${heroImage4Sug.src})`,
                }}
              >

              </div>
            </div>
          </div>

          <div
            className="hero"
            style={{
              backgroundImage: `url(${heroImage5.src})`,
            }}
          >
            <div className="overlay overlay_flex">
              <div className="overlay_flex_1">
                <h1>AI-Powered
                  Label Scanner</h1>
                <div className="section-list">
                  {
                    [
                      {
                        title: "Time Saving",
                        image: icon1
                      },
                      {
                        title: "Accurate",
                        image: icon2
                      },
                      {
                        title: "Ease of Use",
                        image: icon3
                      },
                    ].map((element) => (
                      <div key={element.title} className="section-list-box">
                        <Image src={element.image} />
                        <p>{element.title}</p>
                      </div>
                    ))
                  }
                </div>
                <button>Suggest a meal</button>
              </div>
              <div
                style={{
                  backgroundImage: `url(${heroImage5Sug.src})`,
                }}
                className="overlay_flex_2"
              >

              </div>
            </div>
          </div>
        </Carousel>
      </div>
      <section className="home-section-one home-section">
        <div className="section-one-child">
          <div>
            <h2>
              Share your recipes <br />
              with your fans
            </h2>
            <button onClick={() => router.push("/suggestmeal")}> Suggest A Recipe</button>
          </div>
          <div className="section-image" />
        </div>
      </section>


      <div className="section-four-container">
        <section className="section-four" />
        <div className="box-1 box" />
        <div className="box-2 box" />
        <div className="box-3 box" />
        <div className="box-4 box" />
        <div className="section-content">
          <div className="section-box">
            <h1>Connect with food lovers and chefs from all over the world</h1>
            <div className="section_box_container">
              <div className="section_box_container_cont">
                <input onClick={() => setIsOpen(true)} onChange={(event) => {
                  let debounce_fun = debounce(function () {
                    handleQuery(event.target.value);
                  }, 500);

                  debounce_fun();
                }}  placeholder="Enter the name" className="section_box_container_input" />
                {
                  isOpen && <div ref={ref} className="chef_box_dropdown">
                    {
                      users.map((entry) => <Link key={entry?._id} href={`/chef/${entry._id}`}>
                        <p>{entry?.first_name} {entry?.last_name}</p>
                      </Link>)
                    }
                  </div>
                }
              </div>
              <button onClick={() => setIsOpen(true)} className="section_box_container_button">Find Now</button>
            </div>
            <div className="section_box_image_cont" />
            {/* <div className="section-image" /> */}
            {/* <div className="section-footer">
              {[
                {
                  title:
                    "Get meal Suggestion based on the items in your grocery list",
                  image: meal,
                },
                {
                  title:
                    "Add Ingredients from your meals to your list in a click with our AI function",
                  image: plus,
                },
              ].map((element) => (
                <div key={element.title}>
                  <Image src={element.image} />
                  <p>{element.title}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <section className="section-six">
        <div>
          <h1>Sign Up with Us Today</h1>
          <div className="user-types">
            {
              [
                'Supplier',
                'Customer',
                'Driver'
              ].map((element, idx) => <button onClick={() => setActive(idx + 1)} key={element}>{element}</button>
              )
            }

          </div>
          <div className="chef-box"
            style={{
              backgroundColor: active === 1 ? '#1B5218' : active === 2 ? "#FF6D00" : '#A6DAE5',
            }}
          >
            <h2
              style={{
                color: active === 3 ? '#000' : "#fff"

              }}
            >
              {active === 1 ? "Become a Supplier on Chop Chow" : active === 2 ? "Join Our Esteemed Customers" : "Become A Driver"}
            </h2>
            <p
              style={{
                color: active === 3 ? '#000' : "#fff"

              }}
            >
              {
                active === 1 ?
                  "Elevate your brand by becoming a supplier on ChowChop, the ultimate meal and grocery online destination. Showcase your finest creations, connect with a global audience, and unleash the full potential of your culinary expertise!"
                  : active === 2
                    ? "Drive with purpose: Join our team as a ChowChop driver and play a vital role in connecting culinary delights with doorsteps. Enjoy flexibility, earn rewards, and be the driving force behind a seamless delivery experience for our valued customers!"
                    : "We offer a wide range of delivery options that make it easy to get your favorite products delivered to you. If you want to schedule an order for a specific time, or if you just want to get it immediately, we've got you covered."
              }
            </p>
            <button>Get Started</button>
            <div className="chef-image"
              style={{
                backgroundImage: active === 1 ? 'url(./assets/home/chef.png)' : active === 2 ? 'url(./assets/home/card-2.png)' : 'url(./assets/home/card-3.png)',
              }}
            />
          </div>
        </div>
      </section>

      <section className="section_cities">
        <div className="section_cities_box" />
        <h1>We Are  In These Cities</h1>

        <div className="section-eight-container">
          {
            locations.map((element, idx) => <p style={{
              color: "#000"
            }} className="section-name" key={element + idx}>{element}</p>)
          }
        </div>
      </section>



      {/* <Carousel
        showDots
        containerClass="footer-carousel"
        responsive={responsive}
        arrows={false}
        infinite={true}
        autoPlay
        autoPlaySpeed={7000}

      >
        <section className="section-seven">
          <div className="seven-seven-box">
            <div className="section-seven-content">
              <h2>AI-Powered Label Scanner</h2>
              <p>Chop Chow uses artificial intelligence to add convenience to how technology is used in the food supply and management space.</p>
              <div className="section-list">
                {
                  [
                    {
                      title: "Time Saving",
                      image: icon1
                    },
                    {
                      title: "Accurate",
                      image: icon2
                    },
                    {
                      title: "Ease of Use",
                      image: icon3
                    },
                  ].map((element) => (
                    <div key={element.title} className="section-list-box">
                      <Image src={element.image} />
                      <p>{element.title}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="section-seven-image" />
          </div>
        </section>
        <section className="section-carousel-card">
          <div className="section-div">
            <div className="section-div-image" />
            <div>
              <h1>Suggest your meal with AI</h1>
              <p>Chop chow  uses artificial intelligence to add convenience to how
                technology is used in the food supply and management space.
              </p>
              <div />
              <div />
            </div>
          </div>
        </section>
      </Carousel> */}

    </div>
  );
}
