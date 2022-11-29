import React, {useEffect} from "react";
//src: https://www.sdsc.edu/terms_of_use.html

const TermOfUse = () => {
    useEffect(() => {
        document.title="Terms of Use | LIMO";
    })
    return (
        <div className="paddings127">
            <h1 className="page-header">Terms of Use</h1>       
        </div>
    );
};

export default TermOfUse;