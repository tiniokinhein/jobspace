import React, {useEffect, useState} from 'react';
import SiteContentService from "../services/site.content.service";
import {setProgress} from "../store/slices/progress";
import {Box, Card, CardContent, Container, Typography} from "@mui/material";
import {Parser} from "html-to-react";
import {useDispatch} from "react-redux";

const ContentComponent = ({type, title}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(setProgress(50));

        (async () => {
            await SiteContentService.all({type: type}).then((r) => setData(r.data));
        })();

        dispatch(setProgress(100));

        setLoading(false);

        // eslint-disable-next-line
    }, [dispatch, type]);

    return (
        <Container maxWidth={"xl"}>
            <Box
                sx={{
                    padding: {
                        lg: "0px 30px",
                        xl: 0,
                    },
                    my: 4,
                }}
            >
                <Typography variant={"h5"} sx={{mb: 3}}>{title}</Typography>
                <Box>
                    {!loading && data?.content && (
                        <Card sx={{borderRadius: "10px"}} elevations={2}>
                            <CardContent sx={{ px: '30px', py: '10px' }}>{Parser().parse(data?.content)}</CardContent>
                        </Card>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default ContentComponent;