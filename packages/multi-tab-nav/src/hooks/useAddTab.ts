import { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { IPane } from '../App';

interface IProps {
  setPane: React.Dispatch<React.SetStateAction<IPane[]>>
}

type IAddProps = IProps & {
  type: IPane['type'];
}
const addTab = ({
  setPane,
  type
}: IAddProps) => {
  const history = useHistory();
  const addFunc = useCallback(() => {
    let cnt = -1;
    setPane((panes: IPane[]) => {
      cnt = panes.length;
      return [...panes, {
        key: `${cnt}`,
        title: `${type} tab ${cnt}`,
        type,
        url: `/${type.toLowerCase()}/${cnt}`
      }];
    });
    history.push(`/${type.toLowerCase()}/${cnt}`);
  }, [setPane]);
  return addFunc;
};


export const useAddCatTab = ({
  setPane
}: IProps) => addTab({setPane, type: 'Cat'})

export const useAddDogTab = ({
  setPane
}: IProps) => addTab({setPane, type: 'Dog'})