import React from "react";
import { BulletWordCloud } from "./bullet_word_cloud";

export class Root extends React.Component {
    render = () => {
        return (
            <div>
                <BulletWordCloud id="bullet_word_cloud"/>
            </div>
        )
    }
}