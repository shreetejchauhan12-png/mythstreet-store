export type Order = {
  id: string
  productId: number
  title: string
  price: number
  size: string
  qty: number
  payment: "online" | "cod"
  status: "placed" | "confirmed" | "processing" | "shipped" | "delivered"
  tracking?: string
  courier?: string
}

export const saveOrder = (order: Order) => {
  const orders = JSON.parse(localStorage.getItem("myth_orders") || "[]")
  orders.unshift(order)
  localStorage.setItem("myth_orders", JSON.stringify(orders))
}

export const getOrders = (): Order[] => {
  return JSON.parse(localStorage.getItem("myth_orders") || "[]")
}

export const updateTracking = (
  id: string,
  tracking: string,
  courier: string
) => {
  const orders = getOrders()

  const updated = orders.map((o: Order) =>
    o.id === id
      ? {
          ...o,
          tracking,
          courier,
          status: "shipped",
        }
      : o
  )

  localStorage.setItem("myth_orders", JSON.stringify(updated))
}