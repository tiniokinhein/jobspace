import React, {Fragment, useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from '@mui/material'
import TopIndustryService from "../../services/top.industry.service";
import {Link as RouterLink, useNavigate} from 'react-router-dom';

function IndustryList() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [topIndustries, setTopIndustries] = useState([]);

    useEffect(() => {
        (async () => {
            await TopIndustryService.all({limit: 4, offset: 0}).then(r => {
                setTopIndustries(r.data);
                setLoading(false);
            })
        })()
    }, []);

    const handleClick = (uuid) => {
        navigate(`/find-jobs/?indId=${uuid}`, {replace: true});
    }

    return (
        <Box
            sx={{
                paddingX: '14px',
                paddingTop: '10px',
                borderRadius: '10px',
                bgcolor: '#fff',
                boxShadow: 2
            }}
        >
            {!loading &&
                <List
                    sx={{
                        maxWidth: 360,
                        bgcolor: 'background.paper'
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <Fragment>
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader-1"
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    color: '#20A6FC',
                                    fontWeight: 600,
                                    fontSize: '16px'
                                }}
                            >
                                Top Industries
                            </ListSubheader>
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader-2"
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    mb: 2
                                }}
                            >
                                <Divider sx={{width: '90%'}}/>
                            </ListSubheader>
                        </Fragment>
                    }
                >
                    {topIndustries.map((topIndustry, index) => (
                        <ListItemButton
                            key={topIndustry.uuid}
                            sx={{mb: 1}}
                            onClick={() => handleClick(topIndustry.uuid)}
                        >
                            <ListItemIcon>
                                <Grid item xs={4}>
                                    <Avatar alt={topIndustry.title} src={topIndustry.image} width={45} height={45}/>
                                </Grid>
                            </ListItemIcon>
                            <ListItemText primary={topIndustry.title}/>
                        </ListItemButton>
                    ))}

                    <ListItem>
                        <Divider sx={{width: '100%'}}/>
                    </ListItem>

                    <ListItem sx={{alignItems: 'center', justifyContent: 'center'}}>
                        <Link
                            sx={{color: '#20A6FC'}}
                            underline="hover"
                            component={RouterLink}
                            to="/top-industries"
                        >
                            See all
                        </Link>
                    </ListItem>
                </List>
            }
        </Box>
    )
}

export default IndustryList