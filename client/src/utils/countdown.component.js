import React, { useEffect, useState } from "react";

const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (hours.toString().length === 1) {
        hours = `0${hours}`;
    }
    if (minutes.toString().length === 1) {
        minutes = `0${minutes}`;
    }
    if (seconds.toString().length === 1) {
        seconds = `0${seconds}`;
    }
    if (completed) {
        return <span>Auction has closed</span>;
    } else {
        return (
            <span>
                {days < 1
                    ? hours + ":" + minutes + ":" + seconds
                    : days + " days "}
            </span>
        );
    }
};

export default countdownRenderer;