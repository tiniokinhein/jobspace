import React, {useState} from 'react'
import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import SynonymDataService from "../../services/synonym.service";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({setSearch, showIcon = false}) => {

    const {t} = useTranslation();
    const [synonyms, setSynonyms] = useState([]);

    const handleSearchChange = (value) => {
        setSearch(value)
    }

    const handleSearchInputChange = async (e) => {
        setSearch(e.target.value)
        if (e.target.value) {
            await SynonymDataService.get({keyword: e.target.value}).then(res => setSynonyms(res.data))
        }
    }

    return (
        <Autocomplete
            freeSolo
            id="search-autocomplete"
            options={Object.keys(synonyms).length > 0 ? synonyms.map((option) => option.name) : []}
            sx={{
                '.MuiAutocomplete-input': {
                    padding: '10px'
                }
            }}
            filterOptions={(x) => x}
            renderInput={
                (params) => <TextField
                    {...params}
                    placeholder={t('search_plh')}
                    variant={showIcon ? "outlined" : "standard"}
                    fullWidth
                    name="search"
                    id="search"
                    sx={{
                        paddingX: `${showIcon ? '0' : '10px'}`,
                        background: 'white',
                        borderRadius: '7px',
                        '.MuiInput-root': {
                            padding: '10px',
                        },
                        '&& .MuiInput-root:hover::before': {
                            borderBottom: 'none'
                        },
                        '&& .MuiInput-root:focus::before': {
                            borderBottom: 'none'
                        },
                        '&& .MuiInput-underline:before': {
                            borderBottom: 'none'
                        },
                    }}
                    InputProps={showIcon ? {
                        ...params.InputProps,
                        startAdornment: <InputAdornment position="start"><SearchIcon
                            color="secondary"/></InputAdornment>, style: {
                            borderRadius: '7px', borderColor: '#EBEBEB'
                        }
                    } : null}
                    onChange={handleSearchInputChange}
                />
            }
            onChange={(event, value) => handleSearchChange(value)}
        />
    );
};

export default SearchBox;