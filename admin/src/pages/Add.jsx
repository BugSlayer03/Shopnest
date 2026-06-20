import { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const [image,setImage] = useState(false)
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('Gadgets')

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append('name',name)
      formData.append('category',category)
      formData.append('price',price)
      image && formData.append('image',image)

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setCategory('')
        setImage(false)
        setPrice('')
      }

      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='add-form'>
        <div className='img-container'>
          <p className='upload-img-txt'>Upload Image</p>

          <div>
            <label htmlFor="image">
              <img className='upload-img' src={!image?assets.upload_area:URL.createObjectURL(image)} alt="" />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
          </div>

        </div>

        <div className='product-details'>
          <div className='details-items'>
            <p>Product Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type Here' required />
          </div>

          <div className='details-items'>
            <p>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} name="" id="" className='category'>
              <option value="Gadgets">Gadgets</option>
              <option value="Beauty">Beauty Products</option>
              <option value="Food">Food Products</option>
              <option value="Home-appliances">Home Appliances</option>
            </select>
          </div>

          <div className='details-items'>
            <p>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Type Here' required />
          </div>

          <button type='submit' className='addbtn'>ADD</button>
        </div>
    </form>
  )
}

export default Add