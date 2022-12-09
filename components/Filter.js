import { useState, useRef } from "react"
import styles from "../styles/Filter.module.css"

import Slider  from 'rc-slider';
import 'rc-slider/assets/index.css';




// import Slider, { Range } from 'rc-slider';

const Filter = ({tags, recipes, setFilteredRecipes, ref, filterBool}) => {
    const [cookTimeFilter, setCookTimeFilter] = useState([10,60])
    const [filterOptions, setFilterOptions] = useState([]);

    const handleFilterChange = (e) => {
        // if Checkbox is checked and the item is not already in filter Options array, it will be added
        if(!filterOptions.includes(e.target.value) && e.target.checked === true){
            // add checkbox value to filter Options array
            setFilterOptions([...filterOptions, e.target.value])
        } else {
            // if it has been unchecked it will be taken out of filter options
            setFilterOptions(filterOptions.filter((option) => option !== e.target.value))
        }
    }
    const filterRecipes = (e) => {
        e.preventDefault()
        if (filterOptions.length === 0 && cookTimeFilter.length === 0) {
            setFilteredRecipes(recipes)
            return
        } else if (filterOptions.length === 0) {
            setFilteredRecipes(recipes.filter((recipe) => recipe.fields.cookTime >= cookTimeFilter[0] && recipe.fields.cookTime <= cookTimeFilter[1]))
        } else {
            setFilteredRecipes(recipes.filter((recipe) => filterOptions.includes(recipe.metadata.tags[0].sys.id) 
            && recipe.fields.cookTime >= cookTimeFilter[0] && recipe.fields.cookTime <= cookTimeFilter[1]))
        }
        
    }

    // Dots on Slider 
    const marks = {
        10: '10',
        20: '20',
        30: '30',
        40: '40', 
        50: '50', 
        60: '60'
      }
    return(
            <div className={`${styles.filterComponent}  ${styles.showBox}`}>
                <h2 className={styles.filterHeader}>Filter Menu</h2>
                
                <div className={styles.filterCheckboxList}>
                    <h3 className={styles.filterTitle}>Tags</h3>
                    {
                        tags.map((tag, index) => (
                            <div className={styles.filterCheckbox} key={index}>
                                <input onChange={handleFilterChange} type="checkbox" className={styles.filterCheckboxInput} value={tag.sys.id} name={tag.name} />
                                <label className={styles.filterCheckboxLabel}>{tag.name}</label>
                            </div>
                        
                        ))
                    }
                    <h3 className={styles.filterTitle}>Cook Time:</h3>

                </div>
                <div className={styles.sliderContainer}>
                <Slider
                    range
                    className={styles.slider}
                    defaultValue={[10, 60]}
                    marks={marks}
                    dots={true}
                    step={null}
                    min={10}
                    max={60}
                    onChange={(e)=>{setCookTimeFilter(e)}}
                    dotStyle={{
                        background: 'green',
                        height:16,
                        width:16,
                        position:'absolute',
                        // bottom: -7,
                        top:-6,
                        border: '1px solid black',
                        verticalAlign: 'middle',
                        backgroundColor: '#eee',
                        cursor: 'pointer'
                        
                    }}
                    
                    activeDotStyle={{
                        backgroundColor:'blue'
                    }}
                    handleStyle={{
                        height:20,
                        width:20,
                        margin: 'auto',
                        boxShadow: 'none',
                        border: 'none',
                        backgroundColor: 'black',
                        opacity: 1
                    }}
                    trackStyle={{
                        backgroundColor:'blue',
                        position: 'absolute',
                        height:8,
                        }}
                    railStyle={{ 
                        backgroundColor: '#64748b',
                        position: 'absolute',
                        height: 8,
                    }}
                />
                </div>
                

                <button  onClick={filterRecipes} className={styles.filterButton}>Filter</button>
            </div>        
    )
   
}

export default Filter