import React from "react";
import { Chip } from "@mui/material";

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

export const renderChipStatus = (status) => {
    const statusToColor = {
      'CREATED': 'info',
      'STOPPED': 'error',
      'INPROGRESS': 'primary',
      'COMPLETED': 'secondary'
    };
    const statusToText = {
      'CREATED': 'Не начата',
      'STOPPED': 'Остановлена',
      'INPROGRESS': 'Запущена',
      'COMPLETED': 'Завершена'
    };
    const color = statusToColor[status];
    const text = statusToText[status];
    return (
      <Chip label={text} variant="outlined" color={color} size="small" />
    )
}


