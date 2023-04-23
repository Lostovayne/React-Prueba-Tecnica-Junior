import { useEffect, useState } from 'react'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${FiestWord}?size=50&color=red&json=true`

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data
        setFact(fact)
        const firstWord = fact.split(' ', 3).join(' ')
        console.log(firstWord)

        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
          .then((res) => res.json())
          .then((response) => {
            const { url } = response
            setImageUrl(`https://cataas.com${url}`)
          })
      })
  }, [])

  return (
    <main>
      <h1>Gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={` Image extracted using the first  threee words for ${fact} `} />}
    </main>
  )
}
