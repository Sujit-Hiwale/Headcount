import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";
import { fetchAll } from "../../assets/FetchServices/SatisfactionSurvey";
import HRMButton from "../Button/HRMButton";
import SurveysTable from "./SurveysTable";
import SurveyDetails from "./SurveyDetails";
import NewSurveyPopup from "../PopupComponents/NewSurveyPopup";
import { colors, fonts } from "../../Styles";

/**
 * Displays the content for the results tab in the surveys menu.
 * 
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResultsTabContent({style}) {
    //The currently selected survey to be viewed (is null when no survey is selected)
    const [survey, setSurvey] = useState(null);
    //Flag determining whether the popup for creating a new survey should be displayed
    const [openNewSurvey, setOpenNewSurvey] = useState(false);
    const [surveyList, setSurveyList] = useState([]);

    useEffect(() => {
        getSurveys();
    }, []);

    function getSurveys() {
        fetchAll().then((data) => {
            console.log(data);
            setSurveyList(data);
        });
    };

    return (
        <Box sx={{...{
            marginTop: "40px",
            colors: colors.darkGrey,
            fontFamily: fonts.fontFamily
        }, ...style}}>
            {survey ?
                <>
                    {/*If a survey is selected, information on the currently selected survey is shown*/}
                    <SurveyDetails survey={survey} back={() => setSurvey(null)} />
                </> :
                <>
                    {/*Otherwise, a table displaying all the surveys is shown*/}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            marginBottom: "16px",
                            minWidth: "792px"
                        }}
                    >
                        <h3>Surveys</h3>
                        <HRMButton mode="primary" onClick={() => setOpenNewSurvey(true)}>Send new survey</HRMButton>
                    </Stack> 
                    <SurveysTable surveyList={surveyList} setSurvey={setSurvey} />
                </>
            }
            {/*Popup component for creating a new survey*/}
            <Dialog open={openNewSurvey} onClose={() => setOpenNewSurvey(false)}>
                <NewSurveyPopup close={() => setOpenNewSurvey(false)} />
            </Dialog>
        </Box>

    );
};

//Control panel settings for storybook
ResultsTabContent.propTypes = {};

//Default values for this component
ResultsTabContent.defaultProps = {
    style: {}
};