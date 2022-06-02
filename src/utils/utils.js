const minuteToFormat = (minutes) => {
    const mins = minutes % 60;
    const hours = (minutes - mins) / 60;
    return [hours, mins]
}

export const minuteToFormatStr = (minutes) => {
    const [hours, mins] = minuteToFormat(minutes);
    const hoursStr = hours > 10 ? hours : `0${hours}`;
    const minsStr = mins > 10 ? mins : `0${mins}`;
    return `${hoursStr}.${minsStr}`;
}


