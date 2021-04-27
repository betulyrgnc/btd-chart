import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import useSWR, { SWRConfig} from "swr";
import { Router, Route, Link } from 'react-router-dom';
import history from './history';
import Detail from "./components/Detail/Detail";

ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <SWRConfig
                value ={{
                    fetcher: (...args) => fetch(...args).then(res => res.json())
                }}
            >
            </SWRConfig>
            <Route exact path="/" component={App} />
            <Route path="/detail/:id" component={Detail} />
        </Router>

    </React.StrictMode>,
  document.getElementById('root')
);

