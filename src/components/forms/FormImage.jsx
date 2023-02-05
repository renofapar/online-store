import React from 'react'
import { storage } from '../../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export const FormImage = () => {

  const [image, setImage] = React.useState(null)
  const [url, setUrl] = React.useState(null)
  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleClickSubmit = () => {
    const imageRef = ref(storage, "cartImages/")
    uploadBytes(imageRef, image)
    .then(() => {
      getDownloadURL(imageRef)
      .then(url => setUrl(url))
      .catch(e => console.log(e.message, "error get the image url"))
      setImage(null)
    })
    .catch(e => console.log(e.message))

  }

  return (
    <div>
      <input type="file" onChange={handleImageChange}/>
      <button onClick={handleClickSubmit}>submit</button>
      <img src={url} alt="" />
    </div>
  )
}
