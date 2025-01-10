// import { useState } from 'react'
// import './App.css'
// import { data } from './data'

// function App() {

//   const [selected, setSelected] = useState<number | null>(0)
//   function change(id: number) {
//     setSelected(id === selected ? null : id)
//   }
//   return (
//     <div>
//       {data.map(x => (
//         <div key={x.id} onClick={() => change(x.id)} className='hover:pointer'>
//           {x.question}
//           {selected === x.id ?
//             <div>
//               {x.answer}
//             </div> : null}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default App

// import { useState } from 'react'
import { useCountStore } from './hooks/useCount'
import { AuthProvider } from '../x2'


function App() {

  const { count, decrement, increment } = useCountStore();
  // const count = useCountStore((state) => state.count)
  // const increment = useCountStore((state) => state.increment)
  // const decrement = useCountStore((state) => state.decrement)

  return (
    <Authprovider
    <div>
      {count.toString()}
      <div>
        <button onClick={(e) => console.log(e.nativeEvent.pageX,e.nativeEvent.pageY)}>incre</button>
        <button onClick={decrement}>decre</button>
      </div>
    </div>
  )
}

export default App
