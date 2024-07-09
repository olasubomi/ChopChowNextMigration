import { useState } from 'react'
import styles from '../../../src/components/Checkout/style.module.css'
import { LocalActivity } from '@mui/icons-material';

const Delivery = () => {

    const [deliveryType, setDeliveryType] = useState();

    const changeDeliveryType = (type) => {
        setDeliveryType(type)
        console.log(type)
    }

  return (
    <div className={styles.box_subscription}>
        <p>How do you want to receieve your order?</p>
         <div>
            <label>
                <input type='radio' name='delivery' value='delivery' onChange={() => changeDeliveryType('delivery')} />
                <p>Delivery</p>
            </label>
            <label>
                <input type='radio' name='delivery' value='pick up' onChange={() => changeDeliveryType('pickUp')}  />
                <p>Pick up</p>
            </label>
        </div>
        {deliveryType === 'delivery' ? (
            <div>
                <p style={{fontWeight: 'bold'}}>Pick up address</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '1em', marginBlock: '24px'}}>
                    <img src='/assets/checkout/location.svg' />
                    <p>6391 Duncan St. Celina, Delaware 10299</p>
                </div>
                <div style={{backgroundColor : '#ddd', height : '200px'}}>

                </div>

            </div>) : (<div>
            <label>Deliver Every </label>
            <select>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>2 days time</option>
            </select>
        </div>)} 
        
        
    </div>
  )
}

export default Delivery