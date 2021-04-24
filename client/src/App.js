import axios from 'axios'
import {useState, useEffect} from 'react'

function App() {
  const [hello, setHello] = useState(null)
  useEffect(() => {
    axios.get('/hello')
    .then(res => setHello(res.data))
    .catch(err => console.log(err))
  })
  return (
    <div>
      {hello? <div>{hello}</div> : null}
    </div>
  );
}

export default App;
