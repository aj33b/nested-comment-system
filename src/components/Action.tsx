import {Button, ButtonPropsColorOverrides} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";

interface ActionProps {
    handleClick: () => void;
    type: string;
    color?: OverridableStringUnion<"inherit" | "error" | "primary" | "secondary" | "success" | "info" | "warning", ButtonPropsColorOverrides>;
    endIcon?:any
}

const Action = ({handleClick, type, color, endIcon}: ActionProps) => {
    return (
        <Button type={"submit"} sx={{margin: 0, padding: 0, paddingX: 1, textTransform: "initial"}} variant={"text"}
                onClick={handleClick} color={color} endIcon={endIcon}><span className={"action-button"}>{type}</span></Button>
    );
}

export default Action;