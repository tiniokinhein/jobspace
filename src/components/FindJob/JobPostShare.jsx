import React, {useState} from "react"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {Box, Fade, Popper, IconButton} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import ViberIcon from "../../assets/icons/ViberIcon.svg";
import {FacebookShareButton, TelegramShareButton, WhatsappShareButton, ViberShareButton, TwitterShareButton} from "react-share";

const JobPostShare = ({title, iconSize="small"}) => {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopperClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    const url = window.location.href;

    return (
        <>
            <Popper id={id} open={open} anchorEl={anchorEl} transition onClick={handlePopperClick}>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps}>
                        <Box sx={{
                            display: 'flex',
                            mt: '10px',
                            justifyContent: 'space-between',
                            p: 1,
                            mx: 2,
                            bgcolor: '#F4F4F4',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: 1
                        }}>
                            <FacebookShareButton
                                url={url}
                                quote={title}
                                hashtag={"#JobSpace"}
                                description={"Myanmar’s Fastest Growing Job Site"}
                                className="share-btn"
                            >
                                <FacebookIcon sx={{color: '#0C4CAC'}} size/>
                            </FacebookShareButton>

                            <TelegramShareButton
                                url={url}
                                quote={title}
                                hashtag={"#JobSpace"}
                                description={"Myanmar’s Fastest Growing Job Site"}
                                className="share-btn"
                            >
                                <TelegramIcon sx={{color: '#00A0DC'}}/>
                            </TelegramShareButton>

                            <WhatsappShareButton
                                url={url}
                                quote={title}
                                hashtag={"#JobSpace"}
                                description={"Myanmar’s Fastest Growing Job Site"}
                                className="share-btn"
                            >
                                <WhatsAppIcon sx={{color: 'lightgreen'}}/>
                            </WhatsappShareButton>
                            <ViberShareButton
                                url={url}
                                quote={title}
                                hashtag={"#JobSpace"}
                                description={"Myanmar’s Fastest Growing Job Site"}
                                className="share-btn"
                            >
                                <img src={ViberIcon} alt='viber icon' width="22" height="22"/>                            </ViberShareButton>
                            <TwitterShareButton
                                url={url}
                                quote={title}
                                hashtag={"#JobSpace"}
                                description={"Myanmar’s Fastest Growing Job Site"}
                                className="share-btn"
                            >
                                <TwitterIcon sx={{color: '#00ACEE'}}/>
                            </TwitterShareButton>
                        </Box>
                    </Fade>
                )}
            </Popper>

            <IconButton onClick={handlePopperClick}>
                <ShareOutlinedIcon sx={{color: '#A1A1A1'}}
                                   aria-controls={open ? 'basic-menu' : undefined}
                                   aria-haspopup="true"
                                   aria-expanded={open ? 'true' : undefined}/>
            </IconButton>
        </>
    );
}

export default JobPostShare