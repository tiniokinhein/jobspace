import React, {useState} from 'react';
import {Button, Box, Stack, Typography, Card, CardContent} from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

const BlobViewer = ({blobContent}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: 5 }}>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: '10px',
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <CardContent
                        sx={{
                            p: 0,
                            "&:last-child": {
                                paddingBottom: 0
                            }
                        }}
                    >
                        <Document align='center' file={window.URL.createObjectURL(blobContent)} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </CardContent>
                </Card>
            </Box>
            <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'center', mb: 2, alignItems: 'center' }}>
                <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
                    <ArrowLeftIcon />
                </Button>
                <Typography fontSize="14px" fontWeight={400}>
                    Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                </Typography>
                <Button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numPages}>
                    <ArrowRightIcon />
                </Button>
            </Stack>
        </Box>
    )
}

export default BlobViewer;