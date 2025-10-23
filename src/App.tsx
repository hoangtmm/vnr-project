import { RouterProvider } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { router } from './router';

export default function App(){
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="description" content="Tổ chức & hoạt động tình báo giai đoạn hậu chiến" />
      </Helmet>
      {/* CommandPalette KHÔNG bọc ở đây nữa */}
      <RouterProvider router={router}/>
    </HelmetProvider>
  );
}
