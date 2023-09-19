import Image from "next/image"
import { IoMdCloseCircle } from "react-icons/io"
import styles from '../grocery/grocery.module.css'
import { CardDropdown } from "../dropdown/dropdown"
import { useMediaQuery } from "../../hooks/usemediaquery"
import Frame from '../../../public/assets/logos/Frame.png'

export const MobileTable = ({ itemList, deleteItemFromGrocery, toggle, addItemsToCart, cartHasItem, open, setOpen }) => {
    const matches = useMediaQuery('(min-width: 920px)')

    return (
        <table className={styles.table2}>
            <tbody style={{ height: '100%', width: '100%' }}>
                {
                    itemList?.groceryItems?.map((element, idx) => (
                        <>
                            {
                                !element.hasOwnProperty('itemData') ?
                                    <tr key={element?._id} className={styles.tr2}>
                                        <td className={styles.td}>
                                            <input
                                                name={element?.item?.item_name}
                                                value={element?.item?.item_name}
                                                checked={cartHasItem(element.item)}
                                                onChange={(e) => {
                                                    addItemsToCart(element.item, true)
                                                }}
                                                type='checkbox' className={styles.check1} />

                                        </td>

                                        <td className={styles.td2} style={{ cursor: 'pointer', paddingRight: '2rem' }}>
                                            <div style={{ width: '30%' }}>
                                                {
                                                    element?.item?.itemImage0 &&
                                                        <Image src={element?.item?.itemImage0} height={50} width={55} />
                                                }
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: '.4rem', marginTop: '-.7rem', width: '70%' }}>
                                                <p onClick={() => {
                                                    console.log(element, 'elements')
                                                    toggle(element)
                                                }}>{element.item.item_name}</p>
                                                <p className={styles.supplier}>
                                                    <p style={{ color: 'rgba(109, 109, 109, 1)', marginRight: '.3rem' }}>Supplier: </p>
                                                    {element?.item?.store_name ? element?.item?.store_name : '-'}
                                                </p>
                                                {
                                                    element.item.item_type === 'Meal' ?
                                                        <div>
                                                            {
                                                                matches ?
                                                                    <p className={styles.ingredients} onClick={() => {

                                                                        setOpen({
                                                                            id: element._id,
                                                                            isOpen: !open.isOpen
                                                                        })
                                                                    }}>
                                                                        Include Ingredients
                                                                    </p>
                                                                    :
                                                                    <p className={styles.ingredients} onClick={() => {

                                                                        setOpen({
                                                                            id: element._id,
                                                                            isOpen: !open.isOpen
                                                                        })
                                                                    }}>
                                                                        Ingredients
                                                                    </p>
                                                            }

                                                            {open.isOpen && element._id === open.id &&
                                                                <CardDropdown element={element} />
                                                            }
                                                        </div>
                                                        : <div></div>
                                                }
                                            </div>
                                        </td>
                                        <td className={styles.td} style={{ textAlign: 'center' }}>{element?.quantity} {element?.measurement?.measurement_name}</td>
                                        <td className={styles.td}>{element?.item?.item_price ? `$${element?.item?.item_price}` : 'N/A'}</td>
                                        <td onClick={() => deleteItemFromGrocery(element._id)} className={styles.td} style={{ textAlign: 'center' }}><IoMdCloseCircle className={styles.close} color='#949494' /></td>
                                    </tr> :
                                    <tr key={element?.itemData?._id} className={styles.tr2}>
                                        <td className={styles.td}>
                                            <input type='checkbox' className={styles.check1} />
                                        </td>
                                        <td className={styles.td2} style={{ cursor: 'pointer', paddingRight: '2rem' }}>
                                            <div style={{ width: '30%' }}>
                                                <Image src={Frame} height={50} width={55} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: '.4rem', width: '70%' }}>
                                                <p>{element?.itemData?.item_name}</p>
                                            </div>
                                        </td>
                                        <td className={styles.td} style={{ textAlign: 'center' }}>-</td>
                                        <td className={styles.td}>N/A</td>
                                        <td onClick={() => deleteItemFromGrocery(element._id)} className={styles.td} style={{ textAlign: 'center' }}><IoMdCloseCircle className={styles.close} color='#949494' /></td>
                                    </tr>
                            }
                        </>
                    ))
                }
            </tbody>
        </table>

    )
}