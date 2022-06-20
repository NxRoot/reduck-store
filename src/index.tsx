import React, { Context, createContext, ReactNode, useContext, useReducer } from "react";

type RemoveState<F> = F extends () => infer R ? (props?: any) => R : F;

type BaseValue<X = any> = {
  value: X
  initialvalue: X
}

export type StoreValue<T = any, X = any> = { 
  [P in keyof T]: RemoveState<T[P]> 
} & BaseValue<X>

type StoreReducer =  {
  name: string
  initialValue: any
  reducers: any
}

type StoreProviderType = {
  reducers: StoreReducer[]
  children: ReactNode | ReactNode[]
}

function makeStore(reducers: StoreReducer[]){

  function reducer(state: any, action: any) {
    return { ...state, [action.key]: action.value }
  }

  let initial: any = {}
  let result: any = {}

  for(const k of reducers){
    initial[k.name] = k.initialValue
  }

  const [state, dispatch] = useReducer(reducer, initial)

  for(const k of reducers){
    const itemReducers: any = {}

    for(const r of Object.keys(k.reducers)){
      itemReducers[r] = (props: any) => {
        const value = k.reducers[r](props, state[k.name])
        dispatch({ key: k.name, value })
      }
    }
    
    result[k.name] = { 
      ...itemReducers,
      initialValue: k.initialValue,
      value: state[k.name]
    }
  }

  return result
}

const state = createContext({} as any)

export default function StoreProvider({ reducers, children }: StoreProviderType){
  const store = makeStore(reducers)
  return (
    <state.Provider value={store}>
      {children}
    </state.Provider>
  )
}

export function createStore<T>(parentReducers: StoreReducer[]){
  return { 
    store: { reducers: parentReducers }, 
    useStore: () => useContext(state as Context<T>)
  }
}



