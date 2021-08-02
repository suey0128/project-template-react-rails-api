// react-router-dom Imports
import { Link, useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';


function HomeICItemCard({item}) {

    let history = useHistory();

    const handleItemPhotoClick = () => {
        // console.log(item.color)
        if (item.color) { //press_on
            history.push(`/items/press_ons/${item.id}`);
        } else if (item.strength) { //glue
            history.push(`/items/glues/${item.id}`);
        } else { //hand_care
            history.push(`/items/hand_cares/${item.id}`);
        }
    }

    return (
 
        <Grid item xs={6} sm={3}>
                <div >
  
                    <img onClick={handleItemPhotoClick} className="img-in-card" src={item.image} />

                    <div className="info-container">
                        <h3 className="item-name">{item.name}</h3>
                        <p>$ {item.price}</p>
                    </div>
                    <button>Add to Cart</button>
                </div>
        </Grid>

    )
  }
  
  export default HomeICItemCard;