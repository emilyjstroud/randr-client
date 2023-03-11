// /* eslint-disable react/prop-types */
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import NavBar from '../components/nav/NavBar';
// import '../styles/globals.css';

// function MyApp({ Component, pageProps }) {
//   const [token, setTokenState] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     setTokenState(localStorage.getItem('auth_token', '') || '');
//   }, []);

//   useEffect(() => {
//     if (!['/login', '/register'].includes(router.route) && token !== null) {
//       if (!token) {
//         router.push('/login');
//       }
//     }
//   }, [router, token]);

//   const setToken = (newToken) => {
//     localStorage.setItem('auth_token', newToken);
//     setTokenState(newToken);
//   };

//   const newPageProps = { ...pageProps, token, setToken };

//   if (token === null) {
//     return 'Loading...';
//   }

//   return (
//     <>
//       <NavBar token={token} setToken={setToken} />
//       <Component {...newPageProps} />
//     </>
//   );
// }

// export default MyApp;

/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {' '}
      {/* gives children components access to user and auth methods */}
      <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;
