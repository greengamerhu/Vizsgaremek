import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { CartItem, CartResponse } from "../types/cartitem"
import { addToCartApi, deleteCartItemsApi, getCartItemsAPi, updateCartItemsApi } from "../api/shoppingCartApi"
import type { MenuItem } from "../types/menuItem"

type ShoppingCartProviderProps = {
  children: ReactNode
}



type ShoppingCartContext = {
  cartQuantity : number,
  cartItems: CartItem[],
  cartTotal : number
  getItemQuantity: () => number
  openCart: () => void
  closeCart: () => void
  getCartItems: () => void
  addToCart: (menuitem : MenuItem) => void
  increaseCartQuantity: (id: CartItem) => void
  decreaseCartQuantity: (id: CartItem) => void
  removeFromCart: (id: string) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  useEffect(() => {
    getCartItems()

  }, [])

  let cartQuantity = cartItems.length
  

  const openCart = () => {setIsOpen(true), getCartItems()}
  const closeCart = () => setIsOpen(false)
  const getCartItems = async () =>  {
    await getCartItemsAPi().then((res) => {
      setCartItems(res.shoppingCart)
      setCartTotal(parseInt(res.sumTotal))
    }).catch((e) => console.log(e))
  }

  
  function getItemQuantity() {   
   return cartItems.length
    
  }
  async function addToCart(menuitem : MenuItem) {
    await addToCartApi(menuitem).then((res) => {
      if(res.status == 201) {
        getCartItems()
      }
    }).catch((e) => console.log(e))
  }
  async function increaseCartQuantity(cartitem : CartItem) {
    await updateCartItemsApi(cartitem.quantity+ 1, cartitem.menuItem ).then((res) => {
      if(res.status == 200) {
        getCartItems()
      }

    }).catch((e) => console.log(e))
    
  }
  async function decreaseCartQuantity(cartitem : CartItem) {
        if(cartitem.quantity - 1 == 0) {
          return removeFromCart(cartitem.id)
        }
        await updateCartItemsApi(cartitem.quantity- 1, cartitem.menuItem ).then((res) => {
      if(res.status == 200) {
        getCartItems()
      }

    }).catch((e) => console.log(e))
    
  }
  async function removeFromCart(cartitemid : string) {
    await deleteCartItemsApi(cartitemid).then((res) => {
      if(res.status == 200) {
        getCartItems()
      }
      console.log(res.status)
    })
  
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        getCartItems,
        addToCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        cartTotal
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
