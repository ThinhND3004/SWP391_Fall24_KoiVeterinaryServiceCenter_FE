import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import api from "~/config/axios";
import { BLUE_COLOR } from "~/theme";

function turn_string_to_date(day_string) {
    let [hours, minute] = day_string.split(":").map(Number);
    let time = new Date();
    time.setHours(hours, minute, 0, 0);
    return time;
}

function SaveButton() {
    const [openAlert, setOpenAlert] = useState(false);

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    async function save_button_clicked() {
        let selectedElements = document.querySelectorAll(".selected");

        let data = [];

        for (let i = 0; i < selectedElements.length;) {
            const label = selectedElements[i].getAttribute("id");
            const day = label.split(" ")[0];
            const start_time = turn_string_to_date(label.split(" ")[1]);

            // Clone start_time to avoid mutating the original start_time
            let continous_time = new Date(start_time.getTime());
            continous_time.setMinutes(continous_time.getMinutes() + 30);

            for (i = i + 1; i < selectedElements.length; i++) {
                const temp_label = selectedElements[i].getAttribute("id");
                const next_day = temp_label.split(" ")[0];
                const next_time = turn_string_to_date(temp_label.split(" ")[1]);

                // Time in the current day is continuous with 30 minutes
                if (day === next_day && continous_time.getTime() === next_time.getTime()) {
                    continous_time.setMinutes(continous_time.getMinutes() + 30);
                } else break;

            }

            data.push({
                dayOfWeek: day,
                startTime: {
                    hours: start_time.getHours(),
                    minutes: start_time.getMinutes(),
                },
                endTime: {
                    hours: continous_time.getHours(),
                    minutes: continous_time.getMinutes()
                }
            });
        }

        await api.post('/timetables/save', {
            timetableDTOS: data
        })
            .then(() => {
                setOpenAlert(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
            <Button sx={{ padding: '10px', backgroundColor: BLUE_COLOR, color: 'white', borderRadius: '30px', width: '100px' }} onClick={save_button_clicked}>
                Save
            </Button>

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Timetable saved successfully!
                </Alert>
            </Snackbar>
        </>

    )
}

export default SaveButton;