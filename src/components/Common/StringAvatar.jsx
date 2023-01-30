import React from 'react';
import { Avatar } from "@mui/material";

const StringAvatar = ({name, width, height}) => {
    function stringAvatar(name) {
        if (name) {

            if (name.split(' ').length > 1) {
                return {
                    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
                };
            } else {
                return {
                    children: `${name.split(' ')[0][0]}`
                }
            }
        } else {
            return {
                children: null
            }
        }
    }

    return (
        <Avatar {...stringAvatar(name)} sx={{width: {width}, height: {height}}}/>
    );
}

export default StringAvatar;