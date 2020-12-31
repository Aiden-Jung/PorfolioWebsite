import {useState, useEffect} from 'react'
import {Texture, LoadingManager, TextureLoader, RepeatWrapping} from 'three'


const loadingManager = new LoadingManager()
const textureLoader = new TextureLoader(loadingManager)

const loadTexture = (src, callback) => {
  const texture = textureLoader.load(src, () => {
    typeof callback === 'function' && callback(texture)
  })

  texture.wrapS = texture.wrapT = RepeatWrapping

  return texture
}

const useTexture = (src) => {
  const [texture, setTexture] = useState(new Texture())

  useEffect(()=> {
    loadTexture(src, setTexture)
  }, [])

  return texture
}

export default useTexture;
