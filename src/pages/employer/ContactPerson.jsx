import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Divider, Grid, Typography,} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {employerContactPersonActions} from "../../store";
import {setProgress} from "../../store/slices/progress";
import SEO from "../../components/Common/SEO";
import ContactPersonForm from "../../components/Employer/ContactPersonForm";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Link as RouterLink} from "react-router-dom";
import ContactPersonShow from "../../components/Employer/ContactPersonShow";

function ContactPerson() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {employer_contact_persons} = useSelector(state => state.employer_contact_persons)

    const fetchContactPerson = useCallback(() => {
        dispatch(setProgress(50));
        dispatch(employerContactPersonActions.getAll()).then(() => {
            dispatch(setProgress(100));
            setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
        fetchContactPerson();
    }, [fetchContactPerson])

    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <SEO title="Contact Person"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>

                <Box
                    sx={{
                        py: 3,
                        px: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="h5" color="primary">Contact Person</Typography>
                    {(!loading && Object.keys(employer_contact_persons).length > 0) &&
                        <Button
                            variant="text"
                            startIcon={<BorderColorIcon/>}
                            sx={{
                                fontSize: '14px', fontWeight: 400,
                            }}
                            component={RouterLink}
                            to={`/employers/contact-person/${employer_contact_persons.uuid}`}
                        >
                            Edit
                        </Button>
                    }
                </Box>
                <Divider/>
                <Grid container>
                    {(!loading && Object.keys(employer_contact_persons).length > 0) &&
                        <Grid item xs={12}><ContactPersonShow data={employer_contact_persons}/></Grid>
                    }

                    {(!loading && Object.keys(employer_contact_persons).length < 1) &&
                        <Grid item xs={12}><ContactPersonForm/></Grid>
                    }
                </Grid>
            </Box>
        </Box>
    );
}

export default ContactPerson;
