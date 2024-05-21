import type { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/',
      statusCode: 302,
    },
  };
};

export default NotFoundPage;
