import React from "react";
import "../styles/pages/loading.scss";
const Loading = () => {
    return (
        <div className='loading-page position-absolute top-0 bottom-0 start-0 end-0 bg-secondary bg-opacity-50'>
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                <div className='loader loader1'>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
