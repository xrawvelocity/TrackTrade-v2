import moment from "moment";

export const formatTime = (time) => {
    console.log(time);
    return moment(time).format("MM/DD/YYYY hh:mm A");
};
