import { Component } from "vue";

export type MessageType = "success" | "error" | "warning" | "info";

interface MessageOptionInfo {
    id?: number;
    message: string;
    type?: MessageType;
    offset?: number;
    onClose?: Function;
    duration?: number;
    closable?: boolean;
    icon?: Component;
}

export type XMessageOptionsType = MessageOptionInfo | string;
