import { useParams } from "react-router-dom";
import NewSprintForm from "./NewSprintForm";
import { Container } from "@mui/material";

const NewSprintPage = () => {
    const { id } = useParams();

    return (
        <Container>
            <NewSprintForm projectId={Number(id)} />
        </Container>
    );
};

export default NewSprintPage;
