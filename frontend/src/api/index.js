import apiAccount from "./account";
import apiAuth from "./auth";
import apiFiles from "./files";
import apiMessages from "./messages";
import apiRecordBook from "./recordBook";
import apiSchedule from "./schedule";
import apiSubject from "./subjects";

export default {
    ...apiAccount,
    ...apiAuth,
    ...apiFiles,
    ...apiMessages,
    ...apiRecordBook,
    ...apiSchedule,
    ...apiSubject
}