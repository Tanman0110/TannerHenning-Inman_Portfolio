import React from "react";
import { smoothScrollToId } from "./SmoothScroll";
import "./To_Next_Component_Button.css";

type ToNextComponentButtonProps = {
    targetId: string;
    label: string;
    headerOffset?: number;
    className?: string;
};

export default function ToNextComponentButton({
    targetId,
    label,
    headerOffset = 85,
    className = "",
}: ToNextComponentButtonProps) {

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        smoothScrollToId(targetId, headerOffset);
    };

    const combinedClassName =
        "to-next-btn" + (className ? ` ${className}` : "");

    return (
        <a
            href={`#${targetId}`}
            className={combinedClassName}
            onClick={handleClick}
        >
            {label}
        </a>
    );
}