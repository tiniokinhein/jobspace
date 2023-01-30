import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import {useDispatch, useSelector} from "react-redux";
import {setProgress} from "../../../store/slices/progress";
import {authActions} from "../../../store";
import {helper} from "../../../helpers";
import Cookie from "js-cookie";
import BlobViewer from "../../../components/Common/BlobViewer";
import {Download} from "@mui/icons-material";

const CVDownloadFirst = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);

    const [cvData, setCvData] = useState(null);
    const downloadFile = () => {
        fetch(`${process.env.REACT_APP_API_URL}/job-seeker/generate-cv/first/${user.uuid}`, {
            method: "get", headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json", 'X-XSRF-TOKEN': decodeURIComponent(Cookie.get('XSRF-TOKEN')),
            },
        }).then(response => response.blob()).then(blob => {
            setCvData(blob);
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "CV.pdf";
            a.click();
        });
    }

    const fetchCV = (uuid) => {
        fetch(`${process.env.REACT_APP_API_URL}/job-seeker/generate-cv/first/${uuid}`, {
            method: "get", headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json", 'X-XSRF-TOKEN': decodeURIComponent(Cookie.get('XSRF-TOKEN')),
            },
        }).then(response => response.blob()).then(blob => {
            setCvData(blob)
        });
    }
    
    const iniFetch = useCallback(() => {
        dispatch(authActions.getUser()).then(response => {
            fetchCV(response.payload.data?.uuid);
        })
    }, [dispatch]);

    useEffect(() => {
        dispatch(setProgress(30))
        iniFetch()
        dispatch(setProgress(100))
        // eslint-disable-next-line
    }, [iniFetch])

    return (<Fragment>
        <SEO title="Generate CV"/>
        <Box
            sx={{
                borderRadius: '10px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white'
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px'}}>
                <Button variant="outlined" onClick={() => helper.handleBackClick()}> Back</Button>
                <Button variant="contained" sx={{
                    backgroundColor: '#00A0DC', border: '1px solid #00A0DC', borderRadius: '5px'
                }} onClick={downloadFile}
                        startIcon={<Download/>}> Download PDF</Button>
            </Box>
            {cvData ? <BlobViewer blobContent={cvData}/> : ''}
        </Box>
    </Fragment>);
}

export default CVDownloadFirst;