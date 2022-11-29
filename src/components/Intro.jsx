import React, {useEffect} from "react";
//src: https://www.sdsc.edu/terms_of_use.html

const Intro = () => {
    useEffect(() => {
        document.title="LIMO";
    })
    return (
        <div className="paddings127">
            <h1 className="page-header">About</h1>                   
        </div>
    );
};

export default Intro;