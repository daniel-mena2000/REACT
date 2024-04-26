

import { useState } from "react"
export function TwitterCard2({name,userName,isFollowing}){

    const [textFollow, setTextFollow] = useState(isFollowing)

    const text = textFollow ? "Dejar de Seguir" : "seguir";
    const textColor = textFollow ? "rojo" :  "verde";

    function following(){
        setTextFollow(!textFollow)
    }

    return(
        <>
            <section className="twitter-card-template">
                <img  src={`https://unavatar.io/${userName}`} alt="" className="twitter-card-img-profile"/>

                <div className="twitter-card-info">
                    <p><strong>{name}</strong></p>
                    <span>{`@${userName}`}</span>
                </div>

                <button onClick={following} className={textColor}>{text}</button>
            </section>
        
        </>
    )
}