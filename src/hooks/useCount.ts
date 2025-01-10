import { create } from "zustand"

// type countProps = {
//     count: number;
//     increment: () => void
//     decrement: () => void
// }

// export const useCountStore = create<countProps>((set) => ({
//     count: 0,
//     increment: (() => {
//         set((state) => ({ count: state.count + 1 }))
//     }),
//     decrement: (() => {
//         set((state) => ({ count: state.count - 1 }))
//     })
// }))

// interface CountProps {
//     count: number,
//     increment: () => void,
//     decrement: () => void,
// }

// const useHook = create<CountProps>((set) => ({
//     count: 0,
//     increment: (() => {
//         set((state) => ({ count: state.count + 1 }))
//     }),
//     decrement: (() => {
//         set((state) => ({ count: state.count - 1 }))
//     }),
// }))

interface Todo {
    id: number,
    text: string,
    completed: boolean
}

interface HookProps {
    todos: Todo[],
    addTodo: (text: string) => void;
    toggleTodo: any
}

const useHook = create<HookProps>((set) => ({
    todos: [],
    addTodo: (text: string) => {
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text, completed: false }, // Append the new todo
          ],
        }));
      },
    toggleTodo: (id: number) => {
        set((state) => ({
            todos: state.todos.
        }))
    }
}))