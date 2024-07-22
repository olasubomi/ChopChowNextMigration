import { useState, useEffect } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/router";
import { Element } from "react-scroll";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import { UtensilModal } from "../modal/individual-meal-product";
import utensilImg from "../../../public/assets/store_pics/no-image-utensil.png";

export const SuggestedUtensils = () => {
  const [meals, setMeals] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(8);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const loadMore = () => {
    setVisibleMeals(visibleMeals + 4);
  };
  const router = useRouter();
  const [itemToAdd, setItemAdd] = useState({
    listName: "",
  });

  const addItemToGrocery = async (listName) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      userId: user._id,
      groceryList: {
        listName: itemToAdd.listName || listName,
        groceryItems: {
          itemId: selectedItem._id,
          quantity: quantity.toString(),
        },
      },
    };

    console.log(payload, "payload");
    try {
      const response = await axios(`/groceries`, {
        method: "post",
        data: payload,
      });
      toast.success("Item added successfully");
      setOpenList(false);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });

  const fetchMeals = async () => {
    try {
      const response = await axios(
        `/items/1?type=Utensil&status=Public&limit=50`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data.items, "ee");
      setMeals(response.data.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);
  const fetchGroceryList = async () => {
    try {
      const response = await axios(`/groceries/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data.data, "groceries");
      setSelectGrocery(response.data.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchGroceryList();
  }, []);
  console.log(meals, "meals");
  const filteredMeals = meals.filter(
    (meal) =>
      meal.item_type === "Utensil" && meal.item_status[0]?.status === "Public"
  );
  useEffect(() => {
    // Get the hash value from the URL
    const hash = window.location.hash;

    // Use the hash value as the target ID for scrolling
    const targetId = hash ? hash.substring(1) : "utensils";

    // Scroll to the target section
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className={styles.mealContainer}>
      <Element
        name="utensils"
        id="utensils"
        style={{ fontSize: "2rem", marginBottom: "1rem" }}
      >
        Suggested Utensils for you
      </Element>
      <div className={styles.stores2}>
        {filteredMeals
          .slice(0, visibleMeals)
          .filter((utensil) => utensil)
          .map((utensil, idx) => {
            return (
              <div
                className={styles.card1}
                key={idx}
                onClick={() => {
                  setSelectedItem(utensil);
                  setOpenModal(true);
                }}
              >
                {
                  <div className={styles.box}>
                    <img
                      src={
                        utensil?.itemImage0
                          ? utensil?.itemImage0
                          : "/assets/store_pics/no-image-utensil.png"
                      }
                      className={styles.storeImg1}
                    />
                    <div className={styles.flex}>
                      <p className={styles.name2}>{utensil.item_name}</p>
                      <p>$8.43</p>
                    </div>
                    <p className={styles.storeName}>Chop Chow Official Store</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: ".7rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        {Array(5)
                          .fill("_")
                          .map((_, idx) => (
                            <GoStarFill
                              key={idx + _}
                              color={
                                utensil.average_rating > idx
                                  ? "#04D505"
                                  : "rgba(0,0,0,0.5)"
                              }
                              style={{ marginLeft: ".2rem" }}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                }
              </div>
            );
          })}
        <UtensilModal
          openList={openList}
          openModal={openModal}
          selectGrocery={selectGrocery}
          selectedItem={selectedItem}
          setOpenList={setOpenList}
          setOpenModal={setOpenModal}
          show={show}
          details={details}
          setDetails={setDetails}
          addItemToGrocery={addItemToGrocery}
          setItemAdd={setItemAdd}
          setQuantity={setQuantity}
          quantity={quantity}
          setShow={setShow}
        />
      </div>
      <p className={styles.view} onClick={() => loadMore()}>
        View More
      </p>
    </div>
  );
};
