import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

// router context for keep control over route
export const RouterContext = createContext<{parentRoute: string, setParentRoute: Dispatch<SetStateAction<string>>}>({
    parentRoute: "/", // setting parent route for route that's is opened in modal so when clicked on overlay it returns to parent route
    setParentRoute:() => {}
});

// router provider props
interface RouterProvideProps{
    children: ReactNode
}

//  router context provider
const RouterProvider = ({children}: RouterProvideProps) => {

    const [parentRoute, setParentRoute] = useState("/");
    return(
        <RouterContext.Provider value={{parentRoute, setParentRoute}}>
            {children}
        </RouterContext.Provider>
    )
}


export default RouterProvider;