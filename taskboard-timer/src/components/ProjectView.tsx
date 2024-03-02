import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { HomeButton } from "./HomeButton";

const ProjectView = () => {
    let { id } = useParams();
    return (
        <>
            <HomeButton />
            <Typography variant="h1">ProjectView: {id}</Typography>
        </>
    );
};

export default ProjectView;
