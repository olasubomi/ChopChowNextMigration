import img_logo from "../../../public/assets/logos/chopchow-logo.png";
import styles from "./header.module.css";

import Link from "next/link";
import React, { useEffect, useState, useContext, useRef } from "react";
import { MobileHeader } from "../mobile/header-mobile";
import { animateScroll as scroll, scrollSpy, Events } from "react-scroll";
import { FaCheck } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";
import { IoSearchCircle, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowLeftFillIcon,
  BasketIcon,
  BasketIcon2,
  CartIcon,
  CartIcon2,
  DashBoardIcon,
  FaqIcon,
  HomeIcon,
  HomeIcon2,
  NotificationIcon,
  Order2Icon,
  Order3Icon,
  UserIcon,
  fastFoodIcon,
} from "../icons";
import { Auth } from "../auth";
import { connect, useSelector } from "react-redux";
import { getPath } from "../../actions/Common";
import { useRouter } from "next/navigation";
import { userSignOut, verifyToken, setOpenLogin } from "../../actions";
import { SimpleSnackbar } from "../../common";
import { triggerAlert } from "../../actions/";
import CartContext from "../../../pages/store/cart-context";
import Login from "../Login";
import { useAuth } from "../../context/auth.context";
import signup from "../signup";
// import profile_pic from "../assets/icons/user-icon.jpg"
import profile_pic from "../../../public/assets/icons/user.png";
import moment from "moment";
import { useMediaQuery } from "../../hooks/usemediaquery";
import { SearchDropdown } from "../dropdown/search-dropdown";
import { MobileSearch } from "../dropdown/mobile-search";
import axios from "../../util/Api";

function Header(props) {
  // const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  // const [customerId, setCustomerIdState] = useState(null);
  // const [username, setUsernameState] = useState(null);
  // const [showNotif, setshowNotifState] = useState(true);
  const { isOpen, setIsOpen } = useAuth();
  const [openLogin, setOpenLoginState] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showSignup, setShowSignUp] = useState(false);
  const { authUser } = useSelector((state) => state.Auth);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const cartCtx = useContext(CartContext);
  const matches = useMediaQuery("(min-width: 1025px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { items } = cartCtx;
  const [activeNav, setActiveNav] = useState(0);

  const handleSetActiveNav = (id, path) => {
    setActiveNav(id);
    router.push(path);
  };

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  console.log(notifications, "notific0ppjations");
  // useEffect(() => {
  //   props.getPath(router.pathname);
  //   let token = localStorage.getItem("x-auth-token");
  //   let time = localStorage.getItem("in");
  //   if (token !== null && time !== null) {
  //     const msInMinute = 60 * 1000;
  //     let min = Math.abs(Date.now() - time) / msInMinute;
  //     if (min > 30) {
  //       localStorage.removeItem("x-auth-token");
  //       localStorage.removeItem("in");
  //       localStorage.removeItem("user");
  //     } else {
  //       let user = JSON.parse(localStorage.getItem("user"));
  //       props.verifyToken(user, token);
  //     }
  //   } else {
  //     localStorage.removeItem("x-auth-token");
  //     localStorage.removeItem("in");
  //     localStorage.removeItem("user");
  //   }
  // }, []);

  // function updateLogInStatus(customerId, username) {
  //   console.log("updates log in status before");
  //   setIsAuthenticatedState(true);
  //   setCustomerIdState(customerId);
  //   setUsernameState(username);

  //   setIsAuthenticatedState(true);
  //   setCustomerIdState(customerId);
  //   setUsernameState(username);
  // }

  //////////////////////////////////////////////////////////////////////
  // CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  //   <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
  //     {children}
  //     &#x25bc;
  //   </a>
  // ));
  //////////////////////////////////////////////////////////////////////
  // function handleLogout(e) {
  //   if (e === "6") {
  //     //clear cookie cache
  //     // useEffect(() => {
  //     // You now have access to `window`
  //     // window.localStorage.setItem("userToken", null);
  //     // window.localStorage.setItem("userRole", null);
  //     // }, [])

  //     // var url = "/api/logout";
  //     var url = `https://chopchowserver.vercel.app/api/logout`;

  //     fetch(url, {
  //       method: "GET",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         response.json().then((res) => {
  //           console.log("logout response is:");
  //           console.log(res);
  //           console.log("should print body");
  //           console.log(res.data);
  //           if (res.data === "success") {
  //             console.log("comes to turn off authentication state");
  //             setIsAuthenticatedState(false);
  //           }
  //         });
  //       })
  //       .catch((err) => {
  //         console.log("fails to authenticate app page");
  //         console.log(err);
  //       });

  //     setIsAuthenticatedState(false);
  //     window.location.reload(false);
  //   } else if (e === "4") {
  //     // this.props.history.push('/SuggestMeal');
  //   }
  // }

  // function handleDashborad() {
  //   // this.props.history.push('/admin');
  // }
  const updateNotification = async (id) => {
    try {
      const response = await axios.patch(`/user/notification/${id}`);

      getAllNotifications();
    } catch (err) {
      console.log(`Error updating notification with ID ${id}:`, err);
    }
  };
  function toggleNotification(e) {
    const notification = document.getElementById("notification");

    if (notification.style.display === "grid") {
      notification.style.display = "none";
    } else {
      notification.style.display = "grid";
    }
    e.stopPropagation();
  }

  document.addEventListener("click", () => {
    const notification = document.getElementById("notification");

    if (notification) {
      notification.style.display = "none";
    }
  });

  const getOneItemById = async (id, commentId) => {
    try {
      console.log(id);
      const response = await axios.get(`/items/item/${id}`);
      const data = Array.isArray(response.data?.data)
        ? response.data?.data[0]
        : {};
      console.log(response.data);
      if (data?.item_name) {
        router.push(
          `/${data?.item_type === "Meal" ? "meal" : "product"}/${
            data?.item_name
          }?id=${commentId}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // function toggleUserDetails(e) {
  //   document.getElementById("userdetails").style.display = "grid";
  //   document.addEventListener("click", (e) => {
  //     if (document.getElementById("userdetails")) {
  //       if (
  //         e.target.id !== "userImg" &&
  //         e.target.id !== "usericon" &&
  //         e.target.id !== "userName"
  //       )
  //         document.getElementById("userdetails").style.display = "none";
  //     }
  //   });

  //   window.event.returnValue = false;
  // }
  const dropdownRef = useRef(null);
  const toggleUserDetails = () => {
    if (!openUserDetails || dropdownRef.current === event.target) {
      setOpenUserDetails(!openUserDetails);
    }
    console.log("hello");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenUserDetails(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  function toggleLogin() {
    setOpenLoginState(!openLogin);
  }
  console.log(user, "userr");
  const menu = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon2 color={activeNav === 0 ? "#F47900" : "#6D6D6D"} />,
    },
    {
      name: "Order",
      path: "/dashboard/orders/orders",
      icon: <Order3Icon color={activeNav === 1 ? "#F47900" : "#6D6D6D"} />,
    },
    {
      name: "Grocery List",
      path: "/grocery",
      icon: <BasketIcon2 color={activeNav === 2 ? "#F47900" : "#6D6D6D"} />,
    },
    {
      name: "Cart",
      path: "#",
      icon: <CartIcon2 color={activeNav === 3 ? "#F47900" : "#6D6D6D"} />,
    },
  ];
  function logout() {
    props.logout();
    router.push("/");
  }
  const unreadMessages = notifications.filter((message) => !message.read);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user" || "{}"));
    setUser(user);
    console.log(user, "user");
  }, []);

  const getAllNotifications = async () => {
    try {
      const response = await axios.get(`/user/notifications`);
      setNotifications(response.data.data);
      console.log(response.data.data, "noti");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllNotifications();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <>
      <div className={styles.navbar}>
        {/* <div className="alert">
          {props.message.length > 0 &&
          <div className="alert-success">
            {props.message}
          </div>}
        {props.error.length > 0 &&
          <div className="alert-danger">
            {props.error}
          </div>}
        </div> */}
        <div className={styles.navbar_top_container}>
          <div className={styles.navbar_top}>
            <div className={styles.navbar_top_logo_search}>
              <Link href="/">
                <Image
                  className={styles.navbar_top_logo_img}
                  src={img_logo}
                  alt="logo"
                />
              </Link>
              <div className={styles.searchbar}>
                <MobileSearch setShowDropdown={setShowDropdown} />
              </div>
            </div>
            <div className={styles.navbar_top_details}>
              <div className={styles.searchIcon}>
                <IoSearchOutline color="rgba(244, 121, 0, 1)" size={20} />
              </div>
              {!props.auth.isAuthenticated && authUser === null ? (
                <Link legacyBehavior href="/login">
                  <a className={styles.navbar_user_loginbtn}>Log In/Register</a>
                </Link>
              ) : (
                <div className={styles.navbar_user_info} ref={dropdownRef}>
                  {authUser?.profile_picture !== "" &&
                  authUser?.profile_picture !== undefined ? (
                    <div onClick={toggleUserDetails}>
                      {" "}
                      <Image
                        id="userImg"
                        width={34}
                        height={34}
                        src={authUser?.profile_picture}
                        alt={props?.auth?.authUser?.username}
                        className={styles.navbar_user_img}
                      />
                    </div>
                  ) : (
                    <div onClick={toggleUserDetails}>
                      <UserIcon style={styles.navbar_user_img} />
                    </div>
                  )}

                  <h4
                    onClick={toggleUserDetails}
                    id="userName"
                    className={styles.navbar_user_name}
                  >
                    {props?.auth?.authUser?.username}
                  </h4>
                  <div
                    onClick={toggleUserDetails}
                    style={{ marginTop: "-1rem" }}
                  >
                    <ArrowDownIcon
                      id="usericon"
                      style={styles.navbar_user_icon}
                    />
                  </div>

                  {openUserDetails && (
                    <div className={styles.userdetails}>
                      <Link href="/dashboard">
                        <div
                          className={
                            styles.navbar_user_signedin_link +
                            " " +
                            styles.black
                          }
                        >
                          <DashBoardIcon style={styles.navbar_main_link_icon} />
                          <h3>Dashboard</h3>
                        </div>
                      </Link>

                      <Link href="/dashboard/userprofile">
                        <div
                          className={
                            styles.navbar_user_signedin_link +
                            " " +
                            styles.black
                          }
                        >
                          <UserIcon style={styles.navbar_main_link_icon} />
                          <h3>Profile</h3>
                        </div>
                      </Link>
                      <Link href="/suggestmeal">
                        <div
                          className={
                            styles.navbar_user_signedin_link +
                            " " +
                            styles.black
                          }
                          style={{ marginTop: "-1rem", alignItems: "center" }}
                        >
                          {/* <Image src={openIcon} alt="profile" /> */}
                          <div className={styles.navbar_main_link_icon}>
                            <img src="/assets/icons/fastfood.svg" />
                          </div>
                          <h3>Suggest A Meal</h3>
                        </div>
                      </Link>
                      <div className={styles.navbar_user_signedin_logout}>
                        <div>
                          <div
                            onClick={logout}
                            className={
                              styles.navbar_user_signedin_link +
                              " " +
                              styles.white
                            }
                          >
                            <ArrowLeftFillIcon
                              style={styles.navbar_main_link_icon2}
                            />
                            <h3>Logout</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button className={styles.navbar_user_upgradebtn}>
                Subscribe
              </button>
              <div className={styles.navbar_top_details_col}>
                {matches ? (
                  <>
                    {!props.auth.isAuthenticated && authUser === null ? (
                      ""
                    ) : (
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                        }}
                      >
                        <div
                          id="noticon"
                          onClick={(e) => toggleNotification(e)}
                        >
                          <NotificationIcon
                            id="notImg"
                            style={styles.navbar_top_details_col_icon}
                          />
                        </div>
                        <h5
                          id="notText"
                          style={{
                            cursor: "pointer",
                          }}
                          className={styles.notitext}
                          onClick={(e) => toggleNotification(e)}
                        >
                          Notification
                        </h5>
                        <span id="notNo" className={styles.numberofitems}>
                          {unreadMessages?.length}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    {!props.auth.isAuthenticated && authUser === null ? (
                      ""
                    ) : (
                      <div style={{ position: "relative", display: "flex" }}>
                        <Link href="/notification">
                          <NotificationIcon
                            id="notImg"
                            style={styles.navbar_top_details_col_icon}
                          />
                        </Link>
                        <span
                          id="notNo"
                          style={{ marginLeft: "2px" }}
                          className={styles.numberofitems}
                        >
                          {unreadMessages?.length}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div>
                  {matches ? (
                    <>
                      {!props.auth.isAuthenticated && authUser === null ? (
                        ""
                      ) : (
                        <div style={{ display: "flex" }}>
                          <div>
                            <CartIcon
                              id="notImg"
                              style={styles.navbar_top_details_col_icon2}
                            />
                          </div>
                          <h5
                            style={{ marginLeft: "2px" }}
                            className={styles.notitext}
                          >
                            Cart
                          </h5>

                          <span
                            className={styles.numberofitems}
                            id="notNo"
                            style={{
                              position: "relative",
                              right: "2px",
                            }}
                          >
                            0
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {!props.auth.isAuthenticated && authUser === null ? (
                        ""
                      ) : (
                        <div className={styles.show}>
                          <div>
                            <CartIcon
                              id="notImg"
                              style={styles.navbar_top_details_col_icon2}
                            />
                          </div>

                          <span
                            className={styles.numberofitems}
                            id="notNo"
                            style={{
                              position: "relative",
                              right: "2px",
                            }}
                          >
                            0
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={styles.show}>
                  <div>
                    <FaqIcon />
                  </div>
                  <h5 style={{}} className={styles.notitext}>
                    FAQ
                  </h5>
                </div>
                <div id="notification" className={styles.summaries_min}>
                  <div className={styles.summary_min}>
                    <div className={styles.summary_min_head}>
                      <h3 className={styles.summary_min_h3}>Notification</h3>
                    </div>
                    <div className={styles.summary_min_notifications}>
                      <div className={styles.not}>
                        {[...notifications]
                          ?.sort(
                            (a, b) =>
                              new Date(b.createdAt).getTime() -
                              new Date(a.createdAt).getTime()
                          )
                          ?.map((elem) => (
                            <div
                              style={{ cursor: "pointer" }}
                              className={styles.summary_notification}
                              onClick={() => {
                                if (elem.message.includes("Suggested Meal")) {
                                  updateNotification(elem._id);
                                  router.push("/dashboard/suggestedmeals");
                                } else {
                                  getOneItemById(
                                    elem?.notifiable?.item,
                                    elem?.notifiable?._id
                                  );
                                }
                              }}
                            >
                              {elem.message.includes("Suggested Meal") ? (
                                <div className={styles.rounded}>
                                  <FaCheck color="black" size={14} />
                                </div>
                              ) : (
                                <div className={styles.rounded2}>
                                  <RiMessage2Fill size={15} color="#FFF" />
                                </div>
                              )}
                              <div
                                className={styles.summary_notification_Details}
                              >
                                <h3
                                  className={styles.summary_notification_desc}
                                >
                                  {elem.message}
                                </h3>
                                <p className={styles.summary_notification_link}>
                                  {elem.message.includes("Suggested Meal") ? (
                                    <p onClick={() => {}}>View Item</p>
                                  ) : (
                                    <p>View Comment</p>
                                  )}
                                </p>
                                <p className={styles.summary_notification_time}>
                                  {moment(elem.createdAt).fromNow()}
                                </p>
                              </div>
                              <div
                                className={
                                  !elem.read ? styles.readDot : styles.readDot2
                                }
                              />
                            </div>
                          ))}
                      </div>

                      <div className={styles.navbar_top_details_col}>
                        <div id="notification" className={styles.summaries_min}>
                          <div className={styles.summary_min}>
                            <div className={styles.summary_min_head}>
                              <h3 className={styles.summary_min_h3}>
                                Notification
                              </h3>
                            </div>
                            <div className={styles.summary_min_notifications}>
                              <div className={styles.summary_notification}>
                                <div className={styles.tick}>
                                  <FaCheck />
                                </div>
                                <div
                                  className={
                                    styles.summary_notification_Details
                                  }
                                >
                                  <h3
                                    className={styles.summary_notification_desc}
                                  ></h3>
                                  <p
                                    className={styles.summary_notification_time}
                                  ></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {matches ? (
                ""
              ) : (
                <div
                  className={
                    visible ? styles.navbar_down : styles.navbar_down_2
                  }
                >
                  {menu.map((item, id) => (
                    <div
                      className={
                        activeNav === id ? styles.activeOne : styles.links
                      }
                      onClick={() => handleSetActiveNav(id, item.path)}
                    >
                      <div className={styles.navbar_down_col_icon}>
                        {item.icon}
                      </div>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* {isOpen && <Auth />} */}
      </div>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getPath: (path) => dispatch(getPath(path)),
    setOpenLogin: (login) => dispatch(setOpenLogin(login)),

    logout: () => dispatch(userSignOut()),
    verifyToken: (user, token) => dispatch(verifyToken(user, token)),
    resetSnack: (showSnack, snackMessage) =>
      dispatch(triggerAlert({ snackMessage, showSnack })),
  };
}

function mapStateToProp(state) {
  return {
    path: state.Common.path,
    auth: state.Auth,
    openLogin: state.Auth.openLogin,
    error: state.Common.error,
    message: state.Common.message,
    showSnack: state?.Common?.showSnack,
    snackMessage: state?.Common?.snackMessage,
    snackDuration: state?.Common?.snackDuration,
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Header);

export function Header2() {
  const router = useRouter();
  const matches = useMediaQuery("(min-width: 900px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const [activeLink, setActiveLink] = useState(0);

  const handleSetActive = (id, path) => {
    setActiveLink(id);
    router.push(path);
  };

  const menuItems = [
    { name: "Marketplace", path: "/publicMarket" },
    { name: "Chefs", path: "/chef" },
    { name: "Blog", path: "#" },
  ];

  return (
    <>
      {matches ? (
        <div className={styles.navbar2}>
          <div className={styles.navbar_main_container}>
            <div className={styles.navbar_main}>
              <ul className={styles.navbar_main_links}>
                {menuItems?.map((elem, id) => (
                  <li
                    className={styles.navbar_main_link}
                    key={id}
                    onClick={() => handleSetActive(id, elem.path)}
                  >
                    <p
                      className={
                        activeLink === id
                          ? styles.activelink
                          : styles.inactivelink
                      }
                    >
                      {elem.name}
                    </p>
                  </li>
                ))}
              </ul>

              <div className={styles.navbar_main_grocery}>
                {/* <div
                  style={{ cursor: "pointer" }}
                  className={styles.flex}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <IoSearchOutline size={19} color="#F47900" />
                  <p>Search</p>
                </div> */}
                <Link className={styles.link} href="/suggestmeal">
                  Suggest a Meal
                </Link>
                <Link className={styles.link} href="/grocery">
                  Grocery List
                </Link>
              </div>
            </div>
          </div>
          {/* {showDropdown && <SearchDropdown setShowDropdown={setShowDropdown} />} */}
        </div>
      ) : isLandscape ? (
        <MobileHeader />
      ) : (
        <MobileHeader />
      )}
    </>
  );
}

// className={styles.navbar_user_signedin}
