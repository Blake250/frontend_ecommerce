import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredProducts:[]
}

const filteredSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_SEARCH: (state, action)=>{
        const {products, search} = action.payload
        const temProducts = products?.filter((product)=> 
        product?.name.toLowerCase().includes(search.toLowerCase()) 
        || product?.category.toLowerCase().includes(search.toLowerCase())    )

        state.filteredProducts = temProducts
    },
         

    SORT_PRODUCT: (state, action) => {
      const { sort, products } = action.payload;
      let temProducts = [...products]; 
    
      if (sort === "latest") {
      
      } else if (sort === "lowest-price") {
        temProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "highest-price") {
        temProducts.sort((a, b) => b.price - a.price);
      } else if (sort === "a-z") {
        temProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "z-a") {
        temProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
    
      state.filteredProducts = temProducts;
    },
    FILTER_BY_CAT: (state,action)=>{
      const {products, category} = action.payload
     let temProducts = []
      if(category === 'All'){
        temProducts = products
      }
      else{
        temProducts = products?.filter((product)=>{
        return(product?.category === category)
        })
      }

      state.filteredProducts = temProducts
    },
    FILTER_BY_BRAND: (state,action)=>{
      const {products, brand} = action.payload
     let temProducts = []
      if(brand === 'All'){
        temProducts = products
      }
      else{
        temProducts = products?.filter((product)=>{
        return(product?.brand === brand)
        })
      }

      state.filteredProducts = temProducts
    },

     FILTER_BY_PRICE:(state, action)=>{
       const {products, price} = action.payload
       let temProducts = []
     temProducts = products?.filter((product)=> product?.price >= price[0] && product?.price <= price[1])
     state.filteredProducts = temProducts
     }
   
  
 
  }

});

export const {FILTER_SEARCH, SORT_PRODUCT, FILTER_BY_CAT, FILTER_BY_BRAND, FILTER_BY_PRICE} = filteredSlice.actions

export default filteredSlice.reducer