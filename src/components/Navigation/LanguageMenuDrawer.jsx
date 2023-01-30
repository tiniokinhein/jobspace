import React, {useCallback, useEffect} from 'react';
import {Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {languageActions} from "../../store";
import {useTranslation} from "react-i18next";

const LanguageMenuDrawer = () => {
    const {i18n} = useTranslation();
    const {languages} = useSelector(x => x.languages);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(languageActions.getAll());
    }, [dispatch]);

    useEffect(() => {
        initFetch()
    }, [initFetch])

    const languageChangedHandler = (event, uuid) => {
        const languageIndex = languages.findIndex(language => {
            return language.uuid === uuid;
        });

        const language = {
            ...languages[languageIndex]
        }

        const lng = language.short_name ?? 'en';

        localStorage.setItem('lang', lng)

        i18n.changeLanguage(lng).then(() => {
            window.location.reload();
        });
    };

    return (
        <>
            {languages.length && languages.map((language) => (
                <ListItem disablePadding key={language.uuid}>
                    <ListItemButton onClick={event => languageChangedHandler(event, language.uuid)}>
                        <ListItemIcon sx={{paddingLeft: '3px'}}>
                            <Avatar src={language.image} className="avatar-size"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography fontSize="14px">
                                {language.name}
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );
};

export default LanguageMenuDrawer;