import { createContext } from "react"
import { RootStore } from "./root"

export const RootStoreContext = createContext<null | RootStore>(null)
