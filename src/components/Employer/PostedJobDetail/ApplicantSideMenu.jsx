import React, {Fragment, useState} from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Menu,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoveWarnDialog from "../MoveWarnDialog";
import EmptyWarnDialog from "./EmptyWarnDialog";
import {recruitmentActions} from "../../../store";
import {useDispatch} from "react-redux";
import StyledPagination from "../../Common/StyledPagination";

const NotSuitable = ({props}) => {

    const dispatch = useDispatch();
    const [to, setTo] = useState(null);
    const [toDes, setToDes] = useState(null);
    const [warnOpen, setWarnOpen] = useState(false);
    const [actionAnchorEl, setActionAnchorEl] = useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [emptyWarnOpen, setEmptyWarnOpen] = useState(false);

    const filterOpen = Boolean(filterAnchorEl);
    const actionOpen = Boolean(actionAnchorEl);

    const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActionAnchorEl(event.currentTarget);
    };

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFilterAnchorEl(event.currentTarget);
    }

    const handleActionClose = (event, reason) => {
        setActionAnchorEl(null);

        if (!reason) {
            let toDes;
            let {actionValue} = event.currentTarget.dataset;

            switch (actionValue) {
                case "1":
                    toDes = 'prescreen'
                    break;
                case "2":
                    toDes = "interview";
                    break;
                case "3":
                    toDes = 'shortlist';
                    break;
                case "4":
                    toDes = "hired"
                    break;
                case "5":
                    toDes = "not suitable";
                    break;
                case "6":
                    toDes = "considering"
                    break;
                case "7":
                    toDes = "candidate"
                    break;
                default:
                    toDes = 'candidate'
                    break;
            }

            setToDes(toDes);
            setTo(actionValue);
            setWarnOpen(true);
        }
    }

    const handleFilterClose = (filter) => {
        setFilterAnchorEl(null);
        props.setFilter(filter);
    }

    const handleWarnClose = (event, reason) => {
        if (!reason) {
            setWarnOpen(false);
        }
    };

    const handleWarnMove = () => {
        if (to) {
            setWarnOpen(false)

            if (props.checkedList.length < 1) {
                setEmptyWarnOpen(true);
            } else {
                dispatch(recruitmentActions.updateApplicantType({
                    uuid: props.jobPostId,
                    data: {
                        type: to,
                        user_ids: props.checkedList,
                    }
                })).then(() => {
                    dispatch(recruitmentActions.getAnalysis(props.jobPostId));
                    props.setNeedToUpdate(true);
                });
            }
        }
    }

    const handleEmptyWarnMove = () => {
        setEmptyWarnOpen(false);
    }

    return (
        <Fragment>
            <Card
                variant="outlined"
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
                }}
            >
                <CardHeader
                    action={
                        <Fragment>
                            <IconButton
                                aria-label="actions"
                                id="action-button"
                                aria-controls={actionOpen ? 'actions-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={actionOpen ? 'true' : undefined}
                                onClick={handleActionClick}
                            >
                                <MoreVertIcon sx={{color: 'white'}}/>
                            </IconButton>
                            <Menu
                                id="action-item"
                                anchorEl={actionAnchorEl}
                                open={actionOpen}
                                onClose={handleActionClose}
                                MenuListProps={{
                                    'aria-labelledby': 'action-button',
                                }}
                                disableScrollLock={true}
                            >
                                {!props.hideCandidate &&
                                    <MenuItem onClick={handleActionClose} data-action-value="7">Candidate</MenuItem>
                                }

                                {!props.hidePrescreen &&
                                    <MenuItem onClick={handleActionClose} data-action-value="1">Prescreen</MenuItem>
                                }

                                {!props.hideConsidering &&
                                    <MenuItem onClick={handleActionClose} data-action-value="6">Considering</MenuItem>
                                }

                                {!props.hideShortlisted &&
                                    <MenuItem onClick={handleActionClose} data-action-value="3">Shortlisted</MenuItem>
                                }
                                
                                {!props.hideInterview &&
                                    <MenuItem onClick={handleActionClose} data-action-value="2">Interview</MenuItem>
                                }

                                {!props.hideHired &&
                                    <MenuItem onClick={handleActionClose} data-action-value="4">Hired</MenuItem>
                                }

                                {!props.hideNotSuitable &&
                                    <MenuItem onClick={handleActionClose} data-action-value="5">Not Suitable</MenuItem>
                                }
                            </Menu>
                        </Fragment>
                    }
                    title={<Typography color="white">{props.title}</Typography>}
                    sx={{
                        background: 'linear-gradient(91.56deg, #00A0DC 0%, #195DCC 113.37%)',
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                />
                <CardContent
                    sx={{
                        px: 0,
                        "&:last-child": {
                            paddingBottom: 0
                        }
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        paddingRight={1}
                        paddingLeft={2}
                    >
                        <Box
                            sx={{
                                background: '#EBEBEB',
                                border: '1px solid #C4C4C4',
                                borderRadius: '5px',
                                width: '144px',
                                height: '40px',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                display: 'flex'
                            }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="center"
                                   display="flex" width="100%">
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={props.handleParentCheck}
                                                checked={props.applicants.length === props.checkedList.length &&
                                                    props.applicants.length > 0}
                                                indeterminate={props.applicants.length > props.checkedList.length &&
                                                    props.checkedList.length > 0}
                                            />
                                        }
                                        label="Select All"
                                    />
                                </FormGroup>
                            </Stack>
                        </Box>

                        <IconButton
                            aria-label="filter"
                            id="filter-button"
                            aria-controls={filterOpen ? 'filter-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={filterOpen ? 'true' : undefined}
                            onClick={handleFilterClick}
                        >
                            <FilterListIcon/>
                        </IconButton>
                        <Menu
                            id="filter-item"
                            anchorEl={filterAnchorEl}
                            open={filterOpen}
                            onClose={handleFilterClose}
                            MenuListProps={{
                                'aria-labelledby': 'filter-button',
                            }}
                            disableScrollLock={true}
                        >
                            <MenuItem onClick={() => handleFilterClose(0)}>All</MenuItem>
                            <MenuItem onClick={() => handleFilterClose(1)}>1 star</MenuItem>
                            <MenuItem onClick={() => handleFilterClose(2)}>2 stars</MenuItem>
                            <MenuItem onClick={() => handleFilterClose(3)}>3 stars</MenuItem>
                            <MenuItem onClick={() => handleFilterClose(4)}>4 stars</MenuItem>
                            <MenuItem onClick={() => handleFilterClose(5)}>5 stars</MenuItem>
                        </Menu>
                    </Stack>

                    <Stack mt={1}>
                        <List>
                            {(props.applicants.length > 0) &&
                                props.applicants.map((item, index) => (
                                    <ListItem
                                        disablePadding
                                        key={item.user_id}
                                    >
                                        <ListItemButton
                                            sx={{
                                                py: 2,
                                            }}
                                            divider={props.applicants.length !== (index + 1)}
                                            onClick={() => props.handleApplicantClick(item.user_id)}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                width="100%"
                                            >
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar
                                                        src={`${item["profile_img"]}`}
                                                        sx={{
                                                            width: 70,
                                                            height: 70
                                                        }}
                                                    />
                                                    <Stack spacing={1}>
                                                        <Typography
                                                            component="span">{item.name}</Typography>
                                                        <Typography component="span" fontSize="12px"
                                                                    color="#A1A1A1">
                                                            {item.job_title}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>

                                                <Checkbox
                                                    checked={props.checkedList.includes(item.user_id)}
                                                    onChange={(event) => props.handleChildCheck(event, item.user_id)}
                                                    inputProps={{'aria-label': 'controlled'}}
                                                />
                                            </Stack>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Stack>
                </CardContent>
            </Card>

            <Box flexGrow={1}>
                <StyledPagination
                    count={props.count}
                    pageCnt={props.pageCnt}
                    handlePageChange={props.handlePageChange}
                    align="center"
                />
            </Box>

            <MoveWarnDialog open={warnOpen} handleClose={handleWarnClose} handleWarnMove={handleWarnMove} to={toDes}/>
            <EmptyWarnDialog open={emptyWarnOpen} handleEmptyWarnMove={handleEmptyWarnMove} title={props.title}/>
        </Fragment>
    );
}

export default NotSuitable;