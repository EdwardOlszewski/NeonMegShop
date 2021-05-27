// Dependencies
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Actions
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { uploadImage } from '../actions/imageActions'
// Components
import { Form, Button, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const ProductEditScreen = ({ match, history }) => {
  // Assign useDispatch hook
  const dispatch = useDispatch()

  // Get the product ID from the url
  const productId = match.params.id

  // Create stateful values and functions
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [published, setIsPublished] = useState(false)
  const [countInStock, setCountInStock] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('Choose an image to upload...')

  // Pull data from the redux store
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, success, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const imageUpload = useSelector((state) => state.imageUpload)
  const {
    loading: loadingImg,
    error: errorImg,
    success: successImg,
    imageURL,
  } = imageUpload

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Function to upload Image on submit
  const uploadImageHandler = async ({ target: { files } }) => {
    setFileName(files[0].name)
    dispatch(uploadImage(files[0]))
  }

  // Function called on form submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
        published,
      })
    )
  }

  // useEffect hook
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else if (successImg) {
      setImage(imageURL)
    } else if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId))
    } else if (success == true) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setCountInStock(product.countInStock)
      setCategory(product.category)
      setDescription(product.description)
      setIsPublished(product.isPublished)
    }
  }, [
    dispatch,
    history,
    productId,
    product,
    successUpdate,
    successImg,
    imageURL,
    userInfo,
  ])

  return (
    <FormContainer>
      <Meta title={'Product Edit Screen'} />
      <Card className='card-content'>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                label={fileName}
                custom
                onChange={uploadImageHandler}
              ></Form.File>
              {loadingImg && <Loader />}
              {errorImg && <Message variant='danger'>{errorImg}</Message>}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as='select'
                placeholder='Select Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All</option>
                <option>pillow</option>
                <option>felt</option>
                <option>painting</option>
                <option>beaded</option>
                <option>resin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='ispublished'>
              <Form.Check
                type='checkbox'
                label='Publish'
                checked={published}
                onChange={(e) => setIsPublished(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>

            <div className='space'></div>
          </Form>
        )}
      </Card>
    </FormContainer>
  )
}

export default ProductEditScreen
