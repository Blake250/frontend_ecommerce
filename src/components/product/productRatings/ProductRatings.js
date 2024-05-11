import React from 'react'

import StarRatings from 'react-star-ratings'








const ProductRatings = ({averageRating, noRatings}) => {
  return (
 <> 
  {
    averageRating > 0 && (
        <>
        <StarRatings
        starDimension='20px'
        starSpacing='2px'
        starRatedColor='#F6B01E'
        rating={averageRating}
        editing={false}
        
        
        />
           ({noRatings})
        </>
     
    )
  }
   </>
  )
}

export default ProductRatings


/*const ProductRating = () => {
    const [checked, setChecked] = useState(false)
    const [value, setValue] = useState(null)

    const handleChange = (event)=>{
        setChecked(event.target.checked)
    }

    const handleValue = (event, newValue)=>{
        setValue(newValue)
    }

  return (
    <Stack>
       <Rating
       value={value}
       onChange={handleValue}
       precision={0.5}
       size='large'
       icon={
        <IconButton style={{color:'red', fontSize:'inherit'}} >
     <FavoriteIcon color='error' fontSize='inherit' />
        </IconButton>
       }
       
       emptyIcon={
        <IconButton style={{color: "blue", fontSize:"inherit" }}  >
        <FavoriteIcon  color='success'fontSize='inherit'  />
      </IconButton>
       }
       
       />
    
        
        </Stack>
  )
}

export default ProductRating*/