import { HANDLE_OPEN, HANDLE_CLOSE } from "../actions/Types";
import { CREATE_CHANNEL } from "../actions/Types";

const ModalReducer = (open = false, action) => {
  switch (action.type) {
    case HANDLE_OPEN:
      return true;
    case HANDLE_CLOSE:
      return false;
    case CREATE_CHANNEL:
      return false;
    default:
      return open;
  }
};

export default ModalReducer;
