import React, { useEffect, useState } from "react";
import styles from "./meal.module.css";

import Head from "next/head";
import Image from "next/image";
import {
  FacebookEIcon,
  RedditIcon,
  InstaEIcon,
  LocationIcon,
  PrintEIcon,
  ShareIcon,
  TwitterEIcon,
  WhatsappEIcon,
  EmailIcon,
  CallIcon,
} from "../icons";
import Stores from "./stores";
import Reviews from "./Reviews";
import { UserIcon } from "../icons";
import { GoStarFill } from "react-icons/go";
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton
} from "react-share";
import InstagramShareButton from "../SocialShare/InstagramShare";
import { AiOutlineClose } from "react-icons/ai";
import axios from "../../util/Api";
import { Modal } from "../modal/popup-modal";
import { toast } from "react-toastify";
import { useMediaQuery } from "../../hooks/usemediaquery";

function Meal(props) {
  //const url = 'http://localhost:3000/'
  const url = 'https://www.chopchow.app/meal/';
  const mealURL = 'https://www.chopchow.app/meal/';

  const matches = useMediaQuery("(min-width: 768px)");
  const [serves, setServes] = useState(parseInt(props.meal?.servings));
  const [user, setUser] = useState({});
  const [openList, setOpenList] = useState(false);
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [show, setShow] = useState(false);
  const [groceryList, setGroceryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  console.log(selectedItem, "sele");
  const [quantity, setQuantity] = useState(1);

  const [itemToAdd, setItemAdd] = useState({
    listName: "",
  });
  console.log(groceryList, "gro");

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

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user")) || {};
    setUser(user);
  }, []);
  // useEffect(() => {
  //     setServes(parseInt(props.props.meal.servings))
  // })
  console.log(props, "line 24");
  function addServe(val) {
    let s = serves + val;
    if (s >= props.meal.servings) {
      setServes(s);
    }
  }

  // console.log(props.props.props.props.meal, "meal props.props")
  let num = 0;

  console.log("meald callback", props.callback);
  console.log(props.meal, "serve me");
  console.log(props.meal.itemImage0, "serve me");

  //   let url = shareURL + "&via=" + "ChopChowMarket" +"&text=" + encodeURIComponent(`${props.meal.item_intro}`);

  // const shareURL = `https://www.chopchow.app/meal/${props.meal._id}?`

  return (
    <>
      <Head>
        <title>Meal</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={url + props.meal.itemImage0} />
        <meta name="twitter:image:alt" content={props.meal.item_name} />
        <meta name="twitter:description" content={props.meal.item_intro} />

        <meta property="og:title" content={props.meal.item_name} />
        <meta property="og:description" content={props.meal.item_intro} />
        <meta property="og:image" content={url + props.meal.itemImage0} />
        <meta property="og:image:alt" content={props.meal.item_name} />
      </Head>

      {props.meal && (
        <div className={styles.meal_sections}>
          <div className={styles.meal_section_2}>
            <div className={styles.meal_section_2_col_1}>
              {props.meal.item_images?.length > 0 && (
                <>
                  {props.meal.itemImage0?.length > 0 &&
                  props.meal.itemImage0 !== "[object HTMLImageElement]" ? (
                    <Image
                      src={props.meal.itemImage0}
                      alt={props.meal.item_name}
                      className={styles.meal_section_2_main_img}
                      height={500}
                      width={500}
                    />
                  ) : (
                    <span></span>
                  )}
                </>
              )}
              <div className={styles.meal_section_2_images}>
                {props.meal.item_images?.length > 1 && (
                  <>
                    {props.meal.item_images.slice(1).map((image, index) => {
                      return (
                        <React.Fragment key={index}>
                          {image.length > 0 && (
                            <Image
                              key={index}
                              alt={props.meal.item_name}
                              src={image}
                              height={300}
                              width={300}
                              className={styles.meal_section_2_image}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            <div className={styles.meal_section_2_col_2}>
              <div className={styles.meal_section_2_details}>
                <h2 className={styles.meal_section_2_name}>
                  {props.meal.item_name}
                </h2>
                <div style={{ marginTop: "-1rem", marginBottom: "-1rem" }}>
                  {Array(5)
                    .fill("_")
                    .map((_, idx) => (
                      <GoStarFill
                        key={idx + _}
                        color={
                          props.meal.average_rating > idx
                            ? "#04D505"
                            : "rgba(0,0,0,0.5)"
                        }
                      />
                    ))}
                </div>
                <div className={styles.store}>
                  <h4>Chop Chow Store</h4>
                  {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                                <div>
                                    <LocationIcon style={styles.store_icon} />
                                    <p>6391 Elgin St. Celina, Delaware 10299</p>
                                </div>

                                } */}
                </div>
                <div className={styles.meal_section_32}>
                  <div className={styles.meal_details}>
                    <div className={styles.hide}>
                      <h3>Serves: </h3>
                      <p>{props.meal.meal_servings}</p>
                    </div>
                    <div>
                      <h3>PrepTime:</h3>
                      <p>{props.meal.meal_prep_time} Minutes</p>
                    </div>
                    <div>
                      <h3>CookTime : </h3>
                      <p>{props.meal.meal_cook_time} Minutes </p>
                    </div>
                    <div>
                      <h3>Chef:</h3>
                      <p>{props.meal.meal_chef}</p>
                    </div>
                  </div>
                  <div className={styles.meal_details2}>
                    <div>
                      <h3>intro: </h3>
                      <p>{props.meal.item_intro}</p>
                    </div>
                  </div>
                </div>
                <p className={styles.meal_section_2_description}>
                  {props.meal.item_intro}
                </p>
                <div className={styles.meal_section_2_categories}>
                  <h3 className={styles.meal_section_2_category_name}>
                    Product Category
                  </h3>
                  {/* <p className={styles.meal_section_2_category}>
                                    {props.props.meal.meal_categories.length > 0 &&
                                    <>
                                    {JSON.parse(props.props.meal.meal_categories[0]).map((cat, j) => <span key={j}>{cat} &nbsp; &nbsp;</span>)}
                                    </>
                                    }
                                </p> */}
                </div>
              </div>
              {props.meal.item_available &&
                user &&
                user?.user_type !== "admin" && (
                  <div className={styles.meal_section_2_price}>
                    <h3>Price</h3>
                    <p>
                      ${props.meal.item_price}
                      <span>/piece</span>
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' && */}
          <div className={styles.section_2_footer}>
            <div className={styles.hide}>
              <p>
                <ShareIcon />
                Share this product:
              </p>
              <FacebookShareButton
                url={url + '/meal/'+ props.meal.item_name}
                quote={props.meal.item_name}
                hashtag={props.meal.item_intro}
              >
                <FacebookEIcon />
              </FacebookShareButton>
              <TwitterShareButton
                title={props.meal.item_name}
                via="ChopChowMarket"
                url={url + '/meal/'+ props.meal.item_name}
              >
                <TwitterEIcon />
              </TwitterShareButton>
              {/* <InstagramShareButton title={props.meal.item_name} url="https://www.instagram.com">
                            <InstaEIcon />
                        </InstagramShareButton> */}
              <WhatsappShareButton
                title={props.meal.item_name}
                url={url + '/meal/'+ props.meal.item_name}
              >
                <WhatsappEIcon />
              </WhatsappShareButton>
              <RedditShareButton
                title={props.meal.item_name}
                url={url + '/meal/'+ props.meal.item_name}
              >
                <RedditIcon />
              </RedditShareButton>
            </div>
            <div className={styles.hide}>
              <p>Print Preview</p>
              <PrintEIcon />
            </div>
            {props.meal.item_status?.find((ele) => ele.status === "Public") &&
              props?.auth?.authUser?.user_type !== "admin" && (
                <div className={styles.btnGroup}>
                  <div
                    className={styles.btnoutline}
                    onClick={() => {
                      setOpenList(true);
                      setSelectedItem(props?.meal);
                    }}
                  >
                    Add to Grocery List
                  </div>
                  <div className={styles.btnfill}>Add to Cart</div>
                </div>
              )}
          </div>

          {/* } */}
          <div className={styles.meal_section_3}>
            <div className={styles.meal_details}>
              <div>
                <h3>Serves: </h3>
                <div>
                  <p onClick={() => addServe(-1)}>-</p>
                  {props.meal.meal_servings}
                  <p onClick={() => addServe(1)}>+</p>
                </div>
              </div>
              <div>
                <h3>Prep time:</h3>
                <p>{props.meal.meal_prep_time} Minutes</p>
              </div>
              <div>
                <h3>Cook time : </h3>
                <p>{props.meal.meal_cook_time} Minutes </p>
              </div>
              <div>
                <h3>Chef:</h3>
                <p>{props.meal.meal_chef}</p>
              </div>
            </div>
          </div>
          {props.meal.meal_formatted_instructions && (
            <div className={styles.meal_section_4}>
              <div className={styles.ingredient_container}>
                <h3>Ingredients</h3>
                <div className={styles.ingredient_groups}>
                  <div
                    className={styles.ingredients_head}
                    style={{ backgroundColor: "transparent" }}
                  >
                    {/* {matches ? <div></div> : ""} */}
                    <div className={styles.ingredients_th}>Names</div>
                    <div
                      className={styles.ingredients_th}
                     
                    >
                      Quantity
                    </div>
                    <div className={styles.ingredients_th + " " + styles.hide}>
                      Measurement
                    </div>
                    <div
                      className={styles.ingredients_th}
                   
                    >
                      Availability in store
                    </div>
                    <div className={styles.ingredients_th}>Price</div>
                  </div>
                  <div className={styles.ingredients_body}>
                    <div className={styles.ingredients_table}>
                      <div>
                        {props.meal.ingredeints_in_item.length > 0 && (
                          <>
                            {props.meal?.ingredeints_in_item.map(
                              (ingredient, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={styles.ingredients_tr}
                                  >
                                    <td className={styles.ingredients_td}>
                                      <input name="id" type="checkbox" style={{marginRight: '20px'}} />

                                      {ingredient.item_name}
                                    </td>
                                    <td className={styles.ingredients_td}>
                                      {ingredient.item_quantity}
                                    </td>
                                    <td
                                      className={styles.td + " " + styles.hide}
                                    >
                                      {ingredient.item_measurement}
                                    </td>
                                    <div className={styles.ingredients_td}>
                                      {ingredient.product_available
                                        ? "Available"
                                        : "Unavailable"}
                                    </div>
                                    <div className={styles.ingredients_td}>
                                      ${ingredient.item_price}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.ingredient_radio}>
                  <div className={styles.ingredient_radio_option}>
                    <input
                      className={styles.ingredient_radio_radioInput}
                      type="radio"
                      id="non packaged"
                      name="meal_type"
                      value="non packaged"
                    />
                    <label
                      htmlFor="non packaged"
                      className={styles.ingredient_radio_radio_button}
                    ></label>
                    <label
                      htmlFor="non packaged"
                      className={styles.ingredient_radio_radioLabel}
                    >
                      Get all ingredient from Chopchow Official Store{" "}
                      <span className={styles.recommend}>(Recommeded)</span>
                    </label>
                  </div>
                  <div className={styles.ingredient_radio_option}>
                    <input
                      className={styles.ingredient_radio_radioInput}
                      type="radio"
                      id="packaged"
                      name="meal_type"
                      value="packaged"
                    />
                    <label
                      htmlFor="packaged"
                      className={styles.ingredient_radio_radio_button}
                    ></label>
                    <label
                      htmlFor="packaged"
                      className={styles.ingredient_radio_radioLabel}
                    >
                      Get all ingredient from this store
                    </label>
                  </div>
                </div>
                {/* {props.props.auth.authUser && props.props.auth.authUser.user_type !== 'admin' &&
                        <div className={styles.btnGroup}>
                            <div className={styles.btnoutline}>Add to Grocery List</div>
                            <div className={styles.btnfill}>Add to Cart</div>
                        </div>} */}
              </div>
            </div>
          )}
          {props.meal.formatted_instructions && (
            <div className={styles.meal_section_5}>
              <h3>Steps</h3>
              {props.meal.formatted_instructions.length > 0 && (
                <>
                  {props.meal.meal_formatted_instructions?.map(
                    (instruction, index) => {
                      num = index + 1;
                      console.log(index + 1);
                      return (
                        <div key={index} className={styles.meal_section_5_row}>
                          <div className={styles.meal_section_5_row_1}>
                            {props.meal.hasOwnProperty([
                              `meal_image_or_video_content_${Math.abs(
                                index + 1
                              )}`,
                            ]) && (
                              <Image
                                width={300}
                                height={300}
                                src={
                                  props.meal[
                                    `meal_image_or_video_content_${Math.abs(
                                      index + 1
                                    )}`
                                  ]
                                }
                                alt="home"
                                className={styles.meal_section_5_row_1}
                              />
                            )}
                          </div>
                          <div className={styles.meal_section_5_row_2}>
                            <h3 className={styles.meal_section_5_row_2_h3}>
                              {meal_formatted_instructions.title}
                            </h3>
                            <p className={styles.meal_section_5_row_2_p}>
                              {meal_formatted_instructionsinstructionSteps?.map(
                                (int) => (
                                  <> {int + ", "} </>
                                )
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </>
              )}
            </div>
          )}

          <div className={styles.meal_section_6}>
            <h3>Meal Categories</h3>
            <ul>
              {props.meal.item_categories?.length > 0 && (
                <>
                  {props.meal.item_categories.map((cat, index) => (
                    <li key={index}>{cat.category_name}</li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div id="review" className={styles.meal_section_7}>
            <h3>Tips</h3>
            <div>
              {props.meal.meal_tips && props.meal.meal_tips?.length > 0 && (
                <ul>
                  {props.meal.meal_tips.map((tip, index) => {
                    return <li key={index}>{tip}</li>;
                  })}
                </ul>
              )}
            </div>
          </div>

          {user && user?.user_type !== "admin" && (
            <div className={styles.meal_section_8}>
              <h3>Stores location</h3>
              <Stores />
            </div>
          )}

          {/* {props.props?.auth?.authUser && props.props?.auth?.authUser?.user_type !== 'admin' && */}
          <div className={styles.meal_section_8}>
            <h3>Add Review</h3>
            <Reviews
              itemId={props.meal._id}
              callback={() => props.callback()}
            />
          </div>

          <div className={styles.productcard_row}>
            <div className={styles.productcard_col_1}>
              <h3>Related Meal</h3>
            </div>
            <div className={styles.productcard_col_2}>
              <div className={styles.productcard_productcards}>
                {/* {props.meal.similar_meals.map((data, index) => {
                                return(
                                <div key={index} className={styles.productcard_productcard}>
                                    {data.meal_images && 
                                    <div className={styles.productcard_productcard_img_container}>
                                    {data.meal_images && data.meal_images.length > 0 && data.meal_images[0].length > 0 && data.meal_images[0] !== "[object HTMLImageElement]" &&
                                    <Image
                                        priority
                                        src={data.meal_images[0]}
                                        alt="Related Meal"
                                        height={500} width={500}
                                        className={styles.productcard_productcard_img}
                                    />
                                    }
                                    </div>}
                                    <div className={styles.productcard_productcard_col}>
                                        <h6 className={styles.productcard_productcard_name}>{data.meal_name}</h6>
                                        <p className={styles.productcard_productcard_duration}>
                                            {data.cook_time} min
                                        </p>
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        {/* <div className={styles.product_review_rating_icons}>
                                            {
                                                Array.from({ length: 5 }).map((i,j) => {
                                                    var rate = 4;
                                                    if((j+1) <= rate){
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon} />
                                                        )
                                                    }else{
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon2} />
                                                        )}
                                                })
                                            }
                                        </div> */}
                {/* <p className={styles.productcard_productcard_price}> */}
                {/* $666 */}
                {/* </p>
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {openList && (
        <div className={styles.modalContainer}>
          <div className={styles.modalCard3}>
            <div className={styles.flex3}>
              <h4 className={styles.addTitle}>Add Item to Grocery List</h4>
              <div onClick={() => setOpenList(false)} className={styles.round}>
                <AiOutlineClose />
              </div>
            </div>
            <div className={styles.lists}>
              {selectGrocery?.map((elem) => {
                return (
                  <div
                    onClick={() => setItemAdd({ listName: elem.listName })}
                    className={styles.list}
                  >
                    <input type="checkbox" />
                    <p>{elem.listName}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.flex} style={{ marginTop: "2rem" }}>
              <button onClick={addItemToGrocery} className={styles.btn}>
                Done
              </button>
              <button
                className={styles.outlinebtn}
                onClick={() => {
                  setOpenList(false);
                  setShow(true);
                }}
              >
                Add to New List
              </button>
            </div>
          </div>
        </div>
      )}
      {show && (
        <Modal
          addItemToGrocery={addItemToGrocery}
          details={details}
          setDetails={setDetails}
          setShow={setShow}
          show={show}
        />
      )}
    </>
  );
}

export default Meal;
