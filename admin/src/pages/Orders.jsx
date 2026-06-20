import axios from 'axios'
import { useEffect, useState } from 'react'
import { backendUrl } from '../App'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const [search, setSearch] = useState("")

  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        backendUrl + '/api/order/allorders',
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ))
      }

    } catch (error) {
      console.log(error)
    }
  }

  const updateStatus = async (
    orderId,
    status
  ) => {

    try {

      const response =
        await axios.post(
          backendUrl +
          "/api/order/status",

          {
            orderId,
            status
          },

          {
            headers: { token }
          }
        );

      if (response.data.success) {

        fetchOrders();
      }

    } catch (error) {

      console.log(error);
    }
  };

  const filteredOrders =
    orders.filter(order =>
      order.userId?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  useEffect(() => {
    fetchOrders()
  }, [])

  // return (
  //   // <div>
  //   //   <h2>All Orders</h2>

  //   //   <input
  //   //     className='search-input'
  //   //     type="text"
  //   //     placeholder="Search customer"
  //   //     value={search}
  //   //     onChange={(e) => setSearch(e.target.value)}
  //   //   />

  //   //   {
  //   //     filteredOrders.map((order, index) => (

  //   //       <div
  //   //         key={index}
  //   //         style={{
  //   //           border: '1px solid gray',
  //   //           padding: '10px',
  //   //           marginBottom: '10px'
  //   //         }}
  //   //       >

  //   //         <p>
  //   //           <b>Order ID:</b>
  //   //           {order._id}
  //   //         </p>

  //   //         <p>
  //   //           <b>Customer's Name:</b>
  //   //           {order.userId?.name}
  //   //         </p>

  //   //         <p>
  //   //           <b>Total:</b>
  //   //           ₹{order.total}
  //   //         </p>

  //   //         <p>
  //   //           <b>Date:</b>
  //   //           {new Date(order.date).toLocaleString()}
  //   //         </p>

  //   //         <p>
  //   //           <b>Items:</b>
  //   //         </p>

  //   //         {
  //   //           order.items.map((item, i) => (

  //   //             <div key={i}>
  //   //               {item.name}
  //   //               {" "}
  //   //               x
  //   //               {" "}
  //   //               {item.quantity}
  //   //             </div>

  //   //           ))
  //   //         }

  //   //         <select
  //   //           className="status-dropdown"
  //   //           value={order.status}
  //   //           onChange={(e) =>
  //   //             updateStatus(
  //   //               order._id,
  //   //               e.target.value
  //   //             )
  //   //           }
  //   //         >

  //   //           <option>Ordered</option>
  //   //           <option>Shipped</option>
  //   //           <option>Delivered</option>

  //   //         </select>

  //   //       </div>

  //   //     ))
  //   //   }
  //   // </div>


  // )

  return (
    <div>

      <h2>All Orders</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {
        filteredOrders.map((order, index) => (

          <div key={index} className="order-card">

            <div className="order-left">

              <p>
                <b>Order ID:</b> {order._id}
              </p>

              <p>
                <b>Total:</b> ₹{order.total}
              </p>

              <p>
                <b>Order Date:</b>{" "}
                {new Date(order.date).toLocaleString()}
              </p>

              <p>
                <b>Payment Status:</b> Pending
              </p>

              <p>
                <b>Payment Method:</b> Cash On Delivery
              </p>

              <div className="order-items">

                <b>Items:</b>

                {
                  order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} x {item.quantity}
                    </div>
                  ))
                }

              </div>

            </div>

            <div className="order-right">

              <p>
                <b>Customer Name:</b>{" "}
                {order.userId?.name}
              </p>

              <p>
                <b>Phone Number:</b>{" "}
                {order.phone || "Not Added"}
              </p>

              <p>
                <b>Address:</b>{" "}
                {order.address || "Not Added"}
              </p>

              <div className="status-section">

                <label>
                  <b>Order Status:</b>
                </label>

                <select
                  className="status-dropdown"
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Ordered">
                    Ordered
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                </select>

              </div>

            </div>

          </div>

        ))
      }

    </div>
  )
}

export default Orders