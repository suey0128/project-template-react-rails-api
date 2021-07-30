import React, {useState}from 'react'

import HomeICGlue from './HomeICGlue';
import HomeICPressOnContainer from './HomeICPressOnContainer';
import HomeICHandCare from './HomeICHandCare';


function HomeItemContainer() {
    //use state for displaying 
    const [showItem, setShowItem] = useState("pressOn")

    const displayItemPage = () => {
        if (showItem === "pressOn") {
        return <HomeICPressOnContainer />
        } else if (showItem === "glue") {
        return <HomeICGlue />
        } else {
        return <HomeICHandCare />
        }
    }

    return (
        <div>
            <h2>this is HomeItemContainer</h2>
            {displayItemPage()}
        </div>
    )
  }
  
  export default HomeItemContainer;