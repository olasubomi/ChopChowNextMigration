
import Header from '../../src/components/Header/Header';
import SideNav from '../../src/components/Header/sidenav';
import {container, col2, left, empty, center, status, approve, pending, rejected, actionIcon } from '../../src/components/dashboard/dashboard.module.css'
import styles from '../../src/components/dashboard/suggestedmeals.module.css'
import { CloseFillIcon, FillterIcon } from '../../src/components/icons';
import Link from 'next/link';
import Sidenav2 from '../../src/components/Header/sidenav2';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import axios from '../../src/util/Api';
import Meal from '../../src/components/individualPage/Meal';
import WestIcon from '@mui/icons-material/West';
import TransferToInventory from '../../src/components/dashboard/transferToInventory';
import SuggestedMealRow from '../../src/components/dashboard/suggestedmealRow';
import Sent from '../../src/components/dashboard/sent';
import Popup2 from '../../src/components/popups/popup2';
import Popup1 from '../../src/components/popups/popup1';
import Product from '../../src/components/individualPage/Product';

const SuggestedMeals = (props) => {
    const router = useRouter()
    const [addPublicMeal, setAddPublicMeal] = useState()
    const [searchType, setSearchType] = useState('Meal')
    const [searchOption, setSearchOption] = useState()
    const [search, setSearchState] = useState(false)
    const [showReason, setShowReasonState] = useState(false)
    const [suggestions, setSuggestionsState] = useState([])
    const [publicSuggestions, setPublicSuggestionsState] = useState([])
    const [suggestion, setSuggestionState] = useState({})
    const [filteredSuggestions, setFilteredSuggestionsState] = useState([])
    const [searchSuggestedSuggestion, setSearchSuggestedSuggestionState] = useState('')
    const [openSuggestion, setOpenSuggestionState] = useState(false)
    const [changeStatus, setChangeStatusState] = useState(false)
    const [transferToInventory, setTransferToInventoryState] = useState(false)
    const [sent, setSentState] = useState(false)
    const [openModal, setOpenModalState] = useState(false)
    const [openModal2, setOpenModal2State] = useState(false)
    const [statusType, setStatusTypeState] = useState('')
    const [page, setPageState] = useState(1);
    const [pages, setPagesState] = useState(1);
    const [ingredientsStringSyntax, setIngredientsString] = useState([]);
    const [suggestionCount, setSuggestedCountState] = useState(0);
    const [status2, setStatus2State] = useState('');
    const [message, setMessageState] = useState('');
    

    useEffect(() => {
        if(props.auth.authUser){
            let url
            if(props.auth.authUser.user_type === 'admin'){
                url ='/meals/get-meals/'+page
            }else{
                url = '/meals/get-meals/'+page+'?user='+props.auth.authUser._id
            }

            axios.get(url).then(data => {
                console.log(data.data)
                if(data.data.data){
                    
                    setSuggestedCountState(data.data.data.count)
                    if(data.data.data.count > 10){
                        setPagesState(Math.ceil(data.data.data.count/10))
                    }
                    if(searchType === 'Meal'){
                        setFilteredSuggestionsState(data.data.data.meals)
                        setSuggestionsState(data.data.data.meals)
                    }else{
                        setFilteredSuggestionsState(data.data.data.products)
                        setSuggestionsState(data.data.data.products)
                    }
                }
            })
        }
      }, [props.auth]);

    function togglePublicMeal(){
        setAddPublicMeal(!addPublicMeal)
    }

    function handleSearchType (type){
        setSearchType(type)
        toggleSearchOption()
    }

    function handleSearchType2 (type){
        setSearchType(type)
        setPageState(1)
        let url
        if(type === 'Meal'){
            if(props.auth.authUser.user_type === 'admin'){
                url = '/meals/get-meals/1'
            }else{
                url = '/meals/get-meals/1?user='+props.auth.authUser._id
            }
        }else{
            if(props.auth.authUser.user_type === 'admin'){
                url = '/products/get-all-products/1'
            }else{
                url = '/products/get-all-products/1?user='+props.auth.authUser._id
            }
        }
        axios.get(url).then(data => {
            console.log(data.data)
            if(data.data.data){
                
                setSuggestedCountState(data.data.data.count)
                if(data.data.data.count > 10){
                    setPagesState(Math.ceil(data.data.data.count/10))
                }
                if(type === 'Meal'){
                    setFilteredSuggestionsState(data.data.data.meals)
                    setSuggestionsState(data.data.data.meals)
                }else{
                    setFilteredSuggestionsState(data.data.data.products)
                    setSuggestionsState(data.data.data.products)
                }
            }
        })
    }

    function toggleSearchOption(){
        setSearchOption(!searchOption)
    }

    function handleSearch(e){
        setSearchSuggestedSuggestionState(e.target.value);
        
      };
    
      function searchSuggested(e) {
        let url
        if(searchType === 'Meal'){
            if(props.auth.authUser.user_type === 'admin'){
                url = '/meals/get-meals/1?meal_name='+searchSuggestedSuggestion
            }else{
                url = '/meals/get-meals/1?user='+props.auth.authUser._id+'&meal_name='+searchSuggestedSuggestion
            }
        }else{
            if(props.auth.authUser.user_type === 'admin'){
                url = '/products/get-all-products/1?product_name='+searchSuggestedSuggestion
            }else{
                url = '/products/get-all-products/1?user='+props.auth.authUser._id+'&product_name='+searchSuggestedSuggestion
            }
        }
        let url2
        if(searchType === 'Meal'){
            if(props.auth.authUser.user_type === 'admin'){
                url2 = '/meals/get-meals/1'
            }else{
                url2 = '/meals/get-meals/1?user='+props.auth.authUser._id
            }
        }else{
            if(props.auth.authUser.user_type === 'admin'){
                url2 = '/products/get-all-products/1'
            }else{
                url2 = '/products/get-all-products/1?user='+props.auth.authUser._id
            }
        }
        if(e.keyCode){
          if(e.keyCode === 13){
            if(searchSuggestedSuggestion.length>=1){
                axios.get(url).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        
                        setSuggestedCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        if(searchType === 'Meal'){
                            setFilteredSuggestionsState(data.data.data.meals)
                            setSuggestionsState(data.data.data.meals)
                        }else{
                            setFilteredSuggestionsState(data.data.data.products)
                            setSuggestionsState(data.data.data.products)
                        }
                    }
                })
            }else{
                axios.get(url2).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        
                        setSuggestedCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        if(searchType === 'Meal'){
                            setFilteredSuggestionsState(data.data.data.meals)
                            setSuggestionsState(data.data.data.meals)
                        }else{
                            setFilteredSuggestionsState(data.data.data.products)
                            setSuggestionsState(data.data.data.products)
                        }
                    }
                })
            }
          }
        }else{
            if(searchSuggestedSuggestion.length>=1){
                axios.get(url).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        
                        setSuggestedCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        if(searchType === 'Meal'){
                            setFilteredSuggestionsState(data.data.data.meals)
                            setSuggestionsState(data.data.data.meals)
                        }else{
                            setFilteredSuggestionsState(data.data.data.products)
                            setSuggestionsState(data.data.data.products)
                        }
                    }
                })
            }else{
                axios.get(url2).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        
                        setSuggestedCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        if(searchType === 'Meal'){
                            setFilteredSuggestionsState(data.data.data.meals)
                            setSuggestionsState(data.data.data.meals)
                        }else{
                            setFilteredSuggestionsState(data.data.data.products)
                            setSuggestionsState(data.data.data.products)
                        }
                    }
                })
            }
        }
      };

    function toggleSearch(){
        setSearchState(!search);
    };

    function toggleShowReason(){
        setShowReasonState(!showReason)
    }

    function toggleOpenMeal(meal){
        setSuggestionState(meal)
        setOpenSuggestionState(true)
    }

    function closeSuggestion(){
        setOpenSuggestionState(false)
    }

    function toggleChangeStatus(){
        setChangeStatusState(!changeStatus)
    }

    function handleStatusType(type) {
        setStatusTypeState(type)
        let url1
        if(searchType === 'Meal'){
            url1 = '/meals/update/'
        }else{
            url1 = '/products/update/'
        }
        axios.post(url1+suggestion._id, {publicly_available: type}).then(res => {
            if(res.data.data){
                setSuggestionState(res.data.data)
                let url2
                if(searchType === 'Meal'){
                    if(props.auth.authUser.user_type === 'admin'){
                        url2 = '/meals/get-meals/1'
                    }else{
                        url2 = '/meals/get-meals/1?user='+props.auth.authUser._id
                    }
                }else{
                    if(props.auth.authUser.user_type === 'admin'){
                        url2 = '/products/get-all-products/1'
                    }else{
                        url2 = '/products/get-all-products/1?user='+props.auth.authUser._id
                    }
                }
                axios.get(url2).then(data => {
                    console.log(data.data)
                    if(data.data.data){
                        
                        setSuggestedCountState(data.data.data.count)
                        if(data.data.data.count > 10){
                            setPagesState(Math.ceil(data.data.data.count/10))
                        }
                        if(searchType === 'Meal'){
                            setFilteredSuggestionsState(data.data.data.meals)
                            setSuggestionsState(data.data.data.meals)
                        }else{
                            setFilteredSuggestionsState(data.data.data.products)
                            setSuggestionsState(data.data.data.products)
                        }
                    }
                })
            }
        })
        toggleChangeStatus()
    }

    function deleteSuggestion(id){
        let url1
        if(searchType === 'Meal'){
            url1 = '/meals/delete/'
        }else{
            url1 = '/products/deleteproduct/'
        }
        axios.delete(url1+id).then(res => {
            console.log(res.data)
            let url2
            if(searchType === 'Meal'){
                if(props.auth.authUser.user_type === 'admin'){
                    url2 = '/meals/get-meals/1'
                }else{
                    url2 = '/meals/get-meals/1?user='+props.auth.authUser._id
                }
            }else{
                if(props.auth.authUser.user_type === 'admin'){
                    url2 = '/products/get-all-products/1'
                }else{
                    url2 = '/products/get-all-products/1?user='+props.auth.authUser._id
                }
            }
            axios.get(url2).then(data => {
                console.log(data.data)
                if(data.data.data){
                    
                    setSuggestedCountState(data.data.data.count)
                    if(data.data.data.count > 10){
                        setPagesState(Math.ceil(data.data.data.count/10))
                    }
                    if(searchType === 'Meal'){
                        setFilteredSuggestionsState(data.data.data.meals)
                        setSuggestionsState(data.data.data.meals)
                    }else{
                        setFilteredSuggestionsState(data.data.data.products)
                        setSuggestionsState(data.data.data.products)
                    }
                    setStatus2State('success')
                    setMessageState('Suggestion deleted')
                    setTimeout(() => {
                        setStatus2State('')
                        setMessageState('')
                    }, 5000)
                }
            }).catch(error => {
                setStatus2State('error')
                setMessageState('Suggestion not deleted')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
          });
        })
    }

    function toggleTransferToInventory(meal){
        setSuggestionState(meal)
        setTransferToInventoryState(!transferToInventory)
    }

    function toggleSent(){
        setSentState(!sent)
    }

    function handleSearchPublicSuggestion(e){
        setSearchSuggestedSuggestionState(e.target.value);
        setSearchState(true)
        if(e.target.value.length>=1){
            let url
            if(searchType === 'Meal'){
                url = '/meals/get-meals/'
            }else{
                url = '/products/get-all-products/'
            }
            
            axios.get(url+'1?publicly_available=Public&' + (searchType==='Meal' ? 'meal_name' : 'product_name') +'='+e.target.value).then(data => {
                console.log(data.data)
                if(data.data.data){
                    if(searchType === 'Meal'){
                        setPublicSuggestionsState(data.data.data.meals)
                    }else{
                        setPublicSuggestionsState(data.data.data.products)
                    }
                }
            })
        }
        
    };

    function addSuggestion(suggestion){
        suggestion.user = props.auth.authUser._id
        suggestion.chef = props.auth.authUser.username
        suggestion.publicly_available = 'Draft'
        let newSuggestions = suggestions
        delete suggestion._id
        let url
        if(searchType === 'Meal'){
            url = '/meals/create'
        }else{
            url = '/products/create'
        }
        axios.post(url, suggestion).then(response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data)
                newSuggestions.push(response.data.data)
                setSuggestionsState(newSuggestions)
                setStatus2State('success')
                setMessageState('Suggestion added')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
                setFilteredSuggestionsState(newSuggestions)

            } else {
                setStatus2State('error')
                setMessageState('Suggestion not added')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
            }
          }).catch(error => {
                setStatus2State('error')
                setMessageState('Suggestion not added')
                setTimeout(() => {
                    setStatus2State('')
                    setMessageState('')
                }, 5000)
          });
    }

    function openMealDetailsModal(meal){
        setSuggestionState(meal)
        if(meal.formatted_ingredients){
            let ingredients =JSON.parse(meal.formatted_ingredients[0]);
            var ingredientsString = []
            for(let i=0; i<ingredients.length; i++){
                let properIngredientStringSyntax = ''
                if (ingredients[i].quantity === "") {
                    properIngredientStringSyntax = ingredients[i].productName;
                } else if (ingredients[i].measurement === "" && ingredients[i].quantity !== "") {
                    // MAKE sure we are using the right and tested variables to display the right type of string at all times.
                    properIngredientStringSyntax = "" + ingredients[i].quantity + " " + ingredients[i].productName;
                } else {
                    properIngredientStringSyntax =
                    "" + ingredients[i].quantity + " " + ingredients[i].measurement +
                    " of " + ingredients[i].productName;
                }
                ingredientsString.push(properIngredientStringSyntax)
            }
            console.log(ingredientsString)
            setIngredientsString(ingredientsString)
        }
        setOpenModalState(true)
    }

    function openDetailsModal(product){
        setSuggestionState(product)
        let ingredients = product.ingredients_in_product;
        var ingredientsString = []
        for(let i=0; i<ingredients.length; i++){
            let properIngredientStringSyntax = ''
            if (ingredients[i].quantity === "") {
                properIngredientStringSyntax = ingredients[i].productName;
              } else if (ingredients[i].measurement === "" && ingredients[i].quantity !== "") {
                // MAKE sure we are using the right and tested variables to display the right type of string at all times.
                properIngredientStringSyntax = "" + ingredients[i].quantity + " " + ingredients[i].productName;
              } else {
                properIngredientStringSyntax =
                  "" + ingredients[i].quantity + " " + ingredients[i].measurement +
                  " of " + ingredients[i].productName;
            }
            ingredientsString.push(properIngredientStringSyntax)
        }
        setIngredientsString(ingredientsString)
        setOpenModal2State(true)
    }

    function closeModal() {
        setOpenModalState(false);
        setOpenModal2State(false)
      }

    async function nextPage () {
        if(page < pages){
            let newPage = page + 1;
            setPageState(newPage)
            let url
            if(searchType === 'Meal'){
                if(props.auth.authUser.user_type === 'admin'){
                    url = '/meals/get-meals/'+newPage
                }else{
                    url = '/meals/get-meals/'+newPage+'?user='+props.auth.authUser._id
                }
            }else{
                if(props.auth.authUser.user_type === 'admin'){
                    url = '/products/get-all-products/'+newPage
                }else{
                    url = '/products/get-all-products/'+newPage+'?user='+props.auth.authUser._id
                }
            }
            axios.get(url).then(data => {
                console.log(data.data)
                if(data.data.data){
                    
                    setSuggestedCountState(data.data.data.count)
                    if(data.data.data.count > 10){
                        setPagesState(Math.ceil(data.data.data.count/10))
                    }
                    if(searchType === 'Meal'){
                        setFilteredSuggestionsState(data.data.data.meals)
                        setSuggestionsState(data.data.data.meals)
                    }else{
                        setFilteredSuggestionsState(data.data.data.products)
                        setSuggestionsState(data.data.data.products)
                    }
                }
            })
        }
      };
    
    async function prevPage () {
        if(page > 1){
            let newPage = page - 1;
            setPageState(newPage)
            let url
            if(searchType === 'Meal'){
                if(props.auth.authUser.user_type === 'admin'){
                    url = '/meals/get-meals/'+newPage
                }else{
                    url = '/meals/get-meals/'+newPage+'?user='+props.auth.authUser._id
                }
            }else{
                if(props.auth.authUser.user_type === 'admin'){
                    url = '/products/get-all-products/'+newPage
                }else{
                    url = '/products/get-all-products/'+newPage+'?user='+props.auth.authUser._id
                }
            }
            axios.get(url).then(data => {
                console.log(data.data)
                if(data.data.data){
                    
                    setSuggestedCountState(data.data.data.count)
                    if(data.data.data.count > 10){
                        setPagesState(Math.ceil(data.data.data.count/10))
                    }
                    if(searchType === 'Meal'){
                        setFilteredSuggestionsState(data.data.data.meals)
                        setSuggestionsState(data.data.data.meals)
                    }else{
                        setFilteredSuggestionsState(data.data.data.products)
                        setSuggestionsState(data.data.data.products)
                    }
                }
            })
        }
      };

    return (
    <div className={container + " " + col2}>
            <div className="alert">
                {status2 === "error" && <div className="alert-danger">{message}</div>}
                {status2 === "success" && <div className="alert-success">{message}</div>}
            </div>
        <Header />
        <SideNav />
        <div className={left}>
            <Sidenav2 showBottom={false} />
        </div>
        <div className={empty}></div>
        <div className={center}>
            {!openSuggestion &&
            <>
                <h3>Suggested Meal/Products</h3>
                {props.auth.authUser &&
                <div className={styles.suggestedmeal_container}>
                    <div className={styles.suggestedmeal_search_con}>
                        <div className={styles.search_con}>
                            <div className={styles.search_box}>
                                <p onClick={searchSuggested} className={styles.search_icon}>
                                    <SearchIcon className={styles.search_icon} />
                                </p>
                                <input
                                type="text"
                                name="search"
                                onChange={handleSearch}
                                onKeyUp={searchSuggested}
                                className={styles.search_input}
                                placeholder="Search for products"
                                />
                            </div>
                            <div className={styles.search_button} onClick={searchSuggested}>Search</div>
                        </div>
                        {props.auth.authUser.user_type === 'customer' &&
                        <Link href='/dashboard/createstore'><a>Create Store</a></Link>}
                    </div>
                    <div className={styles.suggestedmeal_row2}>
                        <div className={styles.mode_con}>
                            <div onClick={() => handleSearchType2('Meal')} className={styles.mode + ' ' + styles.left_mode + ' '+(searchType === 'Meal' ? styles.active_mode : '')}>Meal</div>
                            <div onClick={() => handleSearchType2('Product')} className={styles.mode + ' ' + styles.right_mode + ' '+(searchType === 'Product'? styles.active_mode : '')}>Product</div>
                        </div>
                        {props.auth.authUser.user_type !== 'admin' &&
                        <div className={styles.suggestedmeal_row2_col2}>
                            {/* <h5>Remove Sections(s)</h5> */}
                            <div>
                                <div onClick={togglePublicMeal} className={styles.tableactionbutton}>+ Add public meal</div>
                                <div className={styles.tableactionbutton}>
                                    <Link href='/suggestmeal' >
                                        <a>
                                            + New Suggestion
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className={styles.suggestedmeal}>
                    <div className={styles.request_table}>
                        <div>
                        <div className={styles.request_tr + ' ' + (props.auth.authUser.user_type === 'admin' ? styles.admin_request_tr:
                            props.auth.authUser.user_type === 'customer' ? styles.customer_request_tr:
                            props.auth.authUser.user_type === 'supplier' ? styles.supplier_request_tr: '')}>
                            <input name='id' type="checkbox" />
                            <p className={styles.request_th}>ID number</p>
                            <p className={styles.request_th}>Name</p>
                            <p className={styles.request_th} style={{justifySelf: 'center'}}>Status <FillterIcon /></p>
                            <p className={styles.request_th + " " + styles.hideData}>Categories <FillterIcon /></p>
                            <p className={styles.request_th + " " + styles.hideData}>Date Created <FillterIcon /></p>
                            <p className={styles.request_th} style={{textAlign: 'center'}}>Action</p>
                        </div>
                        </div>
                        <div>
                            {
                                filteredSuggestions.map((suggestion) => {
                                    return(
                                        <SuggestedMealRow searchType={searchType} deleteSuggestion={deleteSuggestion} toggleSent={toggleSent} toggleTransferToInventory={toggleTransferToInventory} openMealDetailsModal={openMealDetailsModal} openDetailsModal={openDetailsModal} auth={props.auth} key={suggestion._id} suggestion={suggestion} toggleOpenMeal={toggleOpenMeal} />
                                    )
                                })
                            }

                        </div>
                    </div>
                    {suggestionCount > 0 &&
                    <div className={styles.user_pagination}>
                        <div>
                            {
                                page > 1 &&
                                <div onClick={prevPage} className={styles.paginate_btn}>Prev</div>
                            }
                            {
                                page < pages &&
                                <div onClick={nextPage} className={styles.paginate_btn}>Next</div>
                            }
                            
                        </div>
                        <p>{'' + page + ' of ' + pages}</p>
                    </div>
                    }
                    </div>
                </div>
                }
            </>
            }
            {openSuggestion &&
                <div>
                    <div className={styles.meal_section_1}>
                        <div className={styles.meal_section_1_col_1}>
                            <ul className={styles.goback_header_pages}>
                                <div onClick={closeSuggestion}><WestIcon className={styles.goback_header_page_arrow} /></div>
                                <li onClick={closeSuggestion}>
                                    back
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.meal_section_1}>
                        <div className={styles.meal_section_1_col_1}>
                            <h3>Meal Description</h3>
                        </div>
                        <div className={styles.meal_section_1_col_2}>
                            {/* <p className={styles.meal_section_1_col_2_p}> Choose type</p> */}
                            <div className={styles.select_container}>
                                <div onClick={toggleChangeStatus} className={styles.select_box}>
                                    <p>{statusType.length > 0 ? statusType : suggestion.publicly_available}</p>
                                    <ArrowDropDownIcon className={styles.select_box_icon} />
                                </div>
                                {changeStatus &&
                                    <div className={styles.select_options2}>
                                        <p onClick={() => handleStatusType('Public')}>Public</p>
                                        <p onClick={() => handleStatusType('Pending')}>Pending</p>
                                        <p onClick={() => handleStatusType('Rejected')}>Rejected</p>
                                    </div>}
                            </div>
                            <p className={status + " " + 
                            ((suggestion.publicly_available === 'Draft' || suggestion.publicly_available === 'Pending') ? pending :
                            suggestion.publicly_available === 'Public' ? approve :
                            suggestion.publicly_available === 'Rejected' ? rejected : '')}>
                                {suggestion.publicly_available}
                            </p>
                        </div>
                    </div>
                    {searchType === 'Meal' ? 
                        <Meal meal={suggestion} />
                        :
                        <Product product={suggestion} />
                    }
                </div>
            }
        </div>
        {openModal &&
            <Popup2 popupType='Meal Suggestion Preview' openModal={openModal} closeModal={closeModal}
              name={suggestion.meal_name} description={suggestion.meal_name}
              imageData={suggestion.meal_images[0]} image={suggestion.meal_images[0]}
              imagesData={suggestion.meal_images.slice(1)} categories={JSON.parse(suggestion.meal_categories[0])}
              prepTime={suggestion.prep_time} cookTime={suggestion.cook_time}
              serves={suggestion.servings} chef={suggestion.chef}
              ingredientsList={ingredientsStringSyntax} utensilsList={JSON.parse(suggestion.meal_categories[0])}
              instructionChunk1={JSON.parse(suggestion.formatted_instructions[0])[1]} instructionChunk2={JSON.parse(suggestion.formatted_instructions[0])[2]}
              instructionChunk3={JSON.parse(suggestion.formatted_instructions[0])[3]} instructionChunk4={JSON.parse(suggestion.formatted_instructions[0])[4]}
              instructionChunk5={JSON.parse(suggestion.formatted_instructions[0])[5]} instructionChunk6={JSON.parse(suggestion.formatted_instructions[0])[6]}
              chunk1Content={suggestion.image_or_video_content_1[0]} chunk2Content={suggestion.image_or_video_content_2[0]}
              chunk3Content={suggestion.image_or_video_content_3[0]} chunk4Content={suggestion.image_or_video_content_4[0]}
              chunk5Content={suggestion.image_or_video_content_5[0]} chunk6Content={suggestion.image_or_video_content_6[0]}
              instructionWordlength={suggestion.instructionWordlength}
              tips={JSON.parse(suggestion.tips[0])} mealImageData={suggestion.meal_images[0]}
            />
        }

        {openModal2 && 
            <Popup1 popup='product' openModal={openModal2} closeModal={closeModal}
                name={suggestion.product_name} description={suggestion.product_details}
                imageData={suggestion.product_images[0]}
                image={suggestion.product_images[0]}
                imagesData={suggestion.product_images.slice(1)} categories={suggestion.product_categories}
                sizesList={[]} ingredientList={ingredientsStringSyntax}
          />
        }
        
        {addPublicMeal && 
        <div className={styles.addpublicMeal_container}>
            <div className={styles.addpublicMeal}>
                <div className={styles.addpublicMeal_top}>
                    <h2>Add meal from the store</h2>
                    <div onClick={togglePublicMeal}>
                        <CloseFillIcon style={styles.addpublicMeal_top_close} />
                    </div>
                </div>
                <div className={styles.search_con2}>
                    <div className={styles.select_container}>
                        <div onClick={toggleSearchOption} className={styles.select_box}>
                            <p>{searchType}</p>
                            <ArrowDropDownIcon className={styles.select_box_icon} />
                        </div>
                        {searchOption &&
                            <div className={styles.select_options}>
                                <p onClick={() => handleSearchType('Meal')}>Meals</p>
                                <p onClick={() => handleSearchType('Product')}>Products</p>
                                <p onClick={() => handleSearchType('Kitchen Utensil')}>Kitchen Utensils</p>
                                <p onClick={() => handleSearchType('Category')}>Category</p>
                            </div>}
                    </div>
                    <div onClick={toggleSearch} className={styles.search_box}>
                        <p className={styles.search_icon}>
                            <SearchIcon className={styles.search_icon} />
                        </p>
                        <input
                        type="text"
                        name="search"
                        onChange={handleSearchPublicSuggestion}
                        className={styles.search_input}
                        placeholder="Search for products"
                        />
                        {search &&
                        <div className={styles.search_container}>
                            <div className={styles.search_container_col_1}>
                                
                                <div className={styles.search_suggestion}>
                                    <h3 className={styles.search_suggestion_h3}>Meals (1)</h3>
                                    {searchType === 'Meal' && 
                                    <ul className={styles.search_help_lists}>
                                        {publicSuggestions.map(suggestion => {
                                            return(
                                                <li onClick={() => addSuggestion(suggestion)} className={styles.search_help_list}>
                                                    {suggestion.meal_name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    }
                                </div>

                                <div className={styles.search_container_col_2}>
                                    <div className={styles.search_container_col_2_row_1}>
                                        <h3 className={styles.search_products_h3}>Products</h3>
                                    </div>
                                    <div className={styles.search_container_col_2_row_2}>
                                        <div className={styles.searched_products}>
                                            <ul className={styles.search_help_lists}>
                                                {searchType === 'Product' && 
                                                <>
                                                {publicSuggestions.map(suggestion => {
                                                    return(
                                                        <li onClick={() => addSuggestion(suggestion)} className={styles.search_help_list}>
                                                            {suggestion.product_name}
                                                        </li>
                                                    )
                                                })}
                                                </>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.search_help}>
                                    <h3 className={styles.search_help_h3}>Kitchen Utensils</h3>
                                    
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className={styles.search_button}>Search</div>
                </div>
            </div>
            
        </div>}

        {transferToInventory && 
            <TransferToInventory meal={suggestion} toggleTransferToInventory={toggleTransferToInventory} />
        }

        {sent && 
            <Sent toggleSent={toggleSent} />
        }
        
    </div>
    )
}

// export default SuggestedMeals

function mapStateToProp(state) {
    return {
      auth: state.Auth
    };
  }
  
  export default connect(
    mapStateToProp,
  )(SuggestedMeals);