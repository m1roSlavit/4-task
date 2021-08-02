import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import allActions from '../store/actions/index';

export function useActions(actions, deps) {
  const dispatch = useDispatch()
  return bindActionCreators(allActions, dispatch);
}