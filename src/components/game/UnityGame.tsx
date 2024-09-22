import { Unity, useUnityContext } from "react-unity-webgl";

const UnityGame = () => {
    const {unityProvider} = useUnityContext({
        loaderUrl: `${process.env.NEXT_PUBLIC_GAME_BUILD_URL}WebGL.loader.js`,
        dataUrl: `${process.env.NEXT_PUBLIC_GAME_BUILD_URL}WebGL.data.unityweb`,
        frameworkUrl: `${process.env.NEXT_PUBLIC_GAME_BUILD_URL}WebGL.framework.js.unityweb`,
        codeUrl: `${process.env.NEXT_PUBLIC_GAME_BUILD_URL}WebGL.wasm.unityweb`
    })

    return(
        <div className="w-[80%] min-h-[calc(100vh_-_180px)]">
            <Unity className="w-full" unityProvider={unityProvider}/>
        </div>
    )
}

export default UnityGame;