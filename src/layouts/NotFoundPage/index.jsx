import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { APP_NAME } from 'src/app/constants';
import _404Image from 'src/assets/images/404.svg';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>{`Page not found | ${APP_NAME}`}</title>
      </Helmet>

      <div>
        <h1>Not found page</h1>

        <img src={_404Image} alt="404" />

        <Link to="/">Go to home page</Link>
      </div>
    </>
  );
};

export default NotFoundPage;
