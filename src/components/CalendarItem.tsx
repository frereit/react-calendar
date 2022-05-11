import React from 'react';
import { Box, Card, Typography, CardActionArea, Dialog, DialogTitle, DialogContent, DialogContentText, Switch, FormGroup, FormControlLabel, DialogActions, Button } from "@mui/material";
import { LocationOn, Person, AccessTime, EventRepeat } from "@mui/icons-material";
import { format } from "date-fns";
import Event from "../models/Event";
import LabeledIcon from './LabeledIcon';

const CalendarItem = (props: { event: Event }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return <Card>
        <CardActionArea onClick={handleClickOpen}>
            {props.event.ignored ? (
                <Box padding={1}>
                    <Typography>{props.event.title}</Typography>
                </Box>
            ) : (
                <Box padding={1}>
                    <Typography variant="h5" component="h3">{props.event.title}</Typography>
                    <LabeledIcon icon={<AccessTime />} text={format(props.event.start, "HH:mm") + " - " + format(props.event.end, "HH:mm")} />
                    <LabeledIcon icon={<LocationOn />} text={props.event.location} />
                    <LabeledIcon icon={<Person />} text={props.event.speaker} />
                </Box>
            )}
        </CardActionArea>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{props.event.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <LabeledIcon icon={<EventRepeat />} text="Dienstag und Donnerstag" />
                    <LabeledIcon icon={<LocationOn />} text={props.event.location} />
                    <LabeledIcon icon={<Person />} text={props.event.speaker} />
                </DialogContentText>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked={!props.event.ignored} />} label="Im Vorlesungsplan anzeigen" />
                    <FormControlLabel control={<Switch />} label="Browser Benachrichtigungen" />
                    <FormControlLabel control={<Switch disabled />} label="E-Mail Benachrichtigungen" />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </Card>
}

export default CalendarItem;