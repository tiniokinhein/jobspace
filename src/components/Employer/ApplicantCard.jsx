import React from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    List,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {Link as RouterLink} from "react-router-dom";
import {applicantActions} from "../../store";
import Cookie from "js-cookie";
import {useDispatch} from "react-redux";

const ApplicantCard = ({applicant}) => {

    const dispatch = useDispatch();

    const downloadFile = () => {
        dispatch(applicantActions.getResume(applicant.user_id)).then(res => {
            if (res.payload.data?.path) {
                fetch(`${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${res.payload.data?.path}`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            'X-XSRF-TOKEN': decodeURIComponent(Cookie.get('XSRF-TOKEN')),
                        },
                    }).then(response => response.blob()).then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = applicant.name;
                    a.click();
                })
            }
        });
    }

    return (
        <Card elevation={3} sx={{borderRadius: '5px'}}>
            <CardHeader
                avatar={
                    applicant?.profile_img ?
                        <Avatar sx={{width: 55, height: 55}} alt="JD" src={applicant?.profile_img}/> :
                        <Avatar sx={{width: 55, height: 55}}>{applicant?.name}</Avatar>
                }
                title={<Typography fontSize="17px" fontWeight={500}>{applicant?.name}</Typography>}
                subheader={<Typography fontSize="12px" fontWeight={500}
                                       color="#A1A1A1">{applicant?.job_title}</Typography>}
            />
            <CardContent sx={{pt: 0, minHeight: "130px"}}>
                <Typography fontSize="14px" fontWeight={500}>{applicant?.title}</Typography>
                <Stack>
                    <List>
                        <ListItem sx={{px: 0, py: 0.5}}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <FiberManualRecordIcon sx={{fontSize: '10px', color: '#A1A1A1'}}/>
                                <Typography fontSize="12px" fontWeight={500} color="#A1A1A1">
                                    {applicant?.education ?? '---'}
                                </Typography>
                            </Stack>
                        </ListItem>
                        <ListItem sx={{px: 0, py: 0.5}}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <FiberManualRecordIcon sx={{fontSize: '10px', color: '#A1A1A1'}}/>
                                <Typography fontSize="12px" fontWeight={500} color="#A1A1A1">
                                    {applicant?.experiences ?? '---'}
                                </Typography>
                            </Stack>
                        </ListItem>
                        <ListItem sx={{px: 0, py: 0.5}}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <FiberManualRecordIcon sx={{fontSize: '10px', color: '#A1A1A1'}}/>
                                <Typography fontSize="12px" fontWeight={500} color="#A1A1A1">
                                    {applicant?.age ?? '---'}
                                </Typography>
                            </Stack>
                        </ListItem>
                    </List>
                </Stack>
            </CardContent>
            <CardActions sx={{background: '#EBEBEB'}}>
                <Stack direction="row" justifyContent="space-evenly">
                    <Button
                        size="large"
                        color="primary"
                        component={RouterLink}
                        to={`/employers/applicants/${applicant?.user_id}/profile`}
                    >
                        Profile
                    </Button>
                    <Button size="large" color="primary" onClick={downloadFile}>
                        Download CV
                    </Button>
                    <Button
                        size="large"
                        color="primary"
                        component={RouterLink}
                        to={`/employers/applicants/${applicant?.user_id}/resume`}
                    >
                        View CV
                    </Button>
                </Stack>
                {/*<Button size="small">Move</Button>*/}
            </CardActions>
        </Card>
    )
};

export default ApplicantCard;