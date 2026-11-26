//This file manages order data
//connect log in student, firestore real-time order listener, react state (orders)

import { useEffect, useState } from 'react'
import { subscribeToMyOrders } from '../services/orders.js'
import { useAuth } from './useAuth.js'
 
export function useMyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  //setOrders here update the orders state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
  useEffect(() => { //runs after React renders the component
    if (!user) return
    const unsubscribe = subscribeToMyOrders(
      user.uid,
      (data) => { setOrders(data); setLoading(false) },
      (err) => { setError(err.message); setLoading(false) },
    )
    return unsubscribe //prevent unneccesary listener from remaining active
  }, [user]) //rerun when user changes
 
  return { orders, loading, error }
}