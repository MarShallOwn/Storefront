import { Product } from "../../models/product";

export const dummyProducts: Product[] = [{
    name: "kiwi",
    price: 400,
    categoryId: 1
  },{
    name: "banana",
    price: 30,
    categoryId: 1
  },{
    name: "orange",
    price: 20,
    categoryId: 1
  },{
    name: "guava",
    price: 54,
    categoryId: 1
  },{
    name: "cherry",
    price: 65,
    categoryId: 1
  },{
    name: "lemon",
    price: 32,
    categoryId: 1
  }]

export const dummyOrderedProducts = [
  {quantity: 55,orderId: 1,productId: 1},
  {quantity: 56,orderId: 1,productId: 1},
  {quantity: 57,orderId: 1,productId: 1},
  {quantity: 59,orderId: 1,productId: 1},
  {quantity: 53,orderId: 1,productId: 1},
  {quantity: 100,orderId: 1,productId: 1},
  {quantity: 200,orderId: 1,productId: 1},
  {quantity: 46,orderId: 1,productId: 2},
  {quantity: 44,orderId: 1,productId: 2},
  {quantity: 45,orderId: 1,productId: 2},
  {quantity: 43,orderId: 1,productId: 2},
  {quantity: 40,orderId: 1,productId: 2},
  {quantity: 50,orderId: 1,productId: 3},
  {quantity: 62,orderId: 1,productId: 3},
  {quantity: 63,orderId: 1,productId: 3},
  {quantity: 66,orderId: 1,productId: 3},
  {quantity: 65,orderId: 1,productId: 3},
  {quantity: 73,orderId: 1,productId: 4},
  {quantity: 70,orderId: 1,productId: 4},
  {quantity: 80,orderId: 1,productId: 5}
]


export const expectedOrderOutput = [
  {
    id: 1,
    status: 'active',
    user_id: '1',
    quantity: 55,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 2,
    status: 'active',
    user_id: '1',
    quantity: 56,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 3,
    status: 'active',
    user_id: '1',
    quantity: 57,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 4,
    status: 'active',
    user_id: '1',
    quantity: 59,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 5,
    status: 'active',
    user_id: '1',
    quantity: 53,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 6,
    status: 'active',
    user_id: '1',
    quantity: 100,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 7,
    status: 'active',
    user_id: '1',
    quantity: 200,
    order_id: 1,
    product_id: '1'
  },
  {
    id: 8,
    status: 'active',
    user_id: '1',
    quantity: 46,
    order_id: 1,
    product_id: '2'
  },
  {
    id: 9,
    status: 'active',
    user_id: '1',
    quantity: 44,
    order_id: 1,
    product_id: '2'
  },
  {
    id: 10,
    status: 'active',
    user_id: '1',
    quantity: 45,
    order_id: 1,
    product_id: '2'
  },
  {
    id: 11,
    status: 'active',
    user_id: '1',
    quantity: 43,
    order_id: 1,
    product_id: '2'
  },
  {
    id: 12,
    status: 'active',
    user_id: '1',
    quantity: 40,
    order_id: 1,
    product_id: '2'
  },
  {
    id: 13,
    status: 'active',
    user_id: '1',
    quantity: 50,
    order_id: 1,
    product_id: '3'
  },
  {
    id: 14,
    status: 'active',
    user_id: '1',
    quantity: 62,
    order_id: 1,
    product_id: '3'
  },
  {
    id: 15,
    status: 'active',
    user_id: '1',
    quantity: 63,
    order_id: 1,
    product_id: '3'
  },
  {
    id: 16,
    status: 'active',
    user_id: '1',
    quantity: 66,
    order_id: 1,
    product_id: '3'
  },
  {
    id: 17,
    status: 'active',
    user_id: '1',
    quantity: 65,
    order_id: 1,
    product_id: '3'
  },
  {
    id: 18,
    status: 'active',
    user_id: '1',
    quantity: 73,
    order_id: 1,
    product_id: '4'
  },
  {
    id: 19,
    status: 'active',
    user_id: '1',
    quantity: 70,
    order_id: 1,
    product_id: '4'
  },
  {
    id: 20,
    status: 'active',
    user_id: '1',
    quantity: 80,
    order_id: 1,
    product_id: '5'
  },
  {
    id: null,
    status: 'completed',
    user_id: '1',
    quantity: null,
    order_id: 2,
    product_id: null
  },
  {
    id: null,
    status: 'active',
    user_id: '1',
    quantity: null,
    order_id: 3,
    product_id: null
  }
]