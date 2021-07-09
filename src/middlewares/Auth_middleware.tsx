import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetch } from '../services';

interface Auth_middlewareProps {}

const Auth_middleware: React.FC<Auth_middlewareProps> = ({ children }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(isBool(sessionStorage.getItem('auth')));

  useEffect(() => {
    if (isAuthenticated === null) {
      fetch('auth').then(() => {
        sessionStorage.setItem('is_auth', 'true');
        setIsAuthenticated(true);
      })
      .catch(() => {
        sessionStorage.setItem('is_auth', 'false');
        setIsAuthenticated(false);
      });
    }
  }, []);

  return (
    <>
      {isAuthenticated === true ?
        <Router>
          <Switch>
            {children}
          </Switch>
        </Router> :
        <Router>
          <Switch>
            {/* Login & Register   */}
          </Switch>
        </Router>
      }
    </>
  );
}

function isBool(value: string | null): boolean | null { return value ? value === 'true' : null };

export default Auth_middleware;