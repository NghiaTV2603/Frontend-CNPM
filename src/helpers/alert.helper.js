import {useRef,useContext} from "react";

function alertMessage(){

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleAlert } = useContext();
  handleAlert()
  console.log('1')
}
export default alertMessage
