import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Avatar, IconButton, Menu, MenuItem} from "@mui/material";
import EnFlagIcon from "../../assets/images/global.svg";
import MmFlagIcon from "../../assets/images/mm.svg";
import {useDispatch, useSelector} from "react-redux";
import {languageActions} from "../../store";
import {useTranslation} from "react-i18next";

const LanguageMenu = () => {

    const {i18n} = useTranslation();
    const [langIcon, setLangIcon] = useState(EnFlagIcon);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentLang, setCurrentLang] = useState({});
    const {languages} = useSelector(x => x.languages);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(languageActions.getAll());
    }, [dispatch]);

    useEffect(() => {
        initFetch()
    }, [initFetch])


    useEffect(() => {
        if (localStorage.getItem('lang') === "my") {
            setLangIcon(MmFlagIcon);
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const languageChangedHandler = (event, uuid) => {
        const languageIndex = languages.findIndex(language => {
            return language.uuid === uuid;
        });

        const language = {
            ...languages[languageIndex]
        }

        setCurrentLang(language ?? {});

        const lng = language.short_name ?? 'en';

        localStorage.setItem('lang', lng)

        i18n.changeLanguage(lng).then(() => {
            window.location.reload();
        });
    };

    return (
        <Fragment>
            <IconButton onClick={handleClick} aria-label="lang" size="medium">
                <Avatar src={currentLang.image ? currentLang.image : langIcon} sx={{width: 24, height: 24}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="lang-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                disableScrollLock={true}
            >
                {languages.length && languages.map((language) => (
                    <MenuItem key={language.uuid} onClick={event => languageChangedHandler(event, language.uuid)}>
                        <Avatar src={language.image} className="avatar-size"/>{language.name}
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
};

export default LanguageMenu;