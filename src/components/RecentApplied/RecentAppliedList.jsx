import React, {useEffect, useState} from 'react';
import {Box, Grid, List, ListItem, Pagination, styled, Typography} from "@mui/material";
import RecentAppliedPaper from "./RecentAppliedPaper";
import RecentAppliedTitle from "../RecentApplied/RecentAppliedTitle";
import RecentApplyDataService from "../../services/recent.apply.service";

const StyledPagination = styled(Pagination)(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            borderColor: "#E0E0E0", margin: "10px",
        }
    }
}));

const RecentAppliedList = () => {

    const [limit, setLimit] = useState(0);
    const [count, setCount] = useState(0);
    const [pageCnt, setPageCnt] = useState(1);
    const [recentApplies, setRecentApplies] = useState([]);

    useEffect(() => {
        (async () => {
            const params = requestParams(limit, pageCnt);
            await RecentApplyDataService.get(params).then((r) => {
                const limit = r.metadata.info?.limit;
                const total = r.metadata.info?.total;

                setLimit(limit);
                setRecentApplies(r.data);
                setCount(Math.ceil(total / limit));
            });
        })();
        // eslint-disable-next-line
    }, [pageCnt]);

    const requestParams = (limit, pageCnt) => {
        let params = {};

        if (limit) {
            params['limit'] = limit;
        }

        if (pageCnt) {
            params['offset'] = (pageCnt - 1) * limit;
        }

        return params;
    }

    const handlePageChange = (event, value) => {
        setPageCnt(value);
    }

    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    p: 4,
                    borderRadius: "10px",
                    border: "1px solid #EBEBEB",
                    background: "white",
                }}
            >
                <Grid container display="flex">
                    <Grid item xs={12} sx={{px: '15px'}}>
                        <RecentAppliedTitle/>
                    </Grid>
                    <Grid item xs={12}>
                        {recentApplies.length > 0 ?
                            <List>
                                {recentApplies.map((item) => (
                                    <ListItem key={item.uuid}>
                                        <RecentAppliedPaper data={item}/>
                                    </ListItem>
                                ))}
                            </List> :
                            <Box paddingX='20px'>
                                <Typography variant="h6">There is no data.</Typography>
                            </Box>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Box justifyItems="right" display="flex" justifyContent="right">
                            <StyledPagination
                                count={count}
                                page={pageCnt}
                                variant="outlined"
                                shape="rounded"
                                siblingCount={1}
                                boundaryCount={1}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

export default RecentAppliedList;