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

import useSetQueryParams from "./store/hook"
function App() {

  return (
    <MyComponent />
  )
}

export default App

function MyComponent() {
  const setQueryParams = useSetQueryParams();

  const handleSearch = (event: any) => {
    setQueryParams({ search: event.target.value });
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => handleSearch(e)}
    />
  );
}
