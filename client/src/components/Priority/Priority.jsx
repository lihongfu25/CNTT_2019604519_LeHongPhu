import React from "react";
import { ReactSVG } from "react-svg";
const priorities = {
    LOWEST: 1,
    LOW: 2,
    MEDIUM: 3,
    HIGH: 4,
    HIGHEST: 5,
};
const renderPriorityText = (level) => {
    let priority = "";
    switch (level) {
        case priorities.LOWEST:
            priority = "Lowest";
            break;
        case priorities.LOW:
            priority = "Low";
            break;
        case priorities.MEDIUM:
            priority = "Medium";
            break;
        case priorities.HIGH:
            priority = "High";
            break;
        case priorities.HIGHEST:
            priority = "Highest";
            break;
        default:
            priority = "Unknown";
    }
    return priority;
};
const renderPriorityIcon = (level) => {
    let icon = "";
    switch (level) {
        case priorities.LOWEST:
            icon = "priority-lowest";
            break;
        case priorities.LOW:
            icon = "priority-low";
            break;
        case priorities.MEDIUM:
            icon = "priority-medium";
            break;
        case priorities.HIGH:
            icon = "priority-high";
            break;
        case priorities.HIGHEST:
            icon = "priority-highest";
            break;
        default:
            icon = "priority-medium";
    }
    return icon;
};
const Priority = ({ level, showText = true }) => {
    return (
        <div className='d-flex align-items-center'>
            <ReactSVG
                src={`/images/icon/${renderPriorityIcon(level)}.svg`}
                className='react-svg'
            />
            {showText && (
                <div className='ms-2'>
                    <p
                        className={`mb-0 fs-7 priority-${
                            level < priorities.MEDIUM
                                ? "1"
                                : level === priorities.MEDIUM
                                ? "2"
                                : "3"
                        }`}
                    >
                        {renderPriorityText(level)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Priority;
