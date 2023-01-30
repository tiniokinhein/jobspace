import React, {useCallback, useEffect, useState} from 'react';
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Menu,
    MenuItem,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import {useDispatch, useSelector} from "react-redux";
import {setProgress} from "../../../store/slices/progress";
import {recruitmentActions} from "../../../store";
import SeekerCard from "./SeekerCard";
import {useParams} from "react-router-dom";
import StyledPagination from "../../Common/StyledPagination";
import {helper} from "../../../helpers";

const Applicants = ({overview}) => {

    const dispatch = useDispatch();
    const {postedJobId} = useParams();
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pageCnt, setPageCnt] = useState(1);
    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(null);
    const {applicants} = useSelector((state) => state.recruitment)

    const fetchApplicants = useCallback((limit, pageCnt, filter, search) => {
        const params = helper.postJobParams(limit, pageCnt, null, filter, search);
        dispatch(recruitmentActions.getApplicants({uuid: postedJobId, params: params})).then(res => {
            const {metadata} = res.payload;
            const limit = metadata.info?.limit;
            const total = metadata.info?.total;
            setLimit(limit);
            setCount(Math.ceil(total / limit));
        });
        // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
        dispatch(setProgress(30));
        fetchApplicants(limit, pageCnt, filter, search);
        setLoading(false);
        dispatch(setProgress(100));
        // eslint-disable-next-line
    }, [fetchApplicants, pageCnt, search, filter]);

    const handlePageChange = (event, value) => {
        setPageCnt(value);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (filter) => {
        setAnchorEl(null);

        if (filter) {
            setFilter(filter)
        } else {
            setFilter(null);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value)

        if (event.target.value) {
            setPageCnt(1)
        }
    }

    return (
        <Box
            sx={{
                my: {xs: 3, sm: 2},
                borderRadius: '10px',
                background: '#ffffff',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
            }}
            flexGrow={1}
        >
            <Grid container sx={{p: {xs: 2, sm: 3}, mt: {sm: 2, md: 0}}} spacing={{xs: 1.5, sm: 3, md: 0}}>
                <Grid container spacing={1.5} item xs={12} md={7}>
                    <Grid item xs={12} sm={6}>
                        <Typography width={{xs: "100%"}} fontSize="18px" fontWeight={400} sx={{wordWrap: 'break-word'}}>
                            <Link underline="always">
                                {overview?.job_title}
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" justifyContent={{xs: "start", sm: "end"}} alignItems="start">
                        <Box sx={{
                            background: '#FFF0E3',
                            border: '1px solid #FF9635',
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'auto',
                            height: '31px',
                            minWidth: '120px',
                            mr: 1
                        }}>
                            <Visibility sx={{
                                mr: 1,
                                background: '#FF9635',
                                color: '#FFFFFF',
                                fontSize: '14px'
                            }}/>
                            <Typography
                                sx={{
                                    fontSize: {xs: "12px", sm: "14px"},
                                    fontWeight: 400
                                }}
                                component="span"
                            >
                                {overview?.view_count ?? 0} views
                            </Typography>
                        </Box>

                        <Box sx={{
                            background: '#E7FEED',
                            border: '1px solid #09962F',
                            borderRadius: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'auto',
                            height: '31px',
                            minWidth: '185px',
                        }}>
                            <Visibility sx={{
                                mr: 1,
                                background: '#FF9635',
                                color: '#FFFFFF',
                                fontSize: "14px"
                            }}/>
                            <Typography sx={{fontSize: {xs: "12px", sm: "14px"}, fontWeight: 400}}>
                                {overview?.analysis?.applied ?? 0} Total Applications
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} display="flex" flexDirection={{xs: "column", sm: "row"}}>
                        <Typography fontSize="13px" color="#A1A1A1" sx={{mr: 1}}>
                            Posted: {overview.posted_date} {overview.time && `(${overview.time}) |`}
                        </Typography>
                        <Typography fontSize="13px" color="#A1A1A1">
                            {overview.expired_date && `Expired: ${overview.expired_date}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                        <FormControl variant="outlined" size="large" color='secondary'
                                     sx={{width: {sm: '100%', md: '65%'}, borderRadius: '5px', height: '43px'}}>
                            <OutlinedInput
                                id='search'
                                type='text'
                                placeholder="Search By Keywords"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon aria-label="search" sx={{color: '#A2A2A2'}}/>
                                    </InputAdornment>
                                }
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': {borderColor: '#DADADA'},
                                    height: '43px',
                                    borderRadius: '5px',
                                }}
                                onChange={handleSearchChange}
                            />
                        </FormControl>

                        <IconButton
                            size="large"
                            aria-label="filter"
                            id="filter-button"
                            aria-controls={open ? 'filter-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <FilterListIcon/>
                        </IconButton>

                        <Menu
                            id="filter-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => handleClose(0)}
                            MenuListProps={{
                                'aria-labelledby': 'filter-button',
                            }}
                            disableScrollLock={true}
                        >
                            <MenuItem onClick={() => handleClose(0)}>All</MenuItem>
                            <MenuItem onClick={() => handleClose(1)}>1 star</MenuItem>
                            <MenuItem onClick={() => handleClose(2)}>2 stars</MenuItem>
                            <MenuItem onClick={() => handleClose(3)}>3 stars</MenuItem>
                            <MenuItem onClick={() => handleClose(4)}>4 stars</MenuItem>
                            <MenuItem onClick={() => handleClose(5)}>5 stars</MenuItem>
                        </Menu>
                    </Stack>
                </Grid>
            </Grid>

            <Grid container sx={{p: {xs: 2, sm: 3}}} spacing={3}>
                {(!loading && applicants.length > 0) &&
                    applicants.map(applicant => (
                        <SeekerCard
                            applicant={applicant}
                            dRating={applicant.rating}
                            uuid={postedJobId}
                            key={applicant.user_id}
                            params={helper.postJobParams(limit, pageCnt, null, filter, search)}
                        />
                    ))
                }

                {(!loading && applicants.length < 1) &&
                    <Grid item xs={12}>
                        <Typography>There is no applicant.</Typography>
                    </Grid>
                }

                {applicants.length > 0 &&
                    <Grid item xs={12}>
                        <StyledPagination
                            count={count}
                            pageCnt={pageCnt}
                            handlePageChange={handlePageChange}
                        />
                    </Grid>
                }
            </Grid>
        </Box>
    );
}

export default Applicants;