import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from './stores.module.css'
import { GoStarFill } from "react-icons/go"

export const PopularMeals = () => {
    const [meals, setMeals] = useState([])

    const fetchMeals = async () => {
        try {
            const response = await axios(`/items/1?type=Meal&status=all&limit=50`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.items, 'ress')
            setMeals(response.data.data.items)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchMeals()
    }, [])

    const filteredMeals = meals.filter(meal => meal.item_type === 'Meal');

    return (
        <div className={styles.mealContainer}>
            <h4>Popular Meals</h4>
            <div className={styles.stores2}>
                {
                    filteredMeals.slice(0, 20).filter(meal =>  Boolean(meal.total_rating)  ).map((meal, idx) => {
                        return (
                            <div className={styles.card1} key={idx}>
                                {

                                        <div className={styles.box}>
                                            <img src={meal?.itemImage0} className={styles.storeImg1} />
                                            <div className={styles.flex}>
                                                <p className={styles.name2}>{meal.item_name}</p>
                                                <p>$8.43</p>
                                            </div>
                                            <p className={styles.storeName}>Chop Chow Official Store</p>
                                            <div className={styles.flex}>
                                                <div>
                                                    {
                                                        Array(5).fill('_').map((_, idx) => <GoStarFill key={idx + _} color={meal.average_rating > idx ? '#04D505' : 'rgba(0,0,0,0.5)'} style={{ marginLeft: '.2rem' }} />)
                                                    }
                                                </div>
                                                <p className={styles.prep}> 23 mins </p>
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
          
            </div>
            <p className={styles.view}>View More</p>
                <div className={styles.border} />
        </div>
    )
}