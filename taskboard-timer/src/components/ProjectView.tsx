import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { HomeButton } from "./HomeButton";
import { useState } from "react";
import useProjects from "../hooks/useProjects";

const ProjectView = () => {
    let { id } = useParams();
    const [projectQuery, setProjectQuery] = useState({
        id: id ? parseInt(id, 10) : undefined,
    });
    const { data, isLoading, error } = useProjects(projectQuery);

    return (
        <>
            <HomeButton />
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography>Error: {error}</Typography>}

            {data && data[0] && (
                <>
                    <Typography variant="h2">{data[0].name}</Typography>
                    <Typography variant="subtitle1">
                        {data[0].client}
                    </Typography>
                    <Typography variant="body1">
                        {data[0].description}
                    </Typography>
                    {/* Display other project details here */}
                </>
            )}

            <Typography variant="caption">Project ID: {id}</Typography>
        </>
    );
};

export default ProjectView;
