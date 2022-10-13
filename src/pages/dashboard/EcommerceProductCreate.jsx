import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { paramCase } from 'change-case';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';
import { useDispatch, useSelector } from '../../store';
import { getProducts } from '../../store/slices/product';

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { products } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: !isEdit ? 'New product' : name },
          ]}
        />

        <ProductNewEditForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
