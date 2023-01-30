import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoadingBar from 'react-top-loading-bar'
import {clearProgress} from "../../store/slices/progress";

const TopLoadingBar = () => {

    const dispatch = useDispatch();
    const [process, setProcess] = useState(0);
    const {progress} = useSelector((state) => state.progress)

    useEffect(() => {
        setProcess(progress);
        // eslint-disable-next-line
    }, [progress]);

    return (
        <LoadingBar
            color="#195DCC"
            progress={process}
            height={4}
            onLoaderFinished={() => {
                setProcess(0);
                dispatch(clearProgress())
            }}
        />
    );
}

export default TopLoadingBar;