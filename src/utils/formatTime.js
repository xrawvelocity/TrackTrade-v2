import moment from "moment";

export const formatTime = (time) => {
    return moment(time).format("MM/DD/YYYY hh:mm A");
};
