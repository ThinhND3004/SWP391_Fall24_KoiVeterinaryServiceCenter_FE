/* eslint-disable indent */
/* eslint-disable semi */
import { TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { BLUE_COLOR, GRAY_COLOR, INPUT_FIELD_COLOR } from '~/theme';

function TextAreaComponent({ value, setValue }) {

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <TextareaAutosize
            id="exampleTextArea"
            value={value}
            onChange={handleChange}
            placeholder="Type here..."
            multiline
            minRows={4} // Controls the width of the textarea
            style={{
                backgroundColor: INPUT_FIELD_COLOR,
                width: '100%', // Full width styling
                padding: '10px',
                fontSize: '16px',
                borderRadius: '14px',
                border: `1px solid ${GRAY_COLOR}`,
                resize: 'both' // Allows resizing   
            }}
        />
        // eslint-disable-next-line indent
    );
}

export default TextAreaComponent;