import { Unity, useUnityContext } from "react-unity-webgl"

const UnityGame = () => {
    const {unityProvider} = useUnityContext({
        loaderUrl: "/public/build/WebGL.loader.js",
        dataUrl:"/public/build/WebGL.data.unityweb",
        frameworkUrl:"/public/build/WebGL.framework.js.unityweb",
        codeUrl: "/public/build/WebGL.wasm.unityweb"
    })

    return(
        <Unity unityProvider={unityProvider}/>
    )
}

export default UnityGame;