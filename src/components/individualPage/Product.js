import React from "react";
import styles from "./product.module.css";

import Head from "next/head";
import img_logo from "../../../public/assets/logos/sezzle.png"
import Image from "next/image";
import { FacebookEIcon, InstaEIcon, LocationIcon, PrintEIcon, ShareIcon, StarIcon, TwitterEIcon, WhatsappEIcon } from "../icons";
import Stores from "./stores";
import Reviews from "./Reviews";
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

function Product(props){
    console.log(props.product)
    const router = window.location
    return (
        <>
            <Head>
                <title>Product</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.product_sections}>
                
                <div className={styles.product_section_2}>
                    <div className={styles.product_section_2_col_1}>
                        {props.product.product_images.length > 0 ?
                            <Image
                                src={props.product.product_images[0]}
                                alt={props.product.product_name}
                                className={styles.product_section_2_main_img}
                                height={500} width={500}
                            />:
                            <span></span>
                        }
                        <div className={styles.product_section_2_images}>
                            {props.product.product_images.length > 1 &&
                                <>
                                {props.product.product_images.slice(1).map((image, index) => {
                                    <Image key={index} alt={props.product.product_name} src={image}
                                        height={200} width={200}
                                        className={styles.product_section_2_image} />
                                    })
                                }
                                </>
                            }

                        </div>
                    </div>
                    <div className={styles.product_section_2_col_2}>
                        <div className={styles.product_section_2_details}>
                            <h2 className={styles.product_section_2_name}>{props.product.product_name}</h2>
                            <div className={styles.store}>
                                <h4>Chop Chow Store</h4>
                                <div>
                                    <LocationIcon style={styles.store_icon} />
                                    <p>6391 Elgin St. Celina, Delaware 10299</p>
                                </div>
                            </div>
                            <p className={styles.product_section_2_description}>
                                {props.product.product_name}
                            </p>
                            <div className={styles.product_section_2_details_col}>
                                <div className={styles.product_section_2_categories}>
                                    <h3 className={styles.product_section_2_category_name}>Category</h3>
                                    <p className={styles.product_section_2_category}>{props.product.product_categories.map((cat, j) => <span key={j}>{cat} &nbsp; &nbsp;</span>)}</p>
                                </div>
                                <div className={styles.product_section_2_categories}>
                                    <h3 className={styles.product_section_2_category_name}>Product size</h3>
                                    <p className={styles.product_section_2_category}>rewrg fvdsvsd</p>
                                </div>

                                <div className={styles.product_section_2_categories}>
                                    <h3 className={styles.product_section_2_category_name}>Quantity</h3>
                                    {/* <p className={styles.product_section_2_category}>rewrg fvdsvsd</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.product_section_2_price}>
                            <h3>Price</h3>
                            <p>$7.65<span>/piece</span></p>
                        </div>
                    </div>
                </div>
                <div className={styles.section_2_footer}>
                    <div>
                        <p><ShareIcon />Share this product:</p>
                        <FacebookShareButton>
                            <FacebookEIcon quote={props.product.product_name} url={router.href} />
                        </FacebookShareButton>
                        <TwitterShareButton title={props.product.product_name} url={router.href}>
                            <TwitterEIcon />
                        </TwitterShareButton>
                        <InstapaperShareButton title={props.product.product_name} url={router.href}>
                            <InstaEIcon />
                        </InstapaperShareButton>
                        <WhatsappShareButton title={props.product.product_name} url={router.href} >
                            <WhatsappEIcon />
                        </WhatsappShareButton> 
                    </div>
                    <div>
                        <p>Print Preview</p>
                        <PrintEIcon />
                    </div>
                    <div className={styles.btnGroup}>
                        <div className={styles.btnoutline}>Add to Grocery List</div>
                        <div className={styles.btnfill}>Add to Cart</div>
                    </div>
                </div>

                <div className={styles.productcard_row}>
                    <div className={styles.productcard_col_1}>
                        <h3>Featured In</h3>
                    </div>
                    <div className={styles.productcard_col_2}>
                        <div className={styles.productcard_productcards}>
                            {new Array(1,2,3,4,5,6,7,8).map((data, index) => {
                                return(
                                <div key={index} className={styles.productcard_productcard}>
                                    <div className={styles.productcard_productcard_img_container}>

                                    <Image
                                        priority
                                        src={img_logo}
                                        alt="Store"
                                        className={styles.productcard_productcard_img}
                                    />
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        <h6 className={styles.productcard_productcard_name}>TagIcon</h6>
                                        <p className={styles.productcard_productcard_duration}>
                                            7 min
                                        </p>
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        <div className={styles.product_review_rating_icons}>
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
                                        </div>
                                        <p className={styles.productcard_productcard_price}>
                                            $666
                                        </p>
                                    </div>
                                </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.product_section_8}>
                    <h3>Stores location</h3>
                    <Stores />
                </div>

                <div className={styles.product_section_8}>
                    <h3>Add Review</h3>
                    <Reviews />
                </div>

                <div className={styles.productcard_row}>
                    <div className={styles.productcard_col_1}>
                        <h3>People Also Like</h3>
                    </div>
                    <div className={styles.productcard_col_2}>
                        <div className={styles.productcard_productcards}>
                            {new Array(1,2,3,4,5).map((data, index) => {
                                return(
                                <div key={index} className={styles.productcard_productcard}>
                                    <div className={styles.productcard_productcard_img_container2}>

                                    <Image
                                        priority
                                        src={img_logo}
                                        alt="Store"
                                        className={styles.productcard_productcard_img}
                                    />
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        <h6 className={styles.productcard_productcard_name}>TagIcon</h6>
                                    </div>
                                    <p>Chop Chow Official Store</p>
                                    <div className={styles.productcard_productcard_col}>
                                        <div className={styles.product_review_rating_icons}>
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
                                        </div>
                                        <p className={styles.productcard_productcard_duration}>
                                            7min
                                        </p>
                                    </div>
                                </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;