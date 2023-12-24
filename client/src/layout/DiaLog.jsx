import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function DiaLog({ open = false, handleOpen = () => { }, onClick = () => { }, header = '', title = '', ...props }) {
    return (
        <>
            <Dialog open={open} handler={handleOpen} className="pt-2 rounded-sm">
                <div className="flex items-center justify-center">
                    <DialogHeader>{header}</DialogHeader>
                </div>
                <DialogBody>
                    <div className="flex items-center justify-center font-normal">
                        {title}
                    </div>
                </DialogBody>
                <DialogFooter className="flex gap-5 items-center justify-center">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                    >
                        <span>Hủy</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={onClick}>
                        <span>Chấp nhận</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}