# Reduck Store 🦆
Simple react state reducer inspired on redux duck patterns.

## Description

* This project was developed mainly because I don't like the way redux structures their state objects.
* Reduck works just like redux, it creates a store, reducers, and dispatches events where needed.
* It uses essentially the same synthax patterns as redux.


## Installation 
```
npm i reduck-store
```
**We will be using this structure in the next examples** <br>

```
📜 app.tsx
📜 home.tsx
📂 store
  └─ 📜 index.tsx
  └─ 📂 reducer
     └─ 📜 age.tsx
```

## Implementation


**Create a reducer** `src/store/reducer/age.tsx`
```
export const ReducerAge = {
  name: 'age',
  initialValue: 20,
  reducers: {
    increment(props?: any, state?: number){
      return state + 1
    }
  }
}
```

**Create a Store and Typings** `src/store/index.tsx`
> **StoreValue** receives the type of the reducers and the type of the value itself
```
import { createStore, StoreValue } from "reduck-store"
import { ReducerAge } from "./reducer/age"

type StoreState = {
  age: StoreValue<typeof ReducerAge.reducers, number>
}

export const { store, useStore } = createStore<StoreState>([ ReducerAge ])
```


## Usage 

**Wrap provider around your app**
```
import StoreProvider from "reduck-store"
import { store } from "./store"

function App() {
  return (
    <StoreProvider {...store}>
      <Home />
    </StoreProvider>
  )
}
```

**Access the store**
```
import { useStore } from "./store"

function Home() {

  const { age } = useStore()

  return (
    <div>
      // call reducer
      <button onPress={age.increment}>Increment</button>
      
      // display value
      <div>{age.value}</div>
    </div>
  )
}
```

## Differences

In **Redux** you would have something like this:
```
dispatch(increment())
```
In **Reduck** we do it like this:
```
age.increment()
```

> The big difference would be on the **state object** itself and the way it is structured and accessed.<br>
> So essentially in **Reduck** every state object contains its reducers and values.

| <img src="https://i.ibb.co/4g77nkf/Screenshot-2022-06-20-at-23-13-37.png" alt="Alt text" style="float: left" title="Optional title"> | <img src="https://i.ibb.co/rs11TFr/Screenshot-2022-06-20-at-23-39-59.png" alt="Alt text" style="float: left" title="Optional title"> |
|--|--|



<!-- <img src="https://i.ibb.co/4g77nkf/Screenshot-2022-06-20-at-23-13-37.png" alt="Alt text" style="float: left" title="Optional title">
<img src="https://i.ibb.co/rs11TFr/Screenshot-2022-06-20-at-23-39-59.png" alt="Alt text" style="float: left" title="Optional title"> -->


## TODO
* Create example app
* Improve typings usage

