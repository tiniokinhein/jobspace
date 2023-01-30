import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack
} from "@mui/material";

const AdditionalAnswerDialog = ({open, handelCloseQuestion, questions}) => {

    return (
        <Dialog
            maxWidth="sm"
            open={open}
            onClose={handelCloseQuestion}
            disableScrollLock={true}
        >
            <DialogTitle>Additional Questions.</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    {questions && questions.map((question) => {
                        return (
                            <FormControl key={question.uuid}>
                                <FormLabel id="demo-row-radio-buttons-group-label">{question.question}</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={`${question.answer}`}
                                >
                                    <FormControlLabel value="1" control={<Radio disabled/>} label="Yes"/>
                                    <FormControlLabel value="0" control={<Radio disabled/>} label="No"/>
                                </RadioGroup>
                            </FormControl>
                        )
                    })}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handelCloseQuestion}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AdditionalAnswerDialog