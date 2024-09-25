import { Button } from "@mui/material";

function turn_string_to_date(day_string) {
    let [hours, minute] = day_string.split(":").map(Number);
    let time = new Date();
    time.setHours(hours, minute, 0, 0);
    return time;
}

function save_button_clicked() {
    let selectedElements = document.querySelectorAll(".selected");

    let data = [];

    for (let i = 0; i < selectedElements.length;) {
        const label = selectedElements[i].getAttribute("label");
        const day = label.split(" ")[0];
        const start_time = turn_string_to_date(label.split(" ")[1]);

        // Clone start_time to avoid mutating the original start_time
        let continous_time = new Date(start_time.getTime());
        continous_time.setMinutes(continous_time.getMinutes() + 30);
        i++;
        for (; i < selectedElements.length; i++) {
            const temp_label = selectedElements[i].getAttribute("label");
            const next_day = temp_label.split(" ")[0];
            const next_time = turn_string_to_date(temp_label.split(" ")[1]);

            // Time in the current day is continuous with 30 minutes
            console.log(`Continous time: ${continous_time.getHours() + ':' + continous_time.getMinutes().toString().padStart(2, '0')} AND Next time: ${next_time.getHours() + ':' + next_time.getMinutes().toString().padStart(2, '0')}`)
            if (day === next_day && continous_time.getTime() == next_time.getTime()) {
                console.log("All true;")
                continous_time.setMinutes(continous_time.getMinutes() + 30);
            } else break;

        }

        data.push({
            day_of_week: day,
            start_time: start_time.getHours() + ':' + start_time.getMinutes().toString().padStart(2, '0'),
            end_time: continous_time.getHours() + ':' + continous_time.getMinutes().toString().padStart(2, '0')
        });
    }

    console.log(data);
    return data;
}


function SaveButton(){
    return (
        <Button sx={{padding: '10px', backgroundColor: 'green', color: 'white'}} onClick={save_button_clicked}>
            Save
        </Button>
    )
}

export default SaveButton;