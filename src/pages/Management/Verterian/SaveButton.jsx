import { Button } from "@mui/material";
import api from "~/config/axios";

function turn_string_to_date(day_string) {
    let [hours, minute] = day_string.split(":").map(Number);
    let time = new Date();
    time.setHours(hours, minute, 0, 0);
    return time;
}

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

        for (i=i+1; i < selectedElements.length; i++) {
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
                hour: start_time.getHours(),
                minute: start_time.getMinutes().toString().padStart(2, '0'),
            },
            endTime: {
                hour: continous_time.getHours(),
                minute: continous_time.getMinutes().toString().padStart(2, '0')
            }
        });
    }

    await api.post('/timetable/save', {
        data
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}


function SaveButton(){
    return (
        <Button sx={{padding: '10px', backgroundColor: 'green', color: 'white'}} onClick={save_button_clicked}>
            Save
        </Button>
    )
}

export default SaveButton;