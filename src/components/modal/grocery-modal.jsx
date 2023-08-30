import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import styles from '../../components/modal/modal.module.css'
import { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai'
import axios from '../../util/Api';
import { toast } from 'react-toastify';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

export const GroceryModal = ({
    openModal,
    setOpenModal,
    details,
    refetch
}) => {
    const [selectedOption, setSelectedOption] = useState(null);


    const handleRadioChange = (value) => {
        setSelectedOption(value);
    };
    const targetElementRef = useRef(null);

    const handleEdit = async () => {

        try {
            const response = await axios(`/groceries/create/${details.id}`, {
                method: 'PATCH',
                data: {
                    listName: details.listName,
                    description: details.description,
                    status: selectedOption
                },


            })
            refetch()

            toast.success('Grocery list updated successfully')
            setOpenModal(!openModal)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const targetElement = targetElementRef.current;

        disableBodyScroll(targetElement)
        if (openModal && targetElement) {
            disableBodyScroll(targetElement)
        } else {
            enableBodyScroll(targetElement)
        }
    }, [openModal])

    return (
        <div className={styles.modal} ref={targetElementRef}>
            <div className={styles.modal_card2}>
                <div className={styles.flex2}>
                    <h5 className={styles.header}>Grocery List Visibilty</h5>
                    <div onClick={() => {

                        setOpenModal(false)
                    }}>
                        <AiFillCloseCircle color='#949494' size={28} />
                    </div>
                </div>

                <div>
                    <p className={styles.sub}>Control who can see your list by selecting either public or private settings.</p>
                </div>
                <div className={styles.radio}>
                    <input
                        type='radio'
                        name='private'
                        id='option1'
                        value='Private'
                        color='#F47900'
                        checked={selectedOption === "Private"}
                        onChange={() => handleRadioChange("Private")} 
                        />
                    <AiFillEyeInvisible style={{ marginLeft: '.5rem' }} />
                    <div className={styles.radiosub} >
                        <label htmlFor="option1" className={styles.radioLabel}>Private</label>
                        <p className={styles.text2}>Keep your grocery list confidential and accessible only to you.</p>
                    </div>
                </div>
                <div className={styles.radio}>
                    <input
                        type='radio'
                        name='label'
                        id='option2'
                        value='Public'
                        color='#F47900'
                        checked={selectedOption === "Public"}
                        onChange={() => handleRadioChange("Public")} />
                    <AiFillEye style={{ marginLeft: '.5rem' }} />
                    <div  className={styles.radiosub}>
                        <label htmlFor="option2" className={styles.radioLabel}>Public</label>
                        <p className={styles.text2}>Make your grocery list visible to others</p>
                    </div>
                </div>
                <button onClick={handleEdit} className={styles.button}>Done</button>
            </div>
        </div>
    )
}