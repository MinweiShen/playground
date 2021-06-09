import React, { useState } from 'react';
import { Tabs, Button } from 'antd';
import {
  BrowserRouter as Router,
  useParams,
  useLocation,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { useAddCatTab, useAddDogTab } from './hooks';
import { CatPage, DogPage} from './pages';

const { TabPane } = Tabs;

type PageType = 'Cat' | 'Dog';
export interface IPane {
  key: string;
  title: string;
  type: PageType;
  url: string;
}

const pageMap: Record<PageType, () => JSX.Element> = {
  Cat: CatPage,
  Dog: DogPage
};

type Location = ReturnType<typeof useLocation>

const notMatch = (activePane: IPane | undefined, location: Location) => !activePane && location.pathname !== '/'

const Main = () => {
  const params = useParams<{id: string}>();
  const location = useLocation();
  const [panes, setPane] = useState<IPane[]>([]);
  const addCat = useAddCatTab({setPane});
  const addDog = useAddDogTab({setPane});

  const activePane = panes.find(p => p.key == params.id)

  if(notMatch(activePane, location)) {
    return <div>Page not Found</div>
  }

  return (
    <>
      <div className="control">
        <Button onClick={addCat}>Add Cat</Button>
        <Button onClick={addDog}>Add Dog</Button>
      </div>
      <Tabs
        hideAdd
        activeKey={activePane ? activePane.key : ''}
        type="editable-card"
        onChange={function(){console.log('onChange', arguments)}}
        onClick={function(){console.log('onClick', arguments)}}
        onEdit={function(){console.log('onEdit', arguments)}}
      >
        {panes.map(pane => (
          <TabPane tab={<Link to={pane.url}>{pane.title}</Link>} key={pane.key}>
            {pageMap[pane.type]()}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}

const App = () => (
  <Router>
    <Switch>
      <Route path={['/cat/:id', '/dog/:id']} component={Main} />
      <Route component={Main} />
    </Switch>
  </Router>
)

export default App;